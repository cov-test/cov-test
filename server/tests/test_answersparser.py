import os
import json
import unittest
import answersparser

class TestAnswersParser(unittest.TestCase):

    def test_parse(self):
        with open(os.path.join(os.path.dirname(__file__), '../tests/data/answers.json')) as f:
            json_data = json.load(f)
        result = answersparser.parse(json_data)
        self.assertEqual(result.coughing.audio, b'test')

if __name__ == '__main__':
    unittest.main()
