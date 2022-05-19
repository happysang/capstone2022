import os
import sys
import matplotlib.pyplot as plt
import cv2
import random
from PIL import Image
import numpy as np
import preprocess as process

convert_name = {'모낭사이홍반':'erythema_of_follicles','모낭홍반농포':'follicular_erythema_abscess',
                '미세각질':'fine_dead_skin_cells','비듬':'dandruff','피지과다':'sebum','탈모':'skin'}

def fill(img, h, w):
    img = cv2.resize(img, (h, w), cv2.INTER_CUBIC)
    return img

def vertical_shift(img, ratio=0.0):
    if ratio > 1 or ratio < 0:
        print('Value should be less than 1 and greater than 0')
        return img
    ratio = random.uniform(-ratio, ratio)
    h, w = img.shape[:2]
    to_shift = h*ratio
    if ratio > 0:
        img = img[:int(h-to_shift), :, :]
    if ratio < 0:
        img = img[int(-1*to_shift):, :, :]
    img = fill(img, w, h)
    return img

def zoom(img, value):
    value = random.uniform(value, 1)
    h, w = img.shape[:2]
    h_taken = int(value*h)
    w_taken = int(value*w)
    h_start = random.randint(0, h)
    w_start = random.randint(0, w)

    if h_start >= 400 or w_start >= 400:
        h_start = random.randint(100, 300)
        w_start = random.randint(100,300)

    img = img[h_start:h_start+h_taken, w_start:w_start+w_taken, :]
    img = fill(img, w, h)
    #
    # cv2.imshow('Result', img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    return img


def data_augmentation(img_path,save_root):
    offset = 500
    type_distribution = process.data_Distribution(img_path, './', view=False)
    print(type_distribution)
    img_folders = list()
    for file in sorted(os.listdir(img_path)):
        if file[-3:] == 'zip':
            continue
        img_folders.append(os.path.join(img_path, file))

    for idx, type_path in enumerate(img_folders):
        type_name = type_path.split('/')[-1]
        convert_type_name = convert_name[type_name]
        type_symptom = os.listdir(type_path)
        save_path = os.path.join(save_root, convert_type_name)

        # 데이터 증강을 얼만큼 할건지에 대한 기준점
        max_augmentation_num = np.max(list(type_distribution[type_name].values()))

        for type in type_symptom:

            save_type_path = os.path.join(save_path, type)
            process.createFolder(save_type_path)
            c = 0
            img_root = os.path.join(type_path, type)
            img_list = os.listdir(img_root)
            current_image_num = len(img_list)

            if current_image_num < max_augmentation_num:
                # 전체 max augmentation 크기보다 작을때만 데이터 증강함
                c = current_image_num
                while True:
                    # print(c)
                    if c > max_augmentation_num - offset:
                        print('Stop!')
                        # print(c)
                        break
                    random_idx = random.randint(0, len(img_list) - 1)
                    selected_img_root = img_list[random_idx]
                    img_path = os.path.join(img_root, selected_img_root)
                    img = Image.open(img_path)
                    numpy_image = np.array(img)
                    image = cv2.cvtColor(numpy_image, cv2.COLOR_RGB2BGR)
                    aug_image = zoom(image, 0.8)
                    c += 1

                    cv2.imwrite(os.path.join(save_type_path, 'Data_Agumentation_{}.jpg'.format(c)), aug_image)

def file_move(orgin_path,augmentation_path):
    import shutil
    folder_list = os.listdir(augmentation_path)
    mapping_name = {v:k for k,v in convert_name.items()}

    for folder in folder_list:
        if os.path.isdir(os.path.join(augmentation_path,folder)):
            type_path = os.path.join(augmentation_path,folder)
            for type in os.listdir(type_path):
                type_image_path = os.path.join(type_path,type)
                src_images = os.listdir(type_image_path)
                for src_image in src_images:
                    target_folder = mapping_name[folder]
                    target_path = os.path.join(orgin_path,target_folder,type)
                    if os.path.isdir(target_path):
                        src = os.path.join(type_image_path,src_image)
                        target = os.path.join(target_path,src_image)
                        shutil.move(src,target)
                    else:
                        print('No target Path')

if __name__ == '__main__':
    img_path = '../../new_dataset/img_dataset/train_dataset/'
    save_root = './result'
    augmentation = False
    move_file = True

    if augmentation:
        data_augmentation(img_path,save_root)
    if move_file:
        file_move(orgin_path=img_path,augmentation_path=save_root)