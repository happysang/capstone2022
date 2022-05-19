import torch
from torch import nn
from torchvision import models
import sys
from hairskin_AI.mobilevit_model import *
class kgu_Network():
    def __init__(self,feature_extract,device,num_class):
        self.models = {'vit_model_xss':mobilevit_xxs(num_class).to(device),
                       'vit_model_xs':mobilevit_xs(num_class).to(device),
                       'vit_model_s':mobilevit_s(num_class).to(device)}
        # self.vit_model_xss = mobilevit_xxs().to(device)
        # self.vit_model_xs = mobilevit_xs().to(device)
        # self.vit_model_s = mobilevit_s().to(device)
    def get_model(self,model_name):
        return self.models[model_name]


    def getParam(self,model_name):
        return self.models[model_name].parameters()




    def set_parameter_requires_grad(self,model, feature_extracting):
        if feature_extracting:
            # print(model)
            for name,param in model.named_parameters():
                param.requires_grad = False

if __name__ =='__main__':
    # a = MultiheadClassifier(feature_extract=True)
    feature_model = a.get_submodule('model.layer2')
    for name, param in feature_model.named_parameters():
        print(f"Layer: {name} | Size: {param.size()} | Values : {param[:2]} \n")
    b = torch.rand(1,3,255,255)
    # print(b)
    x = a(b)
    print(x)
    # print(a)