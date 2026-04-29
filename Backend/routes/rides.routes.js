import express from 'express';
import { body, query } from 'express-validator';
import * as rideController from '../controllers/ride.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'car', 'auto', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
);

export default router;