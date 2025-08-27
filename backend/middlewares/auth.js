import jwt from 'jsonwebtoken'
import User from '../models/User';

export const protect = async(req, res, next) => {
    let token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE)
        const userId = decoded.id;

        const user =  await User.findById(userId)

        if(!user){
            return res.json({success:false, message: "Not authorized, user not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        res.satus(401).json({success:false, message: "Not authorized, token failed"})
    }
}