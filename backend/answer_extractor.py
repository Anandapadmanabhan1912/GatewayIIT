import pdfplumber
import pandas as pd
import os 

def answer_extract(pdf_path, output_csv_path=None):
    """
    Extracts answer keys from a PDF document, assuming the answers are
    structured in tables with specific header keywords.

    Args:
        pdf_path (str): The file path to the input PDF document.
        output_csv_path (str, optional): The file path for the output CSV.
                                         If None, a default filename will be generated
                                         based on the PDF name (e.g., 'electrical_answers.csv').

    Returns:
        pandas.DataFrame: A DataFrame containing the extracted answer records.
                          Returns an empty DataFrame if no data is extracted or on error.
    
    Raises:
        FileNotFoundError: If the specified PDF file does not exist.
        Exception: For other errors during PDF processing or data extraction.
    """

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF file not found at: {pdf_path}")

    # Keywords to identify headers (lowercase match)
    # These are constants and should ideally be defined outside the function
    # or as a global constant if used across multiple functions in a module.
    # For this function, we'll keep them inside for self-containment.
    EXPECTED_HEADERS = ['q', 'type', 'section', 'key', 'mark']

    def normalize(text):
        """Normalizes text by stripping whitespace, lowercasing, and removing periods."""
        return str(text).strip().lower().replace(".", "")

    # Storage for results
    records = []

    try:
        with pdfplumber.open(pdf_path) as pdf:
            header_found = False
            col_indices = {}

            for page in pdf.pages:
                tables = page.extract_tables()

                for table in tables:
                    for row in table:
                        if not any(cell for cell in row if cell is not None and str(cell).strip()):
                            # Skip truly empty rows (even if they contain None/empty strings)
                            continue

                        row_normalized = [normalize(cell) for cell in row]

                        # Step 1: Try to detect header row
                        # Ensure all expected headers are present in the row
                        if not header_found and all(any(h in cell for cell in row_normalized) for h in EXPECTED_HEADERS):
                            try:
                                col_indices = {
                                    "qno": row_normalized.index(next(cell for cell in row_normalized if "q" in cell)),
                                    "type": row_normalized.index(next(cell for cell in row_normalized if "type" in cell)),
                                    "section": row_normalized.index(next(cell for cell in row_normalized if "section" in cell)),
                                    "key": row_normalized.index(next(cell for cell in row_normalized if "key" in cell)),
                                    "marks": row_normalized.index(next(cell for cell in row_normalized if "mark" in cell)),
                                }
                                header_found = True
                                continue # Skip header row from data extraction
                            except StopIteration:
                                # This means one of the expected headers was not found even after the all() check.
                                # Could indicate a malformed header row. Treat as non-header.
                                pass 
                            except ValueError:
                                # This means a header was not found when .index() was called.
                                pass


                        # Step 2: Extract row if header was found and it's not the header row itself
                        if header_found:
                            # Heuristic: Check if the first column (Q. No) looks like a question number.
                            # This helps to avoid extracting subsequent header-like rows or unrelated table data.
                            q_no_cell = row[col_indices["qno"]]
                            if q_no_cell is None or not str(q_no_cell).strip().isdigit():
                                continue # Skip if Q. No is not a digit

                            try:
                                record = {
                                    "Q. No": row[col_indices["qno"]],
                                    "Type": row[col_indices["type"]],
                                    "Section": row[col_indices["section"]],
                                    "Key/Range": row[col_indices["key"]],
                                    "Marks": row[col_indices["marks"]],
                                }
                                # Validate extracted values are not all empty or None, which might happen in malformed rows
                                if all(cell is not None and str(cell).strip() for cell in record.values()):
                                    records.append(record)
                            except IndexError:
                                # This can happen if a row has fewer columns than expected based on the header.
                                # Log it or just skip as a malformed row.
                                # print(f"Warning: Malformed row (IndexError) skipped: {row}")
                                continue
                            except KeyError:
                                # This should ideally not happen if col_indices is correctly set,
                                # but good for robustness.
                                # print(f"Warning: Missing column index (KeyError) for row: {row}")
                                continue

    except Exception as e:
        print(f"An error occurred during PDF processing: {e}")
        return pd.DataFrame() # Return empty DataFrame on error

    df = pd.DataFrame(records)
    
    # Generate default output CSV path if not provided
    if output_csv_path is None:
        base_name = os.path.splitext(os.path.basename(pdf_path))[0]
        output_csv_path = f"{base_name}_answers.csv"

    try:
        df.to_csv(output_csv_path, index=False)
        print(f" Extracted {len(df)} entries to {output_csv_path}")
    except Exception as e:
        print(f"Error saving to CSV: {e}")

    return df

# --- Example Usage ---
if __name__ == "__main__":
    # Ensure you have 'electrical.pdf' in the same directory, or provide the full path.
    # For demonstration, let's assume 'electrical.pdf' exists.
    sample_pdf_path = "electrical.pdf" 
    
    # You can call the function without specifying output_csv_path:
    # extracted_answers_df = answer_extract(sample_pdf_path)

    # Or specify a custom output path:
    extracted_answers_df = answer_extract(sample_pdf_path, "my_custom_answers.csv")

    if not extracted_answers_df.empty:
        print("\nFirst 5 rows of extracted data:")
        print(extracted_answers_df.head())
    else:
        print("\nNo answers could be extracted or an error occurred.")

    # Example of handling a non-existent file
    # try:
    #     answer_extract("non_existent_file.pdf")
    # except FileNotFoundError as e:
    #     print(e)