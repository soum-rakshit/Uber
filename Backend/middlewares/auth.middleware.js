import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklistToken.model.js';
// import bcrypt from 'bcryptjs';

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    // console.log("token found");
    
    const isBlacklisted = await blacklistTokenModel.findOne({token: token});
    
    if (!token || isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        // console.log("token found 2");

        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized token' });
    }
}