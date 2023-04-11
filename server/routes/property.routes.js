import express from 'express';
import {
	getAllProperties,
	getPropertyDetails,
	createProperty,
	updateProperty,
	deleteProperty,
} from '../controllers/property.controller.js';

const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/').post(createProperty);
router.route('/:id').get(getPropertyDetails);
router.route('/:id').get(deleteProperty);
router.route('/:id').get(updateProperty);

export default router;
