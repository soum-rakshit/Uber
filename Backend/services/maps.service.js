import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;

    try {
        const response = await axios.get(url, {
            params: {
                address: address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat, 
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Geocoding Service Error:", error.message);
        throw error;
    }
};

export const getDistanceTimeService = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;

    try {


        const response = await axios.get(url, {
            params: {
                origins: origin,
                destinations: destination,
                key: apiKey
            }
        });
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getAutoCompleteSuggestionsService = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

    try {
        const response = await axios.get(url, {
            params: {
                input: input,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}