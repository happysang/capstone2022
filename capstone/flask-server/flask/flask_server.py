from flask import Flask
from flask import request
from hairskin_AI.hobeAI import HobeAI
app = Flask(__name__)

@app.route("/tospring")
def spring():
    hobe = HobeAI(pretrained_path='./save_model')
    result = hobe.process(image=None)
    result['User_ID'] = 'DummyTestID_qorgh346'
    print(result)

    # data = ''
    # a = [data + v + '\n' for v in result[0]]
    # print(a)
    return "Result = {}".format(str(result))
#
# @app.route("/send")
# def send_Result(input=):



@app.route('/')
def user_juso():
 
    temp = request.args.get('temp', "user")
 
    return "이미지주소: " + temp #허허...
    
if __name__ == '__main__':
    app.run(debug=False,host="127.0.0.1",port=5000)
