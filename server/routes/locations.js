const express = require('express');
const router = express.Router();
const Place = require('../db/models/place');
const PlacePhoto = require('../db/models/place_photos')

router.get('/', async (req, res) => {
    try {
        const locations = await Place.findAll();
        res.json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Place.findByPk(id);
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.json(location);
    } catch (error) {
        console.error('Error fetching location by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id/photos', async (req, res) => {
    const { id } = req.params;
    try {
        const location = await Place.findByPk(id, { include: PlacePhoto });

        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(location.PlacePhotos);
    } catch (error) {
        console.error('Error fetching photos for location:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
