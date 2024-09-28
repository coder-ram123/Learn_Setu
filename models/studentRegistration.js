const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { 
    type: String, 
    required: true 
  },
  gender: {
    type: String, 
    required: true 
  },
  dob: { 
    type: Date, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  email: { 
    type: String, 
    required: true
   },
   parentsContact: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  // studentPhoto: { 
    // type: String, 
    // default : "userIcon.png",
    // required: true
  //  },
   grade: {
     type: Number, 
     required: true 
  },
  division: { 
    type: String,
    required: true 
  },
  schoolName: { 
    type: String, 
    required: true 
  },
  schoolType: { 
    type: String, 
    required: true 
  },
  schoolAddress: { 
    type: String, 
    required: true 
  },
  boardOfEducation: { 
    type: String, 
    required: true 
  },
  schoolId: { 
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

const studentRegistration = mongoose.model('studentRegistration', studentSchema);

module.exports = studentRegistration;
