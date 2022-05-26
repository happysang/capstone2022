import sys

import numpy as np
from custom_model import kgu_Network
from hairskin_project.skin_dataset import SkinDataset
import torch.optim as optim
import torch.nn as nn
from torch.utils.data import DataLoader
import torch
import os
import torch.nn.functional as F
import matplotlib.pyplot as plt
from efficientnet_pytorch import EfficientNet
import copy
from torchvision import transforms, datasets
from models.hobe_model import hobe_M
import random
import time
args = {}

random_seed = 100
random.seed(random_seed)
torch.manual_seed(random_seed)

transforms_train = transforms.Compose([
                                        transforms.Resize([int(600), int(600)], interpolation=4),
                                        transforms.RandomHorizontalFlip(p=0.5),
                                        transforms.RandomVerticalFlip(p=0.5),
                                        transforms.Lambda(lambda x: x.rotate(90)),
                                        transforms.RandomRotation(10),
                                        transforms.RandomAffine(0, shear=10, scale=(0.8, 1.2)),
                                        transforms.ToTensor(),
                                        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
                                      ])

transforms_val = transforms.Compose([
                                        transforms.Resize([int(600), int(600)], interpolation=4),
                                        transforms.ToTensor(),
                                        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
                                      ])

# trainModel_order = ['모낭홍반농포', '미세각질', '비듬', '탈모','모낭사이홍반']  # 학습 모델 순서

trainModel_order = ['탈모','미세각질','모낭홍반농포','비듬','모낭사이홍반','피지과다']
label_mapping = { 0 : '양호', 1 : '경증', 2 : '중증', 3 : '위증'}
train_data_list = [datasets.ImageFolder('../new_dataset/img_dataset/train_dataset/{}'.format(i),transform=transforms_train)
                   for i in trainModel_order ]

val_data_set_list = [datasets.ImageFolder('../new_dataset/img_dataset/val_dataset/{}'.format(i),transform=transforms_val)
                   for i in trainModel_order ]

dataloaders = {}
dataloaders['train'] = train_data_list
dataloaders['val'] = val_data_set_list




def write_txt(file_name,data,modelName):
    save_path = './log'
    with open(os.path.join(save_path,file_name), 'w') as f:
        f.writelines(data)


def pytorch_count_params(model, trainable=True):
    "count number trainable parameters in a pytorch model"
    s = 0
    for p in model.parameters():
        if trainable:
            if not p.requires_grad: continue
        try:
            s += p.numel()
        except:
            pass
    return s



def create_folder(folder_path):
    if not os.path.isdir(folder_path):
        os.mkdir(folder_path)


def train(args,modelName):
    # https://didu-story.tistory.com/27 -> loss
    start_time = time.time()
    batchsize = 4
    print('@@@ {} @@@ \t {}모델을 학습시킵니다.'.format(args['idx'],modelName))
    model_name = 'efficientnet-b1'
    criterion = nn.CrossEntropyLoss()
    # save_model_path = './save_models/'
    save_model_path = './save_train_models/'
    # CustomDataLoader = DataLoader(dataset= dataloaders[args['phase']][args['idx']],batch_size=batchsize,shuffle=True)
    print('batchsize{} : dataset num :{}'.format(batchsize,len(dataloaders[args['phase']][args['idx']])))

    pretrained = True

    if pretrained:
        model = EfficientNet.from_pretrained(model_name, num_classes=4)
        model = model.to(args['device'])
        print('model-parameter- num : ', pytorch_count_params(model))
        # for k,i in model.named_parameters():
        #     print('k : ', k, 'i = ',i)
        #     i.requires_grad = False
        #     if 'fc' in k:
        #         i.requires_grad = True
    #
    else:
        # model_name = 'vit_model_xss'
        model_name = 'vit_model_s'
        net = kgu_Network(feature_extract=True, device=args['device'],num_class=4)
        model = net.get_model(model_name)
        print('model-parameter- num : ',pytorch_count_params(model))

     # sys.exit()
    best_model_wts = copy.deepcopy(model.state_dict())
    since = time.time()
    best_acc = 0.0

    optimizer = optim.Adam(model.parameters(), lr=0.001)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.7)


    train_loss, train_acc, val_loss, val_acc = [], [], [], []

    for epoch in range(args['epochs']):  # loop over the dataset multiple times
        print('Training epoch {}/{} START !!!!!!!'.format(epoch,args['epochs']))
        print('-' * 10)

        epoch_start = time.time()

        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()
            else:
                model.eval()
            running_loss = 0.0
            running_corrects = 0
            num_cnt = 0

            for i, data in enumerate(DataLoader(dataset= dataloaders[phase][args['idx']],batch_size=batchsize,shuffle=True)):

                # get the inputs; data is a list of [inputs, labels]
                img, labels = data #labels : dict
                B, _, _, _ = img.size()
                img = img.to(args['device'])
                labels = labels.to(args['device'])

                # zero the parameter gradients
                optimizer.zero_grad()
                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(img)
                    # print(outputs)
                    # a = F.softmax(outputs,dim=1)
                    # print(torch.sum(outputs[4]))
                    # print(a)
                    # print(torch.sum(a[4]))
                    # sys.exit()
                    # outputs_ = a
                    _, preds = torch.max(outputs, 1)
                    # loss = criterion(outputs_, labels)
                    # loss = nn.NLLLoss()(outputs,labels)
                    loss = criterion(outputs,labels)
                    # print(loss)
                    # print(temp_loss)
                    # sys.exit()


                    if phase == 'train':
                        loss.backward()
                        optimizer.step()


                    running_loss += loss.item() * img.size(0)
                    running_corrects += torch.sum(preds == labels.data)
                    num_cnt += len(labels)

                if phase == 'train':
                    scheduler.step()

                epoch_loss = float(running_loss / num_cnt)
                epoch_acc = float((running_corrects.double() / num_cnt).cpu() * 100)

                if phase == 'train':
                    train_loss.append(epoch_loss)
                    train_acc.append(epoch_acc)
                else:
                    val_loss.append(epoch_loss)
                    val_acc.append(epoch_acc)
                print('{} Loss: {:.4f} Acc: {:.4f}'.format(phase, epoch_loss, epoch_acc))

                if phase == 'val' and epoch_acc > best_acc:
                    best_idx = epoch
                    best_acc = epoch_acc
                    best_model_wts = copy.deepcopy(model.state_dict())
                    print('==> best model saved - %d / %.1f' % (best_idx, best_acc))

                epoch_end = time.time() - epoch_start

                print('Training epochs {} in {:.0f}m {:.0f}s'.format(epoch, epoch_end // 60, epoch_end % 60))
                print()
        model_weight_path = os.path.join(save_model_path, modelName)
        create_folder(model_weight_path)
        torch.save(model.state_dict(),
                   '{}{}/{}'.format(save_model_path, modelName, 'pretrain_epoch_state_dict_' + modelName + '.pt'))

    time_elapsed = time.time() - since
    print('Training complete in {:.0f}m {:.0f}s'.format(time_elapsed // 60, time_elapsed % 60))
    print('Best valid Acc: %d - %.1f' % (best_idx, best_acc))

    model.load_state_dict(best_model_wts)


    torch.save(model, '' + 'Model_' + modelName + '.pt')
    torch.save(model.state_dict(), '{}{}/{}'.format(save_model_path,modelName,'pretrain_state_dict_' + modelName + '.pt'))
    print('model saved')

    end_sec = time.time() - start_time
    # print(train_loss)
    # print(train_acc)
    # print(val_loss)
    # print(val_acc)
    log_file_txt({'train_loss':train_loss,'train_acc':train_acc,'val_loss':val_loss,'val_acc':val_acc}, './',modelName)
    print("end time :", end_sec)

def log_file_txt(data_list,path,modelName):
    for data_name,data in data_list.items():
        avg = sum(data) / len(data)
        with open(os.path.join(path,'{}_log_{}.txt'.format(modelName,data_name)),'w') as file:
            file.write(str(avg))


def visual_image_test(img,pd_labels,gt_labels):
    rows = 3
    columns = 3
    B = img.size()[0]
    img *= 255
    pd = {'family': 'Malgun Gothic',
             'color': 'darkred',
             'weight': 'normal',
             'size': 15}

    gt = {'family': 'Malgun Gothic',
             'color': 'blue',
             'weight': 'normal',
             'size': 9,
             }
    fig = plt.figure(figsize=(20, 20))

    temp_list = ['basestyle','curl','bang','loss','side']
    for i in range(B):
        image_index = i + 1  # image index

        plt.rc('font', family='Malgun Gothic')
        plt.subplot(rows, columns, image_index)  # subplot
        plt.title('pd:{} gt:{}'.format(pd_labels[i],gt_labels[i]),fontdict=pd)  # title
        # // plt.axis('off')
        plt.xticks([])  # x = None
        plt.yticks([])  # y = None
        image = img[i].cpu().numpy()
        # plt.text(0.0, 0.35, 'np.random.randn()', fontdict=pd)
        # plt.text(10.0, 0.35, 'hobezxc', fontdict=gt)
        plt.imshow(np.transpose(image,(1,2,0)))
    plt.show()
    # plt.savefig('test_result/test_{}.png'.format(name))



def test(args,modelName):

    batchsize = 32
    print('@@@ {} @@@ \t {}모델을 평가합니다.'.format(args['idx'], modelName))
    model_name = 'efficientnet-b1'

    # CustomDataLoader = DataLoader(dataset= dataloaders[args['phase']][args['idx']],batch_size=batchsize,shuffle=True)
    print('batchsize{} : dataset num :{}'.format(batchsize, len(dataloaders[args['phase']][args['idx']])))

    pretrained = True #False

    if pretrained:
        model = EfficientNet.from_pretrained(model_name, num_classes=4)
        model = model.to(args['device'])
        print('model-parameter- num : ', pytorch_count_params(model))
        # for k,i in model.named_parameters():
        #     print('k : ', k, 'i = ',i)
        #     i.requires_grad = False
        #     if 'fc' in k:
        #         i.requires_grad = True
    #
    else:
        # model_name = 'vit_model_xss'
        model_name = 'vit_model_s'
        net = kgu_Network(feature_extract=True, device=args['device'], num_class=4)
        model = net.get_model(model_name)
        model = model.to(args['device'])
        print('model-parameter- num : ', pytorch_count_params(model))

    save_model_path = os.path.join('./save_train_models',modelName)
    # print(os.listdir(save_model_path))
    save_model_pt= os.listdir(save_model_path)[-1]
    print(save_model_pt)
    # sys.exit()
    checkPoint = torch.load(os.path.join(save_model_path,save_model_pt))
    # print(checkPoint)
    model.load_state_dict(checkPoint)
    # for i in model.named_parameters():
    #     print(i)
    #


    model.eval()
    with torch.no_grad():
        for i, data in enumerate(
                DataLoader(dataset=dataloaders['val'][args['idx']], batch_size=batchsize, shuffle=True)):
            # get the inputs; data is a list of [inputs, labels]
            img, labels = data  # labels : dict
            B, _, _, _ = img.size()
            img = img.to(args['device'])
            labels = labels.to(args['device'])
            #
            # print(img)
            # print(labels)

            outputs = model(img)
            # print(outputs)

            pred = torch.max(outputs, dim=1).indices
            # print(pred)

            pd_label = [label_mapping[idx.item()] for idx in pred]
            # print(pd_label)

            gt_label = [label_mapping[idx.item()] for idx in labels]
            # print(gt_label)

            # sys.exit()
            match_num = len(pred[pred == labels])
            # print(match_num)

            print("{}/{} --> acc : {}".format(match_num, B, match_num / B))
            print('===========================================================')

            # visual_image_test(img= img,pd_labels=pd_label ,gt_labels=gt_label)

            # visual_image_data = val_label['origin_img']
            # # sys.exit()
            # visual_image(visual_image_data,pd_label,labels,val_label,label_infos,i)
def visual_image(img,pd_labels,gt_labels,val_label,label_infos,name):
    rows = 2
    columns = 2
    B = img.size()[0]

    pd = {'family': 'Malgun Gothic',
             'color': 'darkred',
             'weight': 'normal',
             'size': 15}

    gt = {'family': 'Malgun Gothic',
             'color': 'blue',
             'weight': 'normal',
             'size': 9,
             }
    fig = plt.figure(figsize=(20, 20))

    temp_list = ['basestyle','curl','bang','loss','side']
    for i in range(B):
        image_index = i + 1  # image index
        basestyle = "{}:{}\n".format(label_infos[0][pd_labels[0][i].item()] , label_infos[0][gt_labels['basestyle'][i].item()] )  # image title
        curl = "{}:{}\n".format(label_infos[1][pd_labels[1][i].item()] , label_infos[1][gt_labels['curl'][i].item()] )
        bang = "{}:{}\n".format(label_infos[2][pd_labels[2][i].item()] , label_infos[2][gt_labels['bang'][i].item()] )
        loss = "{}:{}\n".format(label_infos[3][pd_labels[3][i].item()] , label_infos[3][gt_labels['loss'][i].item()] )
        side = "{}:{}\n".format(label_infos[4][pd_labels[4][i].item()] , label_infos[4][gt_labels['side'][i].item()] )
        path = val_label['img_path'][i]
        plt.rc('font', family='Malgun Gothic')
        plt.subplot(rows, columns, image_index)  # subplot
        plt.title(basestyle+curl+bang+loss+side+path,fontdict=pd)  # title
        # // plt.axis('off')
        plt.xticks([])  # x = None
        plt.yticks([])  # y = None
        image = img[i].cpu().numpy()
        # plt.text(0.0, 0.35, 'np.random.randn()', fontdict=pd)
        # plt.text(10.0, 0.35, 'hobezxc', fontdict=gt)
        plt.imshow(np.transpose(image,(1,2,0)))
    plt.show()
    # plt.savefig('test_result/test_{}.png'.format(name))

if __name__ =='__main__':
    # args['mode'] = 'train'
    args['mode'] = 'val'

    args['epochs'] = 100
    # args['phase'] = 'train'
    args['phase'] = 'val'
    args['device'] = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
    # args['device'] = 'cpu'
    if args['mode'] == 'train':
        for idx,model_name in enumerate(trainModel_order):
            args['idx'] = idx
            train(args,model_name)
    else:
        for idx, model_name in enumerate(trainModel_order):
            args['idx'] = idx
            test(args, model_name)
    # test()
