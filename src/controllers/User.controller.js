import User from "../models/User";
// import crypto from "crypto";
import bcrypt from 'bcrypt';
import passport from "passport";

class UserController {

    getUserDetails = async (req, res) => {
        try{
            let user = await User.findOne({_id: req.user._id});
            return res.status(200).json(user);
        }catch(err){
            console.log("Error in getUserDetails", err);
            return res.status(400).json({message: err && err.message || err});
        }
    }

    login = async (req, res, next) => {
        try{
            passport.authenticate('local', (err, user, info) => {
                if(err){
                    return res.redirect(`/login?error=${err && err.message || err}`)
                }

                if(!user){
                    return res.redirect(`/login?error=${info.message}`)
                }

                req.login(user, async loginErr => {
                    if (loginErr) {
                        return res.redirect("/login")
                        // return next(loginErr);/
                    }
                    await User.findOneAndUpdate({ _id: user.id }, {
                        lastLogin: new Date()
                    }); 
                    return res.redirect("/")
                });  
            })(req, res, next);
        }catch(err){
            console.log("Error in signin", err);
            res.redirect(`/login?error=${err && err.message || err}`)
        }
    }

    signup = async (req, res) => {
        try{

            let email = req.body.email;
            let firstName = req.body.fname;
            let lastName = req.body.lname;
            let password = req.body.password;

            let euc = await User.findOne({email: email});
            if(euc){
                return res.redirect("register?error=User email already in use.")
            }
            let user = new User({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                isActive: true
            });
            await user.save();
            res.redirect("/login?message='User created successfully.'")
        }catch(err){
            console.log("Error in signup", err);
            res.redirect(`/register?error=${err && err.message || err}`);
            // return res.status(400).json({
            //     message: err && err.message || err
            // });
        }
    }

    logout = (req, res) => {
        try{
            delete req.session.returnTo;
            delete req.session.searchResult;
            req.logout();
            res.redirect('/login');            
        }catch(err){
            console.log("Error in logout", err);
            res.redirect("/");
        }
    }
}

export default UserController;