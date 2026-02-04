const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for students (in production, use a database)
let students = [];
let studentIdCounter = 1;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Student Registration Portal' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register New Student' });
});

app.post('/register', (req, res) => {
    const { firstName, lastName, email, phone, dateOfBirth, gender, course, address } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !email || !course) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please fill all required fields' 
        });
    }
    
    // Check if email already exists
    const existingStudent = students.find(s => s.email === email);
    if (existingStudent) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email already registered' 
        });
    }
    
    const newStudent = {
        id: studentIdCounter++,
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        gender,
        course,
        address,
        registeredAt: new Date().toISOString()
    };
    
    students.push(newStudent);
    
    res.json({ 
        success: true, 
        message: 'Student registered successfully!',
        studentId: newStudent.id
    });
});

app.get('/students', (req, res) => {
    res.render('students', { 
        title: 'All Students',
        students: students 
    });
});

app.get('/student/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    
    if (!student) {
        return res.status(404).render('404', { title: 'Student Not Found' });
    }
    
    res.render('student-detail', { 
        title: 'Student Details',
        student: student 
    });
});

app.delete('/student/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ 
            success: false, 
            message: 'Student not found' 
        });
    }
    
    students.splice(index, 1);
    res.json({ 
        success: true, 
        message: 'Student deleted successfully' 
    });
});

app.get('/api/students', (req, res) => {
    res.json(students);
});

app.get('/api/stats', (req, res) => {
    const stats = {
        totalStudents: students.length,
        courses: {}
    };
    
    students.forEach(student => {
        stats.courses[student.course] = (stats.courses[student.course] || 0) + 1;
    });
    
    res.json(stats);
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📚 Student Registration Portal is ready!`);
});
