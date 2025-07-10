import pandas as pd

def match_questions_answers(questions_path, answers_path, output_path='matched.csv'):
    # Read CSV files
    questions_df = pd.read_csv(questions_path)
    answers_df = pd.read_csv(answers_path)

    # Clean column names
    questions_df.columns = questions_df.columns.str.strip()
    answers_df.columns = answers_df.columns.str.strip()

    # Rename 'Q. No.' to 'Q. No' if needed
    if 'Q. No.' in questions_df.columns:
        questions_df.rename(columns={'Q. No.': 'Q. No'}, inplace=True)

    # Normalize key columns
    questions_df['Q. No'] = questions_df['Q. No'].astype(str).str.strip()
    questions_df['Type'] = questions_df['Type'].astype(str).str.strip()
    answers_df['Q. No'] = answers_df['Q. No'].astype(str).str.strip()
    answers_df['Type'] = answers_df['Type'].astype(str).str.strip()

    # Add occurrence index to match repeated Q. No-Type combos
    questions_df['Occurrence'] = questions_df.groupby(['Q. No', 'Type']).cumcount()
    answers_df['Occurrence'] = answers_df.groupby(['Q. No', 'Type']).cumcount()

    # Merge on Q. No, Type, and Occurrence
    matched_df = pd.merge(
        questions_df,
        answers_df,
        on=['Q. No', 'Type', 'Occurrence'],
        how='inner',
        suffixes=('_question', '_answer')
    )

    # Drop occurrence column
    matched_df.drop(columns=['Occurrence'], inplace=True)

    # Save to CSV
    matched_df.to_csv(output_path, index=False)
    print(f"Matched {len(matched_df)} rows saved to {output_path}")

    # Calculate total marks
    # Convert marks to numeric safely (in case of bad data)
    matched_df['Marks'] = pd.to_numeric(matched_df['Marks'], errors='coerce').fillna(0)
    total_marks = matched_df['Marks'].sum()
    nums = len(matched_df)
    print(f"Total Marks: {total_marks}")
    return total_marks, nums

# Example usage
if __name__ == "__main__":
    match_questions_answers('questions.csv', 'answers.csv')