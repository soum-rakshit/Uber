import userModel from '../models/user.model.js';
import captainModel from '../models/captain.model.js';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklistToken.model.js';
// import bcrypt from 'bcryptjs';

export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    // console.log(token);
    
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


export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    // console.log("token found");
    
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    
    const isBlacklisted = await blacklistTokenModel.findOne({token: token});

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized (blacklisted)' });
    }
    
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        console.log("token found 2");

        return next();

    } catch (error) {
        // console.log(error);
        
        return res.status(401).json({ message: 'Unauthorized token' });
    }
}