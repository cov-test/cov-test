from flask import Flask, request
from flask import jsonify
from google.cloud import firestore

import answersparser
import classifier

app = Flask(__name__)


@app.route('/store_result', methods=['POST'])
def store_result():
    data = request.get_json()
    if data is None:
        return jsonify({'success': False,
                        'errorMessage': 'No JSON value provided or Content-Type of request not set to "application/json"'})
    test_data = answersparser.parse(data)

    doc_ref = db.collection("answers").document(test_data.userId)
    doc_ref.set(test_data)
    result = classifier.classify(test_data)

    return jsonify({'success': True, 'result': result})


if __name__ == '__main__':
    db = firestore.Client()
    app.run(debug=True, host='0.0.0.0')
