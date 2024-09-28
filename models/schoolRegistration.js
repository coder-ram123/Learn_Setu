const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: { 
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
  schoolAddress: { 
    type: String, 
    required: true 
  },
  mediumOfInstruction: { 
    type: String, 
    required: true
   },
   contactNumber: { 
    type: String, 
    required: true 
  },
  schoolEmail: { 
    type: String, 
    required: true 
  },
  studentCount: { 
    type: Number, 
    required: true
   },
   schoolId: {
     type: String, 
     required: true 
  },
  gradeStart: { 
    type: String,
    required: true 
  },
  gradeEnd: { 
    type: String, 
    required: true 
  },
  principalName: { 
    type: String, 
    required: true 
  },
  principalEmail: { 
    type: String, 
    required: true 
  },
  principalContactNumber: { 
    type: String, 
    required: true 
  },
  principalQualification: { 
    type: String, 
    required: true 
  },
  principalExperience: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // principalPhoto: { 
    // type: String, 
    // default : "customer02.jpg",
    // required: true 
  // },
 
});

const schoolRegistration = mongoose.model('schoolRegistration', schoolSchema);

module.exports = schoolRegistration;
