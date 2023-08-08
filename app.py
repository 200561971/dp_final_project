from flask import Flask,jsonify,request, render_template
from Static import utils
app = Flask(__name__,template_folder='Templates')


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/piechart')
def piechart():
    labels = utils.labels
    values = utils.values
    return render_template('piechart.html',labels= labels, values = values)

@app.route('/barchart')
def barchart():

    labels = utils.labels
    values = utils.values

    return render_template('barchart.html',labels = labels, values = values)

@app.route('/linechart')
def linechart():
    labels = utils.labels
    values = utils.values
    return render_template('linechart.html',labels = labels, values = values)

@app.route('/test')
def test():
    labels = utils.labels
    values = utils.values
    return render_template('test.html',labels = labels, values= values)
 
if __name__ =="__main__":
    app.run(host="0.0.0.0",port=3000)
