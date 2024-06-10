import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)


df = pd.read_csv('try(3).csv').head(10000)

df_unique = df.drop_duplicates(subset=['question'])


df_unique['question'] = df_unique['question'].str.lower()

tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=5000) 
tfidf_matrix = tfidf_vectorizer.fit_transform(df_unique['question'])

@app.route('/recommend/<input_text>', methods=['GET'])
def recommend(input_text):
    
    input_tfidf = tfidf_vectorizer.transform([input_text.lower()])


    cosine_similarities = cosine_similarity(input_tfidf, tfidf_matrix).flatten()


    similar_indices = cosine_similarities.argsort()[:-11:-1]
    for index in similar_indices:
        print(f"Index: {index}, Score: {cosine_similarities[index]}, Question: {df_unique.iloc[index]['question']}")


    recommendations = df_unique.iloc[similar_indices]


    recommendations_list = recommendations.to_dict(orient='records')

    return jsonify(recommendations_list)

if __name__ == '__main__':
    app.run(debug=True)
