from flask import Flask,jsonify,request, render_template

app = Flask(__name__,template_folder='Templates')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/piechart')
def piechart():
    return render_template('piechart.html')

@app.route('/barchart')
def barchart():
    return render_template('barchart.html')


if __name__ =="__main__":
    app.run(host="0.0.0.0",port=3000)