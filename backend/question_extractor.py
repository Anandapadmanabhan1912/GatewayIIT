import fitz  # PyMuPDF
import os
import re
import pandas as pd

def extract_questions_from_pdf(pdf_path, output_dir, questions_csv_path=None):
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF file not found at: {pdf_path}")

    os.makedirs(output_dir, exist_ok=True)

    question_data_for_csv = []
    extracted_count = 0

    try:
        doc = fitz.open(pdf_path)

        for page_num, page in enumerate(doc):
            blocks = page.get_text("blocks")
            collecting = False
            question_blocks = []
            min_x0 = min_y0 = float('inf')
            max_x1 = max_y1 = float('-inf')
            q_num_str = None

            for block in blocks:
                x0, y0, x1, y1, text = *block[:4], block[4].strip()

                match = re.match(r"^Q\.(\d+)\s{2,}(.*)", text)
                if match:
                    # Save previous question if collecting
                    if collecting and question_blocks and q_num_str:
                        combined_text = " ".join(b[4] for b in question_blocks)
                        q_type = "MCQ" if all(opt in combined_text for opt in ["(A)", "(B)", "(C)", "(D)"]) else (
                            "NAT" if re.search(r"Answer\s+in\s+(integer|decimal|number)|decimal places|decimals", combined_text, re.IGNORECASE) else None
                        )

                        if q_type:
                            rect = fitz.Rect(min_x0, min_y0, max_x1, max_y1)
                            if rect.is_empty:
                                print(f"⚠️ Invalid rectangle for Q.{q_num_str} on page {page_num + 1}")
                            else:
                                img_path = os.path.join(output_dir, f"q{q_num_str.zfill(3)}_{q_type}_p{page_num+1}.png")
                                pix = page.get_pixmap(clip=rect, dpi=150)
                                pix.save(img_path)
                                extracted_count += 1

                                question_data_for_csv.append({
                                    "Q. No": q_num_str,
                                    "Type": q_type,
                                    "Question Text": combined_text,
                                    "Image Path": img_path
                                })

                    # Start new question
                    q_num_str = match.group(1).strip()
                    collecting = True
                    question_blocks = [(x0, y0, x1, y1, text)]
                    min_x0, min_y0, max_x1, max_y1 = x0, y0, x1, y1

                elif collecting:
                    question_blocks.append((x0, y0, x1, y1, text))
                    min_x0 = min(min_x0, x0)
                    min_y0 = min(min_y0, y0)
                    max_x1 = max(max_x1, x1)
                    max_y1 = max(max_y1, y1)

            # Final block after page ends
            if collecting and question_blocks and q_num_str:
                combined_text = " ".join(b[4] for b in question_blocks)
                q_type = "MCQ" if all(opt in combined_text for opt in ["(A)", "(B)", "(C)", "(D)"]) else (
                    "NAT" if re.search(r"Answer\s+in\s+(integer|decimal|number)|decimal places|decimals", combined_text, re.IGNORECASE) else None
                )
                if q_type:
                    rect = fitz.Rect(min_x0, min_y0, max_x1, max_y1)
                    if not rect.is_empty:
                        img_path = os.path.join(output_dir, f"q{q_num_str.zfill(3)}_{q_type}_p{page_num+1}.png")
                        pix = page.get_pixmap(clip=rect, dpi=150)
                        pix.save(img_path)
                        extracted_count += 1

                        question_data_for_csv.append({
                            "Q. No": q_num_str,
                            "Type": q_type,
                            "Question Text": combined_text,
                            "Image Path": img_path
                        })

        doc.close()

        # Save to CSV
        if questions_csv_path is None:
            base = os.path.splitext(os.path.basename(pdf_path))[0]
            questions_csv_path = f"{base}_questions.csv"

        pd.DataFrame(question_data_for_csv).to_csv(questions_csv_path, index=False, encoding='utf-8', errors='replace')
        print(f"✅ Extracted {extracted_count} questions. Saved to: {questions_csv_path}")
        return extracted_count

    except Exception as e:
        print(f" Error: {e}")
        return 0


import os
from question_extractor import extract_questions_from_pdf  # if needed

if __name__ == "__main__":
    # Get absolute path to current script directory
    base_dir = os.path.dirname(os.path.abspath(__file__))

    pdf_path = os.path.join(base_dir, "uploads", "electrical.pdf")
    output_dir = os.path.join(base_dir, "extracted_questions")
    questions_csv_path = os.path.join(base_dir, "questions.csv")

    print(f"Looking for PDF at: {pdf_path}")  # For debug

    extract_questions_from_pdf(pdf_path, output_dir, questions_csv_path)
