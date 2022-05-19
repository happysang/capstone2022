import sys
import numpy as np
from hairskin_AI.custom_model import kgu_Network

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
    def __init__(self,pretrained_path=None):
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
    def get_Network(self,type):
        Network_List = {'moblievitNet': kgu_Network(feature_extract=True, device='cpu', num_class=4),
                             'efficientNet': EfficientNet.from_pretrained('efficientnet-b4', num_classes=4)
                             }
        return Network_List[type]

    def process(self,image=None):
        import matplotlib.pyplot as plt
        # Test Image Info
        # 1.jpg : 미세각질 (2 : 중증)
        # 2.jpg : 탈모 (2 : 중증)
        # 3.jpg : 탈모 (1 : 경증 - 거의 양호 수준)
        # 4.jpg : 모낭홍반농포 : 3 위증
        # 5.jpg : 모낭사이홍반 : 위증
        model_list = self.get_model(type='efficientNet', name='efficientNet').items()
        image_root = './test_image'
        image_list = os.listdir(image_root)


        for idx,image in enumerate(image_list):
            # if idx == 2:
            #     break
            self.standard_mat = np.zeros(shape=(6))
            output = dict()
            img_path = os.path.join(image_root,image)
            img = Image.open(img_path)

            img = self.main_transforms(img).unsqueeze(dim=0)

            for name,model in model_list:
                model.eval()
                with torch.no_grad():
                    predict = model(img)

                    predict = F.softmax(predict,dim=1)
                    # predict = nn.Softmax(predict,dim=1)
                    arg_idx = torch.argmax(predict,dim=1)

                    result = self.label_mapping[arg_idx.item()]
                    col_idx = self.col_index[name]

                    self.standard_mat[col_idx] = self.type_mat[result]
                    output[name] = (predict[0][arg_idx.item()].item(),result)

                # test hojun
                # self.standard_mat = np.array([0.5,0.5,0.0,0.5,0,1])


                    result = self.scalp_type_calculating()
                    result['typeOfScalp'] = output
            print(img_path)
            print(result)
            # sys.exit()
        return result

    def scalp_type_calculating(self):

        # one_value : 건성, 지성, 탈모성
        #multi value : 민감성 , 비듬성 , 지루성 , 염증성
        cal_result = {'result':''}

        good = (self.standard_mat == 0).nonzero()[0]
        one_value = (self.standard_mat >= 1.0).nonzero()[0]
        multi_value = (self.standard_mat >= 0.5).nonzero()[0]

        # self.col_index = {'모낭사이홍반':0,'모낭홍반농포':1,'미세각질':2,'비듬':3,'탈모':4,'피지과다':5}
        if len(good) >= 6:
            cal_result['result'] = 'good'

        if len(one_value) == 1:
            model_index = one_value[0]
            if model_index == 2:
                # print('result = 건성')
                cal_result['result'] = 'dry'
                return cal_result
            elif model_index == 5:
                cal_result['result'] = 'oily'
                return cal_result
                # print('result = 지성')
            elif model_index == 4:
                cal_result['result'] = 'loss'
                return cal_result
                # print('result = 탈모성')
            # return cal_result
        if len(multi_value) == 2:
            c = 0
            for i in multi_value:
                if i in [0,2]:
                    c+=1
            if c == 2:
                cal_result['result'] = 'sensitive'
                # print('result = 민감성')
        elif len(multi_value) == 3:
            c = 0
            for i in multi_value:
                if i in [2,3,5]:
                    c+=1
            if c == 3:
                cal_result['result'] = 'dandruffy'
                # print('result = 비듬성')
        elif len(multi_value) >= 4:
            c_1,c_2 = 0,0
            for i in multi_value:
                if i in [0,5]:
                    c_1 += self.standard_mat[i]
                elif i in [1]:
                    c_2 += self.standard_mat[i]

            if c_1 >= c_2:
                cal_result['result'] = 'seborrheric'
                # print('result = 지루성')
            else:
                cal_result['result'] = 'infection'
                # print('result = 염증성' )
        return cal_result



    def get_model(self,type='moblievitNet',name='vit_model_s'):
        model_dict = {}
        for weight_file in self.pretrained_path_list:
            pt_path = os.path.join(self.pretrained_root,weight_file)
            check_point = torch.load(pt_path,map_location='cpu')#map_location='cpu')
            net = self.get_Network(type)
            model = torch.nn.DataParallel(net)
            if type == 'moblievitNet':
                model = model.get_model(name)

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