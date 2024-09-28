const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const TeacherModel = require("../models/teacherRegistration");
const SchoolModel = require("../models/schoolRegistration");
const StudentModel = require("../models/studentRegistration");

//Get reuqest for the home page
exports.getHomePage = (req, res) => {
  res.render("index", {
    title: "LearnSetu",
  });
};

//Get reuqest for the login
exports.getLogin = (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
};

/*-------------------Student Get Request--------------- */

//Get request for Student dashbaord
exports.getStudentDashboard = (req, res) => {
  res.render("pages/student/maindashboard", {
    title: "Student Dashboard",
  });
};

//Get request for Resource dashbaord
exports.getResourceDashboard = (req, res) => {
  res.render("pages/student/dashboard", {
    title: "Resource Dashboard",
  });
};

//Get request for Text Resource
exports.getTextResource = (req, res) => {
  res.render("pages/student/text", {
    title: "Text Resource",
  });
};

//Get request for Video Resource
exports.getVideoResource = (req, res) => {
  res.render("pages/student/video", {
    title: "Video Resource",
  });
};

//Get request for Audio Resource
exports.getAudioResource = (req, res) => {
  res.render("pages/student/audio", {
    title: "Audio Resource",
  });
};

//Get request for Interactive Resource
exports.getInteractionResource = (req, res) => {
  res.render("pages/student/interactionRes", {
    title: "Interaction Resource",
  });
};

//Get request for Quiz
exports.getQuiz = (req, res) => {
  res.render("pages/student/quiz", {
    title: "Quiz",
  });
};

//Get request for Simulation
exports.getSimulation = (req, res) => {
  res.render("pages/student/simulation", {
    title: "3D Visualization",
  });
};

//Get request for Chat
exports.getChat = (req, res) => {
  res.render("pages/student/chat", {
    title: "Chat",
  });
};

//Get request for Chatbot
exports.getChatbot = (req, res) => {
  res.render("pages/student/chatbot", {
    title: "AI Chatbot",
  });
};

//Get request for Text Tutorials
exports.getTextTutorials = (req, res) => {
  res.render("pages/student/textTutorials", {
    title: "Text Tutorials",
  });
};

//Get request for Audio Tutorials
exports.getAudioTutorials = (req, res) => {
  res.render("pages/student/audioTutorials", {
    title: "Audio Tutorials",
  });
};

//Get request for Video Tutorials
exports.getVideoTutorials = (req, res) => {
  res.render("pages/student/videoTutorials", {
    title: "Video Tutorials",
  });
};

//Get request for Ranking
exports.getRanking = (req, res) => {
  res.render("pages/student/ranking", {
    title: "Ranking",
  });
};

//Get request for Notification
exports.getNotification = (req, res) => {
  res.render("pages/student/notification", {
    title: "Notification",
  });
};

//Get request for Profile
exports.getProfile = (req, res) => {
  res.render("pages/student/profile", {
    title: "Profile Page",
  });
};

/*-------------------Teacher Get Request--------------- */

//Get request for Teacher dashbaord
exports.getTeacherDashboard = (req, res) => {
  res.render("pages/teacher/dashboard", {
    title: "Teacher Dashboard",
  });
};

//Get request for Doubt Session
exports.getDoubtSession = (req, res) => {
  res.render("pages/teacher/doubtsession", {
    title: "Doubt Session",
  });
};

//Get request for Reward and Ranking
exports.getRewardAndRanking = (req, res) => {
  res.render("pages/teacher/ranking", {
    title: "Reward and Ranking",
  });
};

//Get request for Add Assignments
exports.getAssignments = (req, res) => {
  res.render("pages/teacher/assignments", {
    title: "Add Assignments",
  });
};

//Get request for Notifications
exports.getteacherNotification = (req, res) => {
  res.render("pages/teacher/notifications", {
    title: "Notifications",
  });
};

//Get request for Resource Addition
exports.getResource = (req, res) => {
  res.render("pages/teacher/resource", {
    title: "Resource Addition",
  });
};

//Get request for Teacher Profile
exports.getPro = (req, res) => {
  res.render("pages/teacher/profile", {
    title: "Teacher Profile",
  });
};

//Get request for Admin Dashboard
exports.getadmin = (req, res) => {
  res.render("pages/admin/admindashboard", {
    title: "Admin Dashboard",
  });
};

//Get request for Main Admin Dashboard
exports.getmainadmin = (req, res) => {
  res.render("pages/admin/educationalHead", {
    title: "Main Admin Dashboard",
  });
};


//Get request for Profile
exports.getAdminProfile = (req, res) => {
  res.render("pages/admin/profile", {
    title: "Profile Page",
  });
};

//Get request for College Registration
exports.getschool = (req, res) => {
  res.render("pages/admin/school", {
    title: "School Registration",
  });
};

//Get request for Teacher Registration
exports.getteacher = (req, res) => {
  res.render("pages/admin/teacher", {
    title: "Teacher Registration",
  });
};

//Get request for Student Registration
exports.getstudent = (req, res) => {
  res.render("pages/admin/student", {
    title: "Student Registration",
  });
};

//--------------------------POST Methods---------------------
exports.postLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log(email, password);

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        generated: false,
      });
    }

    const firstTwoChars = password.substring(0, 2);
    console.log(firstTwoChars);

    if (firstTwoChars === "11") {
      // Check if the user exists
      const user = await TeacherModel.findOne({ email: email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid Username or Password",
          generated: false,
        });
      }

      // Using == for comparison
      if (password == user.password) {
        res.status(200).json({ generated: true ,flag:1});
      } else {
        return res.status(401).json({
          message: "Invalid Username or Password",
          generated: false,
        });
      }
    }else if (firstTwoChars === "8d") {
      // Check if the user exists
      const user = await SchoolModel.findOne({ email: email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid Username or Password",
          generated: false,
        });
      }

      // Using == for comparison
      if (password == user.password) {
        res.status(200).json({ generated: true ,flag:2});
      } else {
        return res.status(401).json({
          message: "Invalid Username or Password",
          generated: false,
        });
      }
    } else    if (firstTwoChars === "10") {
      // Check if the user exists
      const user = await StudentModel.findOne({ email: email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid Username or Password",
          generated: false,
        });
      }

      // Using == for comparison
      if (password == user.password) {
        res.status(200).json({ generated: true ,flag:3});
      } else {
        return res.status(401).json({
          message: "Invalid Username or Password",
          generated: false,
        });
      }
    }
    else {
      return res.status(401).json({
        message: "Invalid Username or Password",
        generated: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      generated: false,
    });
  }
};

exports.postTeacher = async (req, res) => {
  console.log(req.body);

  try {
    let {
      fullName,
      email,
      phoneNumber,
      address,
      gender,
      birthday,
      age,
      state,
      district,
      city,
      taluka,
      yearsOfExperience,
      educationalQualification,
      divisionToTeach,
      schoolName,
      schoolAddress,
      schoolType,
      boardOfEducation,
      mediumOfInstruction,
    } = req.body;

    // Generate a password that starts with "11" and has a total length of 8
    const generatePassword = () => {
      const randomPart = crypto.randomBytes(3).toString("hex").slice(0, 6); // Generate 6 random characters
      return `11${randomPart}`; // Prefix the password with "11"
    };
    const rawPassword = generatePassword();
    console.log(rawPassword);

    // Hash the password
    // const hashedPassword = await bcrypt.hash(rawPassword, 10); // 10 rounds of salting

    // console.log(hashedPassword);
    // Create a new Teacher object
    const teacher = new TeacherModel({
      fullName,
      email,
      phoneNumber,
      address,
      gender,
      birthday,
      age,
      state,
      district,
      city,
      taluka,
      yearsOfExperience,
      educationalQualification,
      divisionToTeach,
      schoolName,
      schoolAddress,
      schoolType,
      boardOfEducation,
      mediumOfInstruction,
      password: rawPassword, // Store hashed password in the database
    });

    // Save the teacher to the database
    await teacher.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Neha Kanaki" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "📧 Teacher Registration Confirmation",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">Hi ${req.body.fullName} 👩‍🏫,</h2>
            <p>Thank you for registering with us! <span style="color: #FFD700;">🌟</span></p>
            <p>Your registration is successful, and here are your login details:</p>
            <p><strong>Username:</strong> ${req.body.email}</p>
            <p><strong>Password:</strong> ${rawPassword}</p>
            <p>Please keep this information secure and do not share it with anyone. <span style="color: #FF4500;">🔒</span></p>
            <p>If you have any questions or need assistance, feel free to reach out to us. We’re here to help! <span style="color: #1E90FF;">⏳</span></p>
            <br>
            <p>Best regards,</p>
            <p style="color: #FF4500;">The Support Team 🚀</p>
            <br>
            <p><em>P.S. We’re excited to have you on board! <span style="color: #8A2BE2;">✨</span></em></p>
          </div>
        `,
    };

    // Send a response with the raw password (to be given to the user)
    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        return res.json({
          inserted: true,
          message: "Teacher registered successfully",
          password: rawPassword, // You can send this to the frontend or use another mechanism to deliver it to the user
        });
      } else {
        console.error("Error registering teacher:", error);
        res.json({
          inserted: false,
          message: "An error occurred during registration",
        });
      }
    });
  } catch (error) {
    res.json({ inserted: false });
  }
};

exports.postSchool = async (req, res) => {
    console.log(req.body);
  
    try {
      let {
        schoolName,
        schoolType,
        boardOfEducation,
        schoolAddress,
        mediumOfInstruction,
        contactNumber,
        schoolEmail,
        studentCount,
        schoolId,
        gradeStart,
        gradeEnd,
        principalName,
        principalEmail,
        principalContactNumber,
        principalQualification,
        principalExperience,
        // principalPhoto,
      } = req.body;
  
      const generatePassword = () => {
        const randomPart = crypto.randomBytes(3).toString("hex").slice(0, 6); // Generate 6 random characters
        return `8d3${randomPart}`; 
      };
      const rawPassword = generatePassword();
      console.log(rawPassword);
  
      const school = new SchoolModel({
        schoolName,
        schoolType,
        boardOfEducation,
        schoolAddress,
        mediumOfInstruction,
        contactNumber,
        schoolEmail,
        studentCount,
        schoolId,
        gradeStart,
        gradeEnd,
        principalName,
        principalEmail,
        principalContactNumber,
        principalQualification,
        principalExperience,
        // principalPhoto,
        password: rawPassword, 
      });
  
      await school.save();
  
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: `"Neha Kanaki" <${process.env.EMAIL_USER}>`,
        to: req.body.schoolEmail,
        subject: "📧 School Registration Confirmation",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #4CAF50;">Hi ${req.body.schoolName} 👩‍🏫,</h2>
              <p>Thank you for registering with us! <span style="color: #FFD700;">🌟</span></p>
              <p>Your registration is successful, and here are your login details:</p>
              <p><strong>Username:</strong> ${req.body.schoolEmail}</p>
              <p><strong>Password:</strong> ${rawPassword}</p>
              <p>Please keep this information secure and do not share it with anyone. <span style="color: #FF4500;">🔒</span></p>
              <p>If you have any questions or need assistance, feel free to reach out to us. We’re here to help! <span style="color: #1E90FF;">⏳</span></p>
              <br>
              <p>Best regards,</p>
              <p style="color: #FF4500;">The Support Team 🚀</p>
              <br>
              <p><em>P.S. We’re excited to have you on board! <span style="color: #8A2BE2;">✨</span></em></p>
            </div>
          `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
          return res.json({
            inserted: true,
            message: "School registered successfully",
            password: rawPassword, 
          });
        } else {
          console.error("Error registering teacher:", error);
          res.json({
            inserted: false,
            message: "An error occurred during registration",
          });
        }
      });
    } catch (error) {
      res.json({ inserted: false });
    }
  };
  
  exports.postStudent = async (req, res) => {
    console.log(req.body);
  
    try {
      let {
        fullName,
        gender,
        dob,
        age,
        email,
        parentsContact,
        address,
        // studentPhoto,
        grade,
        division,
        schoolName,
        schoolType,
        schoolAddress,
        boardOfEducation,
        schoolId,
        mediumOfInstruction,
      } = req.body;
  
      const generatePassword = () => {
        const randomPart = crypto.randomBytes(3).toString("hex").slice(0, 6); // Generate 6 random characters
        return `101${randomPart}`; 
      };
      const rawPassword = generatePassword();
      console.log(rawPassword);
  
      const student = new StudentModel({
        fullName,
        gender,
        dob,
        age,
        email,
        parentsContact,
        address,
        // studentPhoto,
        grade,
        division,
        schoolName,
        schoolType,
        schoolAddress,
        boardOfEducation,
        schoolId,
        mediumOfInstruction,
        password: rawPassword, 
      });
  
      await student.save();
  
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: `"Neha Kanaki" <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: "📧 Student Registration Confirmation",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #4CAF50;">Hi ${req.body.fullName} 👩‍🏫,</h2>
              <p>Thank you for registering with us! <span style="color: #FFD700;">🌟</span></p>
              <p>Your registration is successful, and here are your login details:</p>
              <p><strong>Username:</strong> ${req.body.email}</p>
              <p><strong>Password:</strong> ${rawPassword}</p>
              <p>Please keep this information secure and do not share it with anyone. <span style="color: #FF4500;">🔒</span></p>
              <p>If you have any questions or need assistance, feel free to reach out to us. We’re here to help! <span style="color: #1E90FF;">⏳</span></p>
              <br>
              <p>Best regards,</p>
              <p style="color: #FF4500;">The Support Team 🚀</p>
              <br>
              <p><em>P.S. We’re excited to have you on board! <span style="color: #8A2BE2;">✨</span></em></p>
            </div>
          `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
          return res.json({
            inserted: true,
            message: "Student registered successfully",
            password: rawPassword, 
          });
        } else {
          console.error("Error registering teacher:", error);
          res.json({
            inserted: false,
            message: "An error occurred during registration",
          });
        }
      });
    } catch (error) {
      res.json({ inserted: false });
    }
  };
  