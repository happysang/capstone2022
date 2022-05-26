졸업작품 캡스톤 프로젝트

1. Download Anaconda
	: https://www.anaconda.com/products/distribution

2. Create Virtual environment
	- conda create -n name python=3.6

3. conda activate name

4. Install Package
	- pip install Flask
	- pip install Flask-Cors
	- pip install Pillow
	- pip install numpy
	- conda install pytorch torchvision torchaudio cpuonly -c pytorch
		
	- pip install efficientnet-pytorch
	

TEST Mode

	- HobeAI(mode='Test',pretrained_path='D:/capstone2022/capstone/flask-server/flask/save_model',debug=True)

Demo Mode
	- HobeAI(mode='Demo',pretrained_path='D:/capstone2022/capstone/flask-server/flask/save_model',debug=True)


Start

	1. Run flask-server
		...waiting...	
	2. Run React 
	3. /test 
	4. Check Result