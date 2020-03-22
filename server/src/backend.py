import dataclasses
import enum

from flask import Flask, request
from flask import jsonify
from google.cloud import firestore

import answersparser
import classifier

app = Flask(__name__)


def replace_enum_by_string_recursive_in_dict(d):
    x = {}
    for k, v in d.items():
        if isinstance(v, dict):
            v = replace_enum_by_string_recursive_in_dict(v)
        elif isinstance(v, enum.Enum):
            v = v.name  # Replace enum by String representation
        x[k] = v
    return x


@app.route('/store_result', methods=['POST'])
def store_result():
    data = request.get_json()
    if data is None:
        return jsonify({'success': False,
                        'errorMessage': 'No JSON value provided or Content-Type of request not set to "application/json"'})
    test_data = answersparser.parse(data)

    doc_ref = db.collection("answers").document(test_data.userId)
    doc_ref.set(replace_enum_by_string_recursive_in_dict(dataclasses.asdict(test_data)))
    result = classifier.classify(test_data)

    return jsonify({'success': True, 'result': result})


if __name__ == '__main__':
    db = firestore.Client()
    app.run(debug=True, host='localhost')
