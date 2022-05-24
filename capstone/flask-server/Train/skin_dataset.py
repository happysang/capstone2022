import torch
from torch.utils.data import Dataset,DataLoader
from torchvision import datasets, transforms
import os
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import image
import json
import sys
def get_transform(phase = 'train', method=Image.BILINEAR):
    transform_list = []
    transform_list.append(transforms.Resize((256,256)))
    if phase == 'train':
        # transform_list.append(transforms.ToPILImage(mode= "RGB"))

        transform_list.append(transforms.RandomResizedCrop(256))
        transform_list.append(transforms.RandomHorizontalFlip())
        transform_list.append(transforms.RandomVerticalFlip())
        transform_list.append(transforms.ColorJitter(brightness=0, contrast=0, saturation=0, hue=0))

    transform_list.append(transforms.ToTensor())
    transform_list.append(transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])) ###


    #transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))
    # 더 추가하고,
    return transforms.Compose(transform_list)

class SkinDataset(Dataset):
    def __init__(self,phase='train', transform=None):
        self.phase = phase

        if phase == 'train':
            f = open("./train_1.txt", 'r')
            lists = f.readlines()
            self.data_lists = [file.rstrip() for file in lists]
            # self.transfroms = transform['train']
            self.img_root_path = '../new_dataset/유형별 두피 이미지/Training/'
        elif phase == 'val':
            f = open("./val_1.txt", 'r')
            lists = f.readlines()
            self.data_lists = [file.rstrip() for file in lists]
            self.data_lists = self.data_lists[:1000]
            self.img_root_path = '../new_dataset/유형별 두피 이미지/Validation/'
        #     dic = {0: 'dry', 1: 'oily', 2: 'sensitivity', 3: 'infection', 4: 'dandruff', 5: 'alopecia',6:'dull'}
        self.label_temp = {'normal':0,'dry':1,'oily':2,'infection':3,'dandruff':4,'alopecia':5,'PASS':6}

        self.transform = get_transform(phase) #alb_transform(phase = phase) #get_transform(phase) #alb_transform(phase = phase) #transform #get_transform()
        # print(self.transform)
    def __getitem__(self, index):
        # train index
        label = {}
        total_label = dict()
        val_label = dict()
        json_path = self.data_lists[index]
        # print(json_path)
        with open(json_path, 'r') as f:
            # print(json_path)
            # json_data = json.dumps(json.load(f)).replace("'", "\"")
            json_data = json.dumps(json.load(f))
            json_content = json.loads(json_data)


        image_name = json_content['image_file_name'] #0013_A2LEBJJDE00060O_1603943045806_5_RH.jpg
        img_root = os.path.join(self.img_root_path,image_name)
        img = Image.open(img_root)
        # print(img)
        img = self.transform(img)
        # print(img.size())
        # label_key = json_content['label']
        labels = self.label_temp[json_content['label']]
        # print(labels)
        labels = torch.LongTensor([labels])
        return img,labels


    def __len__(self):
        return len(self.data_lists)


if __name__ == '__main__':
    testDataset = SkinDataset(phase='val')
    testDataset.__getitem__(4)
    print(len(testDataset))
    # sys.exit()
    a = DataLoader(testDataset,batch_size=16,shuffle=True)
    for i in a:
        img,label = i
        print(img.size())