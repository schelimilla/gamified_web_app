from flask import Flask, render_template
from global_data import leaderboard_data, data_types_questions

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/leaderboard')
def leaderboard():
    # return render_template('leaderboard.html')
    return render_template('leaderboard.html', leaderboard_data=leaderboard_data)


# /////////////////
@app.route('/data_types')
def data_types():
    return render_template('data_types.html', data_types_questions=data_types_questions)

@app.route('/string_methods')
def string_methods():
    return render_template('string_methods.html')

if __name__ == '__main__':
    app.run(debug=True)
