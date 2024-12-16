const express = require('express');
const router = express.Router();
const placeController = require('../controllers/locationsController');

router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlaceById);
router.get('/:id/photos', placeController.getPlacePhotos);

module.exports = router;
