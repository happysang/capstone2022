from flask import Flask, render_template, request, jsonify, current_app
from hairskin_AI.hobeAI import HobeAI
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)

hobe = HobeAI(mode='Test',pretrained_path='D:/capstone2022/capstone/flask-server/flask/save_model',debug=True)
@app.route("/tospring")
def spring():
    result = hobe.process(image=None)
    print(result)
    return "Result = {}".format(str(result))


@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        file = request.files.get('file')
        state = request.form.get('state')
        img = Image.open(file.stream)
        wrap_dict = hobe.process(image=img)
        return jsonify(wrap_dict)

    else:
        user = 'user'
        return "get method : " + user


@app.route('/')
def user_juso():
    temp = request.args.get('temp', "user")

    return "이미지주소: " + temp  # 허허...


if __name__ == '__main__':
    app.run(debug=False, host="127.0.0.1", port=5000)