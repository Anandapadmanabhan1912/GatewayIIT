# GatewayIIT

**GatewayIIT** is a lightweight, custom-built GATE exam preparation app designed to streamline the practice experience for aspiring candidates. It automates the extraction of questions from official GATE exam papers (available as PDFs) and creates interactive quizzes covering MCQ, MSQ, and numerical answer-type questions. The app offers a seamless web experience with a React frontend and a Flask backend.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Official GATE Papers Source](#official-gate-papers-source)
- [Installation](#installation)
- [Demo](#demo)
- [License](#license)

---

## About the Project

Preparing for GATE often involves practicing from past year papers, but manually browsing and extracting questions is time-consuming. **GatewayIIT** automates this process:

- It scrapes GATE question papers hosted as PDF files from the official website.
- It extracts individual question images and parses the answer keys from the PDF’s end sections.
- It organizes these into a structured quiz format, handling:
  - **MCQ** (Multiple Choice Questions)
  - **MSQ** (Multiple Select Questions)
  - **NAT** (Numerical Answer Type questions)
- After quiz completion, users receive a **detailed analysis** of their responses, enabling targeted revision and practice.

---

## Features

✅ Scrapes official GATE exam papers in PDF format  
✅ Extracts question images and parses answers automatically  
✅ Supports MCQ, MSQ, and NAT question types  
✅ Generates interactive quizzes dynamically  
✅ Provides detailed textual analysis after quiz completion  
✅ Lightweight, fast, and modern web UI  
✅ Modular and extensible backend pipeline for PDF parsing and data storage

---

## Technology Stack

### Frontend

- **React** (JavaScript)
- React Hooks & Context API
- Axios for HTTP requests
- CSS for custom styling

### Backend

- **Flask** (Python)
- PDF parsing libraries:
  - `fitz` (PyMuPDF)
  - `pdfplumber`
- REST API design
- Data storage in JSON/structured formats

---

## Official GATE Papers Source

GatewayIIT scrapes past question papers from the official GATE website.  
👉 [View GATE Question Papers Here](https://gate.iitkgp.ac.in/old_question_papers.html)

---

## Installation

Follow the steps below to set up the project locally.

---

### Backend Setup

1. Clone the repository:

   ```
   git clone <repo-url>
   cd gatewayiit
   ```

2. Navigate to the backend folder:
   ```
   cd backend
   ```
3. Create a virtual environment and activate it:

   ```
   python3 -m venv venv
   source venv/bin/activate   # macOS/Linux
   # OR
   venv\Scripts\activate      # Windows

   ```

4. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run the Flask server:
   ```
   python app.py
   ```
   By default, the Flask backend runs at:

```
http://localhost:5000
```

## Frontend Setup

Open a new terminal window and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm start
```

The React frontend runs at:

```
http://localhost:3000
```

## Demo
