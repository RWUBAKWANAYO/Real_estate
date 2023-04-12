import mongoose from 'mongoose';
import Property from '../models/property.js';
import User from '../models/user.js';

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {};
const getPropertyDetails = async (req, res) => {};

const createProperty = async (req, res) => {
	try {
		const { title, description, propertyType, location, price, photo, email } = req.body;

		//start new session...
		const session = await mongoose.startSession();
		session.startTransaction();

		const user = await User.findOne({ email }).session(session);
		if (!user) throw new Error('User not found');

		const photoUrl = await cloudinary.uploader.upload(photo, { folder: 'real_estate' });

		const newProperty = await Property.create({
			title,
			description,
			propertyType,
			location,
			price,
			photo: photoUrl.url,
			creator: user._id,
		});

		user.allproperties.push(newProperty._id);
		await user.save({ session });
		await session.commitTransaction();

		res.status(200).json({ message: 'Property created successfully!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

export { getAllProperties, getPropertyDetails, createProperty, updateProperty, deleteProperty };
