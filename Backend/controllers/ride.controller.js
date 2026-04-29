import * as rideService from '../services/rides.service.js';
import { validationResult } from 'express-validator';
// import * as mapService from '../services/maps.service.js';
// import { sendMessageToSocketId } from '../socket.js';
import { rideModel } from '../models/ride.model.js';

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ 
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType 
        });

        res.status(201).json(ride);

    } catch (err) {
            console.error("Create Ride Error:", err);
        return res.status(500).json({ message: `Create Ride Error ${err.message}` });
    }
};

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
