from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from datetime import datetime
import json
from openai import OpenAI
from dotenv import load_dotenv
import base64
from PIL import Image
import io
import time
from indian_nutrition_chatbot import IndianNutritionChatbot

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))


chatbot = IndianNutritionChatbot()  # Initialize the chatbot instance

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_query = data.get("question")
    
    if not user_query:
        return jsonify({"error": "No question provided"}), 400
    
    response = chatbot.generate_response(user_query)
    return jsonify({"response": response})


if __name__ == '__main__':
    app.run(debug=True)