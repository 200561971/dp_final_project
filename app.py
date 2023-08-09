from flask import Flask,jsonify,request, render_template
from Static import utils
app = Flask(__name__,template_folder='Templates',static_folder='Static')


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/test')
def test():
    labels = utils.labels
    values = utils.values
    return render_template('test.html',labels = labels, values= values)

@app.route('/chartType',methods=['GET','POST'])
def chartType():
    return render_template('home.html')

@app.route('/barchart_data')
def barchart_data():
    data = {
        'labels': utils.labels,
        'values': utils.values
    }

    return jsonify(data)


@app.route('/piechart_data')
def piechart_data():
    data ={
        'labels': utils.labels,
        'values': utils.values
    }
    return jsonify(data)

@app.route('/linechart_data')
def linechart_data():
    data = {
        'labels': utils.labels,
        'values': utils.values
    }
    return jsonify(data)


if __name__ =="__main__":
    app.run(host="0.0.0.0",port=3000)
