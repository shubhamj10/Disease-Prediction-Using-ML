from flask import Flask, request, jsonify
from flask_ngrok import run_with_ngrok
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from flask_cors import CORS
import json
import re
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
llm = ChatGoogleGenerativeAI(model='gemini-pro', google_api_key=GOOGLE_API_KEY)


symptom_list = [
    "fever", "cough", "fatigue", "shortness of breath", "headache",
    "muscle aches", "sore throat", "loss of taste", "nausea", "vomiting",
    "diarrhea", "chills", "congestion", "runny nose", "body aches",
    "rash", "joint pain"
]

prompt_template = PromptTemplate(
    input_variables=["query"],
    template=(
        "Given the query: '{query}', extract the symptoms from the following list and return them in valid JSON format:\n"
        "Symptom List: {symptom_list}\n"
        "Output should be in the following format:\n"
        '{{ "symptoms": ["symptom1", "symptom2", ...] }}'
    )
)

@app.route('/api/symptoms', methods=['POST'])
def get_symptoms():
    data = request.json
    query = data.get('query', '')

    if not query:
        return jsonify({"error": "Query is required"}), 400

    prompt = prompt_template.format(query=query, symptom_list=', '.join(symptom_list))
    result = llm.invoke(prompt)


    print("Raw LLM Result:", result.content)

    try:
        raw_json = result.content.strip()
        print("Raw Output:", raw_json)

        raw_json = raw_json.replace("'", '"') 
        raw_json = re.sub(r'(\w+):', r'"\1":', raw_json)  

        
        print("Modified LLM Result:", raw_json)

      
        symptoms = json.loads(raw_json)
        return jsonify({"symptoms": symptoms.get("symptoms", [])})

    except json.JSONDecodeError as e:
        return jsonify({
            "error": "Invalid JSON from LLM",
            "details": str(e),
            "raw_output": result.content
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
