import { validationResult } from "express-validator";
import HttpError from "../middlewares/httpError.js";
import User from "../models/users.js";
import bcrypt from 'bcrypt';

// view profile
export const viewProfile = async (req,res,next)=> {
    try{
        const { user_id } = req.userData;

        const myProfile = await User.findOne({_id: user_id})
        .select("name email role");

        if(!myProfile){
            return next(new HttpError('user not found',404));
        } else {
            res.status(200).json({
                status: true,
                message: "",
                data: myProfile
            })
        }
    } catch (err) {
        return next(new HttpError('oops! error occurred',500));
    }
};


// edit profile
export const editProfile = async (req,res,next) => {
    try{
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return next(new HttpError("Invalid inputs, please check again"));
        } else { 
            
            const imagePath = req.file.path;
            const { user_id } = req.userData;
            const {name, email, password} = req.body

            if(!imagePath){
                return next(new HttpError("Image Please",422));
            } else {
        
                const updateFields = { 
                    name, 
                    email, 
                    image: imagePath 
                };
        
                if (password) {
                    updateFields.password = await bcrypt.hash(password, 12);
                }
        
                const updatedProfile = await User.findOneAndUpdate(
                    {_id: user_id},
                    updateFields,
                    {new: true});
                    
                if(!updatedProfile){
                    return next(new HttpError('user not found',404));
                } else {
        
                    res.status(200).json({
                        status: true,
                        message: "profile updated",
                        data:""
                    })
                }
            }
        }
    } catch (err){
        return next(new HttpError('oops! error occurred',500));
    }
};