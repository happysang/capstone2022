import sys
import zipfile
import os
import json
import torch

meta_path = '../new_dataset/유형별 두피 이미지/Meta/'

test_data = {'normal':0,'oily':0,'sensitivity':0,'dull':0,'alopecia':0,'dandruff':0,'infection':0,'dry':0,'PASS':0,'samesame':0}

train_data_list = list()
val_data_list = list()
remove_list = list()
# phars = 'train' #or val
phars = 'val'
def write_txt(file_name,data):
    save_path = './'
    with open(os.path.join(save_path,file_name), 'w') as f:
        f.writelines(data)


def create_folder(folder_path):
    if not os.path.isdir(folder_path):
        os.mkdir(folder_path)

def zip_img_extract(zip_path):
    zip_List = os.listdir(zip_path)

    for zip_file in zip_List:
        if zip_file[-3:] == 'zip':
            folder_name = zip_file.split('_')[0][4:]
            print(folder_name, ':', zip_file)
            # folder_path = os.path.join(zip_path, folder_name)
            # create_folder(folder_path)
            zipfile.ZipFile(os.path.join(zip_path, zip_file)).extractall(zip_path)

    print(zip_List)

def label_extract(label_path):
    zip_List = os.listdir(label_path)
    print(zip_List)
    for zip_file in zip_List:
        if zip_file[-3:] == 'zip':
            folder_name = zip_file.split('_')[0][4:]
            print(folder_name, ':', zip_file)

            folder_path = os.path.join(label_path, folder_name)
            print(folder_path)


            print(os.path.join(label_path, zip_file))
            print(zip_file)
            create_folder(folder_path)
            zipfile.ZipFile(os.path.join(label_path, zip_file)).extractall(folder_path)

    print(zip_List)
def cal_valueToLabel(data):
    # 양호: value1~6 모두 0인 경우
    # 건성: value1값이 있고, 다른 value값은 0인 경우
    # 지성: value2값이 있고, 다른 value값은 0인 경우
    # 민감성: value3값이 있고, 다른 value값은 0인 경우(단, value1값이 있는 경우도 민감성에 해당)
    # 지루성: value2와 value3값이 있고 다른 value값은 0인 경우(단, value1값과 value5값이 있는 경우도 지루성에 해당)
    # 염증성: value4값이 있고 다른 value값은 0인 경우(단, value1, 2, 5값이 있는 경우도 염증성에 해당)
    # 비듬성: value5값이 있고 다른 value값은 0인 경우(단, value1, 2값이 있는 경우도 비듬성에 해당)
    # 탈모성: value6값이 있고 다른 value값은 0인 경우
    # *“None(0)”, “Mild(1)”, “Moderate(2)”, “Severe(3)”를 적용하여 각 증상에 대해 “없음(0)”, “경증(1)”, “중등도(2)”, “중증(3)”으로 정의함
    # print(data)
    a =  int(data['value_1'])-1 if int(data['value_1'])>0  else int(data['value_1']) #0
    b = int(data['value_2'])-1 if int(data['value_2'])>0  else int(data['value_2']) #1

    # c = int(data['value_3'])
    c = int(data['value_3'])-1 if int(data['value_3'])>0  else int(data['value_3']) #2

    d = int(data['value_4']) #3
    # d = int(data['value_4'])-1 if int(data['value_4'])>0  else int(data['value_4'])

    e = int(data['value_5']) #4
    # e = int(data['value_5'])-1 if int(data['value_5'])>0  else int(data['value_5'])

    f = int(data['value_6']) #5
    # f = int(data['value_6'])-1 if int(data['value_6'])>0  else int(data['value_6']) #5

    data = torch.tensor([a,b,c,d,e,f])

    # dic = [1:'건성',2:'지성',3:'민감성',4:'지루성',5:'염증성',6:'비듬성',7:'탈모성']
    dic = {0: 'dry', 1: 'oily', 2: 'infection', 3: 'infection', 4: 'dandruff', 5: 'alopecia',6:'dull'}
    result_label = ''
    for i in range(0, len(data)):
        #     print(i)
        if i == 0:
            b = data[i]
            c = data[i + 1:len(data)]
            a = torch.tensor([])
        #         print(b,c)
        elif i == len(data) - 1:
            b = data[i]
            c = data[0:i]
            a = torch.tensor([])
        #         print(b,c)
        else:
            # i=1
            a = data[0:i]
            b = data[i]
            c = data[i + 1:len(data)]

        if len(c[c == 0]) + len(a[a == 0]) + len(b[b == 0]) == 6:
            result_label = 'normal'
        elif b != 0 and len(c[c == 0]) + len(a[a == 0]) == 5:
            result_label = dic[i]

    if result_label == '':
        #     dic = {0: 'dry', 1: 'oily', 2: 'sensitivity', 3: 'infection', 4: 'dandruff', 5: 'alopecia',6:'dull'}
        if data[5] >= 2:
            result_label = dic[5] #탈모
        elif data[3] >=2 or data[2] >=2:
            result_label = dic[3] #염증
        elif data[4] >= 2 and data[0] >=1:
            result_label = dic[4] #비듬도 있고 미세각질도 있으면 비듬임
        elif data[1]>=2:
            result_label = dic[1] #지성
        elif data[0]>=1:
            result_label = dic[0] #건성
        elif (data[2] >= 1 and data[0]>=1 )or (data[2] >=1 and data[3]>=1):
            result_label = dic[2]  # 민감
        else:
            result_label = 'PASS'

        #
        # if data[0] != 0 and data[2] != 0: #value1,value3 이 값이 있을 때
        #     result_label = dic[2]  # 민감
        # elif (data[0] != 0 and data[1] != 0 and data[4] != 0 and data[3] != 0): #value1,value2,value4,value5 가 값이 있을때
        #     result_label = dic[3]  # 염증
        # elif data[0] != 0 and data[1] != 0 and data[4] != 0: #value1, value2 value5 가 값이 있을 때
        #     result_label = dic[4]  # '비듬성'
        # else:
        #     result_label = dic[6]  # 지

    return result_label

def convert_label(label_path,zip_path):
    label_type_list = os.listdir(label_path) #모낭사이홍반, 모낭홍반농포,미세각질 등
    temp = {'모낭사이홍반':0,'모낭홍반농포':1,'미세각질':2,'비듬':3,'탈모':4,'피지과다':5}
    temp1 = {'남':0,'여':1}
    duplicate_dict = dict()
    for label_folders in label_type_list:
        json_path = os.path.join(label_path,label_folders)
        json_list = os.listdir(json_path)
        print('====================== Start -->',label_folders)
        for idx,label_json in enumerate(json_list):
            print('@@@@@@@@@@@@convert@@@@@@@ing..........{}/{}'.format(idx,len(json_list)))
            js_file_path = os.path.join(json_path,label_json)
            with open(js_file_path, 'rt', encoding='UTF8') as f:
                json_data = json.dumps(json.load(f)).replace("'", "\"")
                # print(json_data)
                json_content = json.loads(json_data)

            update_label = cal_valueToLabel(json_content)


            # normal,oily,sensitivitiy .. 등 몇개가 분류되었는지만 보고싶으면 아래 주석해제
            # continue
            json_content['label'] = update_label #test
            json_content['label_type'] = temp[label_folders]

            try:
                if duplicate_dict[json_content['image_file_name']] == 1:
                    print('이미 존재함')
                    json_content['label_type'] = -1
                    update_label = 'samesame'
            except:
                duplicate_dict[json_content['image_file_name']] = 1 #처음 등장
            test_data[update_label] += 1
            meta_file_name = '{}_{}.json'.format(label_json[:-5], 'META')
            with open(os.path.join(meta_path, meta_file_name), 'rt', encoding='UTF8') as f:
                json_meta_data = json.dumps(json.load(f)).replace("'", "\"")
                json_meta_content = json.loads(json_meta_data)
                gender = temp1[json_meta_content['gender']]
                age = json_meta_content['age'][:-1]

            json_content['gender'] = gender
            json_content['age'] = age

            with open(js_file_path, 'w', encoding='UTF8') as make_file:
                # print(json_path)
                json.dump(json_content, make_file, indent="\t", ensure_ascii=False)
            if json_content['label_type'] != -1 and json_content['label'] != 'PASS' and os.path.isfile(os.path.join(zip_path,json_content['image_file_name'])):
                if phars == 'train':
                    train_data_list.append(js_file_path)
                else:
                    val_data_list.append(js_file_path)
            else:
                remove_list.append(js_file_path)
            # sys.exit()
def duplicate_txt(path):
    folder_list = os.listdir(path)
    print(folder_list)
    a = set()
    for folder in folder_list:
        folder_path = os.path.join(path,folder)
        for file in os.listdir(folder_path):
            a.add(file)
        print(a)
        sys.exit()
if __name__ == '__main__':
    if phars == 'train':
        # Training Dataset split
        zip_path = '../new_dataset/유형별 두피 이미지/Training/'
        label_path = '../new_dataset/유형별 두피 이미지/Training/label/'
    else:
        # Validation Dataset split
        zip_path = '../new_dataset/유형별 두피 이미지/Validation/'
        label_path = '../new_dataset/유형별 두피 이미지/Validation/label/'


    label_extract_flag = False#False #step1
    img_extract_flag = False #step2
    convert_label_flag = True #step3.....................
    duplicate_remove = False
    file_move = False
    write_txt_files = True

    if file_move:
        import shutil
        root_path = '../new_dataset/유형별 두피 이미지/Training'
        for folder in os.listdir(root_path):
            if folder in ['0','1','2','3','4','5']:
                print('ok')
                a = os.path.join(root_path,folder)
                for file in os.listdir(a):
                    try:
                        print(file)
                        source = os.path.join(a,file)
                        target = os.path.join(root_path,file)
                        shutil.move(source,target)
                        # sys.exit()
                    except:
                        print('이미 존재함')
                        continue
    #step1. 이미지 압축해제 후 각 type에 맞게 배치

    if img_extract_flag:
        zip_img_extract(zip_path)
    #step2. 라벨 데이터 압축해제 후 각 type에 맞게 배치
    if label_extract_flag :
        label_extract(label_path)
    #step3. 모든 라벨.json 파일을 읽은 후 --> value 값에 따라 라벨링 및 img_path 수정해주기.
    if convert_label_flag:
        convert_label(label_path,zip_path)

        for k,v in test_data.items():
            print('{} : {} 개 '.format(k,v))

    if write_txt_files:
        if phars =='train':
            train_list = [i.replace("\\""", "/") + "\n" for i in train_data_list]
            print('train_data : ',len(train_list))
            write_txt(file_name='train_1.txt',data=train_list)
        else:
            val_list = [i.replace("\\""", "/") + "\n" for i in val_data_list]
            print('val_data : ', len(val_list))
            write_txt(file_name='val_1.txt', data=val_list)

        print('remove_data : ',len(remove_list))
        write_txt(file_name='remove_{}.txt'.format(phars),data=remove_list)



