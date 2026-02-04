# 🎓 Student Registration Portal

A beautiful and modern student registration portal built with Node.js, Express, and EJS templating engine.

## ✨ Features

- **Student Registration**: Easy-to-use form for registering new students
- **View All Students**: Browse all registered students in a clean table format
- **Student Details**: View detailed information about individual students
- **Real-time Statistics**: Dashboard showing total students and course distribution
- **Search Functionality**: Quick search to find students by name, email, or course
- **Delete Students**: Remove student records with confirmation
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd student-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
student-portal/
├── public/
│   ├── css/
│   │   └── style.css          # Styles for the application
│   └── js/
│       └── main.js            # Client-side JavaScript
├── views/
│   ├── index.ejs              # Home page
│   ├── register.ejs           # Registration form
│   ├── students.ejs           # List of all students
│   ├── student-detail.ejs     # Individual student details
│   └── 404.ejs                # Page not found
├── server.js                  # Main server file
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🎯 API Endpoints

- `GET /` - Home page
- `GET /register` - Registration form page
- `POST /register` - Register a new student
- `GET /students` - View all students page
- `GET /student/:id` - View individual student details
- `DELETE /student/:id` - Delete a student
- `GET /api/students` - Get all students (JSON)
- `GET /api/stats` - Get statistics (JSON)

## 💾 Data Storage

Currently, the application uses in-memory storage (data will be lost when the server restarts). For production use, you should integrate a database like:

- MongoDB (with Mongoose)
- PostgreSQL (with Sequelize)
- MySQL (with Sequelize)

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `public/css/style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

### Adding More Courses

Edit the course dropdown in `views/register.ejs`:

```html
<option value="Your New Course">Your New Course</option>
```

## 📝 Usage Guide

### Registering a Student

1. Click "Register New Student" on the home page
2. Fill in the required fields (marked with *)
3. Optional fields can be left blank
4. Click "Register Student"
5. You'll be redirected to the students list

### Viewing Students

1. Click "All Students" in the navigation
2. Use the search bar to filter students
3. Click on a student's name to view full details

### Deleting Students

1. Go to the student's detail page or the students list
2. Click "Delete" button
3. Confirm the deletion

## 🔒 Security Notes

For production deployment:

- Add input validation and sanitization
- Implement authentication and authorization
- Use HTTPS
- Add rate limiting
- Implement CSRF protection
- Use environment variables for configuration
- Add proper error logging

## 🤝 Contributing

Feel free to fork this project and add your own features!

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Happy Coding! 🚀**
