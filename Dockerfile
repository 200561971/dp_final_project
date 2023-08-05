FROM python:3.11.4-slim-buster


ADD . /app
WORKDIR /app
EXPOSE 5000
RUN pip install -r requirements.txt

CMD python ./app.py