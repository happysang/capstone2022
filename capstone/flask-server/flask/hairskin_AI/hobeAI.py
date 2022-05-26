import sys
import numpy as np

import torch.nn.functional as F
import torch
import os
import matplotlib.pyplot as plt
from efficientnet_pytorch import EfficientNet
from torchvision import transforms
import random
import time
from PIL import Image
_ROOT_DIR = os.path.abspath(os.path.dirname(__file__) + '/..')
sys.path.insert(0, _ROOT_DIR)



args = {}

random_seed = 100
random.seed(random_seed)
torch.manual_seed(random_seed)



class HobeAI():
    def __init__(self,mode='Test',pretrained_path=None,debug=True):
        self.pretrained_root = None
        self.pretrained_path_list = None
        self.mode = mode

        # if mode == 'Test':
        self.pretrained_root = pretrained_path
        self.pretrained_path_list = os.listdir(self.pretrained_root)


        self.main_transforms = transforms.Compose([
                                        transforms.Resize([int(600), int(600)]),
                                        transforms.ToTensor(),
                                        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
                                      ])
        self.label_mapping = {0: '양호', 1: '경증', 2: '중증', 3: '위증'}
        self.col_index = {'모낭사이홍반':0,'모낭홍반농포':1,'미세각질':2,'비듬':3,'탈모':4,'피지과다':5}
        self.type_mat = {'양호' : 0.0 , '경증' : 0.5 ,'중증' : 1 ,'위증':1.5}
        self.map_dict = {2: 'dry', 5: 'oily', 4: 'loss'}
        self.debug = debug
        self.model_list = self.get_model(type='efficientNet', name='efficientNet').items()
        self.standard_mat = np.zeros(shape=(6)) #평가 척도

    def get_Network(self,type):
        Network_List = {'efficientNet': EfficientNet.from_pretrained('efficientnet-b4', num_classes=4)}
        return Network_List[type]

    # Test Image Info
    # 1.jpg : 미세각질 (2 : 중증)
    # 2.jpg : 탈모 (2 : 중증)
    # 3.jpg : 탈모 (1 : 경증 - 거의 양호 수준)
    # 4.jpg : 모낭홍반농포 : 3 위증
    # 5.jpg : 모낭사이홍반 : 위증
    def process(self,image=None):

        if self.mode == 'Test':
            result = self.TestMode()
            return result
        elif self.mode == 'Demo':
            wrap_dict = dict()
            wrap_dict['typeOfScalp'] = list()
            wrap_dict['User_ID'] = 'DummyTestID_qorgh346'

            img = image
            img = self.main_transforms(img).unsqueeze(dim=0)
            for name,model in self.model_list:
                output = dict()
                model.eval()
                with torch.no_grad():
                    predict = model(img)
                    predict = F.softmax(predict, dim=1)
                    arg_idx = torch.argmax(predict, dim=1)
                    result = self.label_mapping[arg_idx.item()]
                    col_idx = self.col_index[name]
                    self.standard_mat[col_idx] = self.type_mat[result]
                    output['type'] = name
                    output['value'] = predict[0][arg_idx.item()].item()
                    output['state'] = result
                    # output[name] = (predict[0][arg_idx.item()].item(), result)
                    wrap_dict['typeOfScalp'].append(output)

            wrap_dict['result'] = self.scalp_type_calculating()['result']

            if self.debug:
                print(wrap_dict)

            return wrap_dict





    def TestMode(self):
        #Local에 저장된 이미지를 불러와 테스트 해보는 코드
        #플라스크 단독 데모 가능
        #이미지 폴더 주소 적기
        image_root = '../test_image'
        image_list = os.listdir(image_root)
        wrap_dict = dict()

        for idx, image in enumerate(image_list):
            self.standard_mat = np.zeros(shape=(6))

            img_path = os.path.join(image_root, image)
            img = Image.open(img_path)
            img = self.main_transforms(img).unsqueeze(dim=0)
            wrap_dict['typeOfScalp'] = list()
            wrap_dict['User_ID'] = 'DummyTestID_qorgh346'
            for name, model in self.model_list:
                model.eval()
                output = dict()
                with torch.no_grad():
                    predict = model(img)
                    predict = F.softmax(predict, dim=1)
                    arg_idx = torch.argmax(predict, dim=1)
                    result = self.label_mapping[arg_idx.item()]
                    col_idx = self.col_index[name]
                    self.standard_mat[col_idx] = self.type_mat[result]
                    output['type'] = name
                    output['value'] = predict[0][arg_idx.item()].item()
                    output['state'] = result
                    # output[name] = (predict[0][arg_idx.item()].item(), result)
                    wrap_dict['typeOfScalp'].append(output)
            wrap_dict['result'] = self.scalp_type_calculating()['result']

            if self.debug:
                print(img_path)
                print(wrap_dict)
        return wrap_dict


    def scalp_type_calculating(self):

        # one_value : 건성, 지성, 탈모성
        #multi value : 민감성 , 비듬성 , 지루성 , 염증성
        cal_result = {'result':''}


        good = (self.standard_mat == 0.0).nonzero()[0]
        fine = (self.standard_mat == 0.5).nonzero()[0]
        #양호 기준 판단 :
        one_value = (self.standard_mat >= 1.0).nonzero()[0]
        bad_value = (self.standard_mat >= 1.5).nonzero()[0]
        # self.col_index = {'모낭사이홍반':0,'모낭홍반농포':1,'미세각질':2,'비듬':3,'탈모':4,'피지과다':5}
        if len(good) >= 3 or len(fine)>=6 :  #대부분 진단 결과가 양호 또는 경증일 때는 "양호"
            cal_result['result'] = 'good'
            return cal_result

        if len(fine) >= 4: # 두피 상태가 양호하지는 않지만 경증이 대부분인 경우 (건성,지성,탈모성 구별 가능)
            for i in one_value:
                if i in list(self.map_dict.keys()):
                    cal_result['result'] = self.map_dict[i]
                    if self.standard_mat[4] >= 1.0:
                        cal_result['result'] = 'loss'
                    return cal_result

        #각 증상별 우선순위를 정함
        #"표"를 참고해보면 < 탈모, 민감성, 염증성, 비듬성>은 위증이냐 아니냐라는 기준으로 구별이 가능함
        priorityMemory = {}
        if len(bad_value) >= 1:
            flag_mat = 0.0
            # 진단 결과 : 민감성, 지루성, 염증성, 비듬성 판단함
            for i in bad_value:
                if i == 4: #탈모 진단 모델이 위증이라고 판단한거면 무조건 탈모인거임.
                    priorityMemory[0] = 'loss' #탈모성
                if i == 3: ##비듬 진단 모델이 위증이라고 판단했을 때
                    priorityMemory[1] = 'dandruff' #비듬성
                    # return cal_result
                if i == 1:#모낭홍반농포 진단 모델이 위증이라고 판단했을 때
                    priorityMemory[2] = 'inflammation'#염증성
                    # return cal_result
                if i == 0 or i == 5: #지루성과 민감성 판단 기준
                    #피지과다 진단 , 모낭사이홍반 진단 모델 각각 위증이라고 판단했을 때는 지루성 vs 민감성
                    flag_mat += 1

            prior_key = sorted(list(priorityMemory.keys()))
            if len(prior_key) != 0:
                cal_result['result'] = priorityMemory[prior_key[0]]
                return cal_result

            if flag_mat >= 1:
                cal_result['result'] = 'seborrheric' if flag_mat == 2 else 'sensitive'
            return cal_result

        cal_result['result'] = 'normal' #표에 해당하지 않은 경우에는 'normal'로 표시
        return cal_result



    def get_model(self,type='moblievitNet',name='vit_model_s'):
        model_dict = {}
        for weight_file in self.pretrained_path_list:
            pt_path = os.path.join(self.pretrained_root,weight_file)
            check_point = torch.load(pt_path,map_location='cpu')
            net = self.get_Network(type)
            model = torch.nn.DataParallel(net)
            model.load_state_dict(check_point)
            model_dict[weight_file.split('_')[-1][:-3]] = model
            # sys.exit()
        return model_dict
def create_folder(folder_path):
    if not os.path.isdir(folder_path):
        os.mkdir(folder_path)

if __name__ =='__main__':
    hobe = HobeAI(pretrained_path='../save_model')
    result = hobe.process(image=None)
    print(result)