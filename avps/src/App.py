from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/verify', methods=['POST'])
def verify():
    os.system(r'python -u "c:\Users\aneef\Work\Coding\Web\AVPS\avps\src\Python Code\ACPS\file\test.py"')
    result = "Python script executed successfully"
    return jsonify({"message": result})

if __name__ == '__main__':
    app.run(debug=True)
