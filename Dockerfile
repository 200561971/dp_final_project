FROM python:3.11.4-slim-buster


ADD . /app
WORKDIR /app

RUN pip install -r requirements.txt

CMD python ./app.py