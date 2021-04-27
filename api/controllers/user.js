const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.registerController = async (req,res)=>{

    const {firstName,lastName,email,password,confirmPassword,phone,country} = req.body;
    try {
        //Check if User already Exists
        const user = await User.findOne({email: email});
        if(user) {
            return res.status(400).json({message: 'Email already exist.'});
        }
        //Create a new User instance
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
            //Check if Password is match with confirm password
            if(!(password === confirmPassword))  {
                return res.status(400).json({message: 'Passwords should be Same.'});
            }
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;
        newUser.confirmPassword = hashedPassword;
        newUser.phone = phone;
        newUser.country = country;

        //Save new User into Database
        const savedUser = await newUser.save();
        //Send response after User Registered
        res.json({
            successMessage: "User Registered Successfully, Please LogIn.",
            error: null,
            data: {
                user: {
                    id: savedUser._id,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email,
                    phone: savedUser.phone,
                    country: savedUser.country,
                }
            }
        });
    } catch (err) {
        res.status(500).json({
            message: `Server error: ${err.message}`
        });
    }
}

exports.loginController = async (req,res)=>{
    const {email,password} = req.body;
    try {
        //Check if User already Exists
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({message: 'Invalid Credentials (Email not found!)'});
        }
        //Check if Password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message: 'Invalid Credentials (Wrong Password!)'});
        }else if(user.role === 1){
            //Create and assign a token to LogIn as Admin
            const {role,_id,firstName,lastName,email,phone,country} = user;
            const adminToken = jwt.sign({_id: _id, email: email}, process.env.ADMIN_TOKEN);
            res.header('token', adminToken);
            console.log(`${firstName} (Admin) logged in by using email: ${email}.`);
            res.json({
                successMessage: "Logged In Successfully.",
                error: null,
                data: {
                    user: {
                        role: role,
                        id: _id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        country: country
                    },
                    token: adminToken
                }
            });
        }else{
            //Create and assign a token to LogIn as User
            const {role,_id,firstName,lastName,email,phone,country} = user;
            const userToken = jwt.sign({_id: _id, email: email}, process.env.USER_TOKEN);
            res.header('token', userToken);
            console.log(`${firstName} (user) logged in by using email: ${email}.`);
            res.json({
                successMessage: "Logged In Successfully.",
                error: null,
                data: {
                    user: {
                        role: role,
                        id: _id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        country: country
                    },
                    token: userToken
                }
            });
            //Send Welcome Mail on LogIn 

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "usermail@somethingmail.com", // list of receivers
                subject: "Welcome ✔", // Subject line
                html: "<b>Hello User.<br>Welcome to AVA Store.</b>", // html body
            });

            console.log("Mail sent Succesfully.", info.messageId);

            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    } catch (err) {
        res.status(500).json({
            message: `Server error: ${err.message}`
        });
    }
}

exports.userUpdateController = async (req,res)=>{
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
        res.json({
            message: 'User Updated Successfully',
            error: null,
            data: updatedUser
        });
    }catch(err){
        res.status(400).json({message: `${err.message}`});
    }
}
