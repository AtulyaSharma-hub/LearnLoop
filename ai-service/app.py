from flask import Flask, request, jsonify

from sklearn.feature_extraction.text import CountVectorizer

from sklearn.naive_bayes import MultinomialNB

app = Flask(__name__)

# Training Data

texts = [

    "recursion in c++",
    "binary tree traversal",
    "integration formulas",
    "differential equations",
    "chemical bonding",
    "organic chemistry",
    "javascript loops",
    "probability questions"

]

labels = [

    "Programming",
    "Programming",
    "Mathematics",
    "Mathematics",
    "Chemistry",
    "Chemistry",
    "Programming",
    "Mathematics"

]

# Train AI Model

vectorizer = CountVectorizer()

X = vectorizer.fit_transform(texts)

model = MultinomialNB()

model.fit(X, labels)

# API Route

@app.route("/predict", methods=["POST"])

def predict():

    data = request.json

    question = data["question"]

    transformed = vectorizer.transform([question])

    prediction = model.predict(transformed)[0]

    return jsonify({

        "predicted_subject": prediction

    })

if __name__ == "__main__":

    app.run(port=8000)