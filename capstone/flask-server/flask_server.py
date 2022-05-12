from flask import Flask, render_template, request, jsonify, current_app
from cgitb import html
from flask_cors import CORS
from PIL import Image
from werkzeug.utils import secure_filename
from torchvision.transforms import ToPILImage,Resize

app = Flask(__name__)
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})

@app.route('/upload')
def upload_file():
    return render_template("getimage.html")


@app.route('/uploader', methods=['GET', 'POST'])
def uploader_file():
    if request.method == 'POST':
        f = request.files['file']
        # 호준이가 작성할 로직.
        # 위에서 받은 사진 파일로 결과 값을 얻어 낸 후 아래 return 값에 결과값을 넘겨준다.
        return "결과값"


@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        file = request.files.get('file')
        state = request.form.get('state')
        # f = request.files['file']
        # f.save(secure_filename(f.filename))
        # name = request.json.get('name')
        # url = request.json.get('imageUrl')
        # data = request.json.get('data')
        # print(name)
        # print(url)
        # print(data)
        print(file)
        print(state)
        img = Image.open(file.stream)
        import numpy as np
        img = np.array(img)
        print(img)
        t = ToPILImage()
        b = t(img)
        print(b)
        #img.show()
        retrun_list = list()
        wrap_dict = dict()
        type_list = ['모낭사이홍반','모낭홍반농포','미세각질','비듬','탈모']
        wrap_dict['User_ID'] = 'DummyTestID_qorgh346'
        wrap_dict['result'] = 'dry'
        wrap_dict['typeOfScalp'] = list()
        for type in type_list:
            wrap_dict['typeOfScalp'].append({'type': type, 'value': 0.34212, 'state': '중증'})
        # wrap_dict['User_ID'] = 'DummyTestID_qorgh346'
        #
        # d['status'] = '상태값'
        # d['zzzz'] = 'dddddd'
        return jsonify(wrap_dict)

    else:
        user = 'user'
        return "get method : " + user

@app.route('/')
def home():
    return "홈입니다."


if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)