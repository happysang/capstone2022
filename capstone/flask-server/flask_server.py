from flask import Flask, render_template, request
from cgitb import html

app = Flask(__name__)

@app.route('/upload')
def upload_file():
    return render_template("getimage.html")


@app.route('/uploader', methods = ['GET', 'POST'])
def uploader_file():
    if request.method == 'POST':
        f = request.files['file']
        # 호준이가 작성할 로직.
        # 위에서 받은 사진 파일로 결과 값을 얻어 낸 후 아래 return 값에 결과값을 넘겨준다.        
        return "결과값"


@app.route('/test')
def test():
    return "test값 입니다."

@app.route('/')
def home():
    return "홈입니다."
    
if __name__ == '__main__':
    app.run(debug=False,host="127.0.0.1",port=5000)