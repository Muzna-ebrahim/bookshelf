# Interactive Bookshelf Platform

A full-stack reading platform with category-based visuals and admin management.

## Quick Start

### Backend (Flask API)
```bash
cd backend
python3 app.py
```
Server runs on: http://localhost:5000

### Frontend (Static Files)
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

## Project Structure
```
flask-bookshelf-fullstack/
├── backend/           # Flask API server
│   ├── app.py        # Main application
│   ├── models.py     # Database models
│   ├── config.py     # Configuration
│   └── seed.py       # Database seeding
└── frontend/         # Static frontend
    └── public/       # HTML, CSS, JS files
        ├── index.html
        └── app.js
```

## Features
- **User Authentication**: Reader/Admin roles
- **Category-Based Visuals**: Unique backgrounds per category
- **Admin Management**: Each admin manages their own books
- **Interactive UI**: Responsive design with smooth animations
- **Database Integration**: SQL with relationships

## Categories
- Philosophy (Purple theme)
- Programming (Green theme) 
- Science Fiction (Blue theme)
- History (Yellow theme)

## Default Users
- admin1 / admin2 (Admins)
- reader1 (Reader)