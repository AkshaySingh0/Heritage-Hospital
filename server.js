const express = require('express');
const app = express();
const port = 3000;

// Sample data (in-memory database)
let patients = [
  { id: 1, name: 'John Doe', age: 45, medicalHistory: 'Hypertension' },
  { id: 2, name: 'Jane Smith', age: 32, medicalHistory: 'Diabetes' }
];

let users = [];

// Middleware to parse JSON request bodies
app.use(express.json());

// GET all patients
app.get('/patients', (req, res) => {
  res.json(patients);
});

// GET a specific patient by ID
app.get('/patients/:id', (req, res) => {
  const patientId = parseInt(req.params.id);
  const patient = patients.find(p => p.id === patientId);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

// POST a new patient
app.post('/patients', (req, res) => {
  const newPatient = {
    id: patients.length + 1,
    name: req.body.name,
    age: req.body.age,
    medicalHistory: req.body.medicalHistory
  };

  patients.push(newPatient);
  res.status(201).json(newPatient);
});

// PUT (update) an existing patient
app.put('/patients/:id', (req, res) => {
  const patientId = parseInt(req.params.id);
  const patientIndex = patients.findIndex(p => p.id === patientId);

  if (patientIndex !== -1) {
    patients[patientIndex] = {
      id: patientId,
      name: req.body.name,
      age: req.body.age,
      medicalHistory: req.body.medicalHistory
    };

    res.json(patients[patientIndex]);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

// DELETE a patient
app.delete('/patients/:id', (req, res) => {
  const patientId = parseInt(req.params.id);
  patients = patients.filter(p => p.id !== patientId);

  res.status(204).send(); // No content
});

// User registration endpoint
app.post('/register', (req, res) => {
  const { contactNumber } = req.body;

  // Check if contact number already exists
  const userExists = users.find(user => user.contactNumber === contactNumber);
  if (userExists) {
    return res.status(400).json({ message: 'Contact number already registered' });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    contactNumber: contactNumber
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
