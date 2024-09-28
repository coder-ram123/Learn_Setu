const express = require('express');
const router = express.Router();
const indexController = require('../controllers');

//Get request for home page
router.get('/',indexController.getHomePage);

//Get request for Login
router.get('/login',indexController.getLogin);

//Post request for Login
// router.post('/postLogin',indexController.postLogin);

/*------------------------------Student---------------------------- */
//Get request for Student dashbaord
router.get('/studentDashboard',indexController.getStudentDashboard);

//Get request for Resource dashbaord
router.get('/resDashboard',indexController.getResourceDashboard);

//Get request for Text Resource
router.get('/textResources',indexController.getTextResource);   

//Get request for Video Resource
router.get('/videoResources',indexController.getVideoResource);

//Get request for Audio Resource
router.get('/audioResources',indexController.getAudioResource);

//Get request for Chat
router.get('/chat',indexController.getChat);

//Get request for Chatbot
router.get('/chatbot',indexController.getChatbot);

//Get request for Text Tutorials
router.get('/textTutorials',indexController.getTextTutorials);

//Get request for Audio Tutorials
router.get('/audioTutorials',indexController.getAudioTutorials);

//Get request for Video Tutorials
router.get('/videoTutorials',indexController.getVideoTutorials);

//Get request for Interaction Tutorials
router.get('/interactionRes',indexController.getInteractionResource);

//Get request for Quiz
router.get('/quiz',indexController.getQuiz);

//Get request for Simulation
router.get('/simulation',indexController.getSimulation);

//Get request for Ranking
router.get('/ranking',indexController.getRanking);

//Get request for Notification
router.get('/notification',indexController.getNotification);

//Get request for Profile
router.get('/profile',indexController.getProfile);


//-------------------------Teacher--------------------------------
//Get request for Teacher dashbaord
router.get('/teacherDashboard',indexController.getTeacherDashboard);

//Get request for Doubt Session
router.get('/doubtSession',indexController.getDoubtSession);

//Get request for Reward And Ranking
router.get('/rewardRanking',indexController.getRewardAndRanking);

//Get request for Assignments
router.get('/assignments',indexController.getAssignments);

//Get request for Notifications
router.get('/teacherNotification',indexController.getteacherNotification);

//Get request for Resources
router.get('/resource',indexController.getResource);

//Get request for Profile
router.get('/pro',indexController.getPro);

//-------------------------Admin--------------------------------

//Get request for Admin Dashboard
router.get('/admin',indexController.getadmin);

//Get request for Main Dashboard
router.get('/mainadmin',indexController.getmainadmin);

//Get request for College Registraion
router.get('/school',indexController.getschool);

//Get request for Teacher Registration
router.get('/teacher',indexController.getteacher);

//Get request for Student Registration
router.get('/student',indexController.getstudent);

//Get request for Profile
router.get('/adminprofile',indexController.getAdminProfile);

//-----------------------------------------------------------------------

// Post request for the teacher register page
router.post('/teacherReg',indexController.postTeacher);

// Post request for the school register page
router.post('/schoolReg',indexController.postSchool);

// Post request for the school register page
router.post('/studentReg',indexController.postStudent);

router.post('/Login',indexController.postLogin);

module.exports = router;