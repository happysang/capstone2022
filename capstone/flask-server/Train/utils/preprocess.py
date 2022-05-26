import os
import sys
import matplotlib.pyplot as plt

def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

def data_Distribution(path,save_path,view=False):
    # 학습 데이터셋 각 유형별 분포도 계산
    img_folders = list()
    for file in sorted(os.listdir(path)):
        if file[-3:] == 'zip':
            continue
        img_folders.append(os.path.join(path, file))

    total_count = dict()
    for type_path in img_folders:
        type_name = type_path.split('/')[-1]
        type_symptom = os.listdir(type_path)
        count_temp = {i: 0 for i in type_symptom}
        for type in type_symptom:
            img_list = os.listdir(os.path.join(type_path, type))
            count_temp[type] = len(img_list)
        total_count[type_name] = count_temp
    # print(total_count)
    return total_count
    if view:
        frequency_visualization(save_path,total_count)
        return total_count
    #{'모낭사이홍반': {'0': 534, '1': 29960, '2': 12957, '3': 4275}, '모낭홍반농포': {'0': 534, '1': 2126, '2': 758, '3': 332},
    # '미세각질': {'0': 534, '1': 4435, '2': 5486, '3': 2284}, '비듬': {'0': 534, '1': 16560, '2': 9523, '3': 2256},
    # '탈모': {'0': 534, '1': 13346, '2': 3797, '3': 836}, '피지과다': {'0': 534, '1': 28061, '2': 24485, '3': 3746}}

def frequency_visualization(save_path,frequency_datas):
    # 관계빈도수 그래프
    name_mapping = {'0':'양호','1':'중증','2':'경증','3':'위증'}
    for key in frequency_datas.keys():
        #key = '모낭사이홍반'....
        plt.rc('font', family='Malgun Gothic')
        x_label = [name_mapping[i] for i in frequency_datas[key].keys()]
        plt.ylim(0, 30000)
        plt.bar(x_label,frequency_datas[key].values())
        plt.xlabel('Type', fontsize=12)
        plt.ylabel('Frequency',fontsize=12)
        plt.title('{} Frequency distribution'.format(key))
        plt.savefig(os.path.join(save_path,'{}.png'.format(key)))
        plt.close()




if __name__ == '__main__':
    img_path = '../../new_dataset/img_dataset/train_dataset/'
    save_path = './result'
    createFolder(save_path)
    data_Distribution(img_path,save_path,view=True)
