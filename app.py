from flask import Flask, render_template, request, jsonify
from functions import get_colors
import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/generate-pallete', methods=['POST'])
def generatePallete():
  file = request.files["img"]
  n_colors = int(request.form["colors"])
  print(n_colors)
  filename = file.filename.split('.')[0]
  extension = file.filename.split('.')[-1]
  filename = f'{filename}.{extension}'
  save_to = f'static/{filename}'
  file.save(save_to)
  
  output = get_colors(filename=filename, n_colors=n_colors)

  api = {
    'code': 200,
    'message': f'Success generate {n_colors} colors from image {filename}.',
    'colors': output
  }

  return jsonify(api)

@app.route('/test')
def test():
  return render_template("real.html")

if __name__ == "__main__":
  app.run('0.0.0.0', port=6969, debug=True)
