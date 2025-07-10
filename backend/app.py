from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import os
import shutil
import csv
from werkzeug.utils import secure_filename
from question_extractor import extract_questions_from_pdf
from answer_extractor import answer_extract
from matcher import match_questions_answers

UPLOAD_FOLDER = 'uploads'
QUESTION_FOLDER = 'static/questions'
ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['QUESTION_FOLDER'] = QUESTION_FOLDER
app.config['CSV_PATH'] = os.path.join(app.config['UPLOAD_FOLDER'], 'matched.csv')


os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(QUESTION_FOLDER, exist_ok=True)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    # Clear contents of UPLOAD_FOLDER and QUESTION_FOLDER
    for folder in [app.config['UPLOAD_FOLDER'], app.config['QUESTION_FOLDER']]:
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)  # Remove file or symlink
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)  # Remove directory
            except Exception as e:
                print(f'Failed to delete {file_path}. Reason: {e}')

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Extract questions
        question_count = extract_questions_from_pdf(filepath, QUESTION_FOLDER, os.path.join(UPLOAD_FOLDER, 'questions.csv'))
        answer_extract(filepath, os.path.join(UPLOAD_FOLDER, 'answers.csv'))
        marks, matches = match_questions_answers(
            os.path.join(UPLOAD_FOLDER, 'questions.csv'),
            os.path.join(UPLOAD_FOLDER, 'answers.csv'),
            os.path.join(UPLOAD_FOLDER, 'matched.csv')
        )
        return jsonify({
            'message': 'PDF processed',
            'total_questions': int(question_count),
            'total_marks': float(marks),
            'matches': int(matches)
        }), 200
    return jsonify({'error': 'Invalid file type'}), 400



@app.route('/questions', methods=['GET'])
def list_questions():
    try:
        questions_data = []
        with open(app.config['CSV_PATH'], newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                questions_data.append({
                    "qno": row["Q. No"].strip(),
                    "image": row["Image Path"].strip(),
                    "key": row["Key/Range"].strip(),
                    "type": row["Type"].strip(),
                    "marks": row["Marks"].strip(),
                    "section": row["Section"].strip(),
                    "text": row["Question Text"].strip()
                })

        return jsonify({"questions": questions_data})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/images/<path:filename>')
def serve_image(filename):
    try:
        return send_file(filename)  # filename already includes 'static/...'
    except Exception as e:
        return {"error": str(e)}, 404

@app.route('/submit', methods=['POST'])
def submit_answers():
    try:
        user_answers = request.json.get('answers', {})
        matched_path = os.path.join(app.config['UPLOAD_FOLDER'], 'matched.csv')
        df = pd.read_csv(matched_path)

        score = 0.0
        detailed_results = []

        for index, row in df.iterrows():
            section = str(row['Section']).strip()
            qno = str(row['Q. No']).strip()
            key = f"{section}_{qno}"
            correct = str(row['Key/Range']).strip()
            type_ = row['Type'].strip()
            marks = float(row['Marks'])
            image = row['Image Path']
            user_ans = user_answers.get(key, '').strip()

            is_correct = False
            penalty = 0.0
            is_unanswered = (user_ans == '')

            if not is_unanswered:
                if type_ == 'MCQ':
                    if user_ans == correct:
                        score += marks
                        is_correct = True
                    else:
                        penalty = (1 / 3 * marks) if marks == 1 else (2 / 3 * marks)
                        score -= penalty

                elif type_ == 'MSQ':
                    if user_ans == correct:
                        score += marks
                        is_correct = True
                    # No penalty if wrong

                elif type_ == 'NAT':
                    try:
                        user_val = float(user_ans)
                        if 'to' in correct.lower():
                            parts = correct.lower().replace(' ', '').split('to')
                            lower = float(parts[0])
                            upper = float(parts[1])
                            if lower <= user_val <= upper:
                                score += marks
                                is_correct = True
                            else:
                                if float(correct) == user_val:
                                    score += marks
                                    is_correct = True
                    except:
                        pass  # Invalid input
        # Append result with flag
            detailed_results.append({
                'qno': qno,
                'section': section,
                'image': image,
                'type': type_,
                'userAnswer': user_ans if not is_unanswered else None,
                'correct': correct,
                'marks': marks,
                'isCorrect': is_correct,
                'unanswered': is_unanswered,
                'penalty': round(penalty, 2) if penalty > 0 else 0.0
            })
        
        # After the for-loop ends
        type_summary = {
            'MCQ': {'total': 0, 'attempted': 0, 'correct': 0},
            'MSQ': {'total': 0, 'attempted': 0, 'correct': 0},
            'NAT': {'total': 0, 'attempted': 0, 'correct': 0},
        }

        for res in detailed_results:
            qtype = res['type']
            type_summary[qtype]['total'] += 1
            if not res['unanswered']:
                type_summary[qtype]['attempted'] += 1
            if res['isCorrect']:
                type_summary[qtype]['correct'] += 1

        return jsonify({
            'score': round(score, 2),
            'total': len(detailed_results),
            'total_marks': df['Marks'].astype(float).sum(),
            'attempted': sum(1 for res in detailed_results if not res['unanswered']),
            'analysis': detailed_results,
            'summary': type_summary
            }), 200



    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
