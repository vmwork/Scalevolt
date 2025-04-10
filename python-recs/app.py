from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Python Recommendations Service is running!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)" > app.py    "
    ""
    "from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    # In a real app, you'd calculate recommendations here
    product_id = request.args.get('product_id')
    
    sample_recommendations = [
        {"id": 1, "name": "Product 1", "price": 19.99},
        {"id": 2, "name": "Product 2", "price": 29.99},
        {"id": 3, "name": "Product 3", "price": 39.99}
    ]
    
    return jsonify(sample_recommendations)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)