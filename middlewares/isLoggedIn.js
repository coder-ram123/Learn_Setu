// const User = require('../models/registrationModel')
// const jwt = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//     if(!req.cookies.token){
//         req.flash('error', 'Please login to access this page')
//         return res.redirect('/login');
//     }
//     try {
//         let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
//         let user = await User
//         .findOne({ email: decoded.email })
//         .select('-password');
//         req.user = user;
//         next();
//     } catch(err) {
//         req.flash('error', 'Something went wrong.')
//         return res.redirect('/login');
//     }
// };