import torch
import torch.nn as nn
class hobe_M(nn.Module):
    def __init__(self,num_feature,class_num,head_num=1):
        super().__init__()
        self.num_feature = num_feature
        self.class_num = class_num
        self.head_num = head_num
        if self.head_num != 1:
            self.multi_head_layer = [
                nn.Sequential(nn.Linear(in_features=self.num_feature, out_features=num_out_feature, bias=False)) \
                for num_out_feature in [31, 9, 8, 4, 3]]
            self.fc = self.multi_head_layer[0]
            self.fc1 = self.multi_head_layer[1]
            self.fc2 = self.multi_head_layer[2]
            self.fc3 = self.multi_head_layer[3]
            self.fc4 = self.multi_head_layer[4]
        else:
            self.fc = nn.Sequential(nn.Linear(in_features=self.num_feature,out_features=class_num,bias=False))


    def forward(self,x):
        if self.head_num == 1:
            return self.fc(x)
        else:
            x0 = self.fc(x)
            x1 = self.fc1(x)
            x2 = self.fc2(x)
            x3 = self.fc3(x)
            x4 = self.fc4(x)

            return x0, x1, x2, x3, x4


