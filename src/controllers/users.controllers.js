import User from '../models/User';
import passport from 'passport';
export const renderSignUpForm=(req,res)=> res.render('users/signup');
export const signup= async(req,res)=>{
    let errors=[];
    const {name,email,password,conffirm_password}=req.body;
    if(password!= conffirm_password){
        errors.push({text: 'Password doesn`t match'});
    };
    if(password.length<4){
        errors.push({text:'Password is too short'})
    };
    if(errors.length>0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            conffirm_password
        })
    }else{
        const emailUser=await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','The Email is already in use.');
            res.redirect('/users/signup')
        }else{
            const newUser=new User({name,email,password});
            newUser.password=await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','You are registered');
            res.redirect('/users/signin');
        }
    }
}
export const renderSigninForm= (req,res)=>res.render('users/signin');
export const signin=passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failuerFlash: true,
});
export const logout= (req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin')
};