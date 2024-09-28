const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: {
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    required: true
   },
  birthday: { 
    type: Date, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  state: { 
    type: String, 
    required: true
   },
  district: {
     type: String, 
     required: true 
  },
  city: { 
    type: String,
    required: true 
  },
  taluka: { 
    type: String, 
    required: true 
  },
  yearsOfExperience: { 
    type: Number, 
    required: true 
  },
  educationalQualification: { 
    type: String, 
    required: true 
  },
  divisionToTeach: { 
    type: String, 
    required: true 
  },
  schoolName: { 
    type: String, 
    required: true 
  },
  schoolAddress: { 
    type: String, 
    required: true 
  },
  schoolType: { 
    type: String, 
    required: true 
  },
  boardOfEducation: { 
    type: String, 
    required: true 
  },
  mediumOfInstruction: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

const teacherRegistration = mongoose.model('teacherRegistration', teacherSchema);

module.exports = teacherRegistration;
