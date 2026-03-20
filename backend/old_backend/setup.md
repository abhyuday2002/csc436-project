# create python virtual enviroment:
python3 -m venv venv

# activate enviroment
# unix (i think, i didn't test it):
source venv/bin/activate
# windows powershell:
.\venv\Scripts\activate\ps1

# install requirments
pip install -r requirements.txt

# run server, just runs locally:
# be in project folder
python manage.py runserver

# url
http://127.0.0.1:8000/