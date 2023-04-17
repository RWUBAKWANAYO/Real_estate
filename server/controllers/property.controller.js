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

const getAllProperties = async (req, res) => {
	const { _end, _start, _order, _sort, title_like = '', propertyType = '' } = req.query;

	const query = {};
	if (propertyType !== '') query.propertyType = propertyType;
	if (title_like !== '') query.title = { $regex: title_like, $options: 'i' };

	try {
		const count = await Property.countDocuments({ query });

		const properties = await Property.find(query)
			.limit(_end)
			.skip(_start)
			.sort({ [_sort]: _order });

		res.header('x-total-count', count);
		res.header('Access-Control-Expose-Headers', 'x-total-count');
		res.status(200).json(properties);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPropertyDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const propertyExists = await Property.findOne({ _id: id }).populate('creator');
		if (propertyExists) res.status(200).json(propertyExists);
		else res.status(404).json({ message: 'Property not found' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

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

const updateProperty = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, propertyType, location, price, photo } = req.body;

		let photoUrl;

		if (photo) photoUrl = await cloudinary.uploader.upload(photo, { folder: 'real_estate' });

		const updates = { title, description, propertyType, location, price };

		if (photoUrl) updates.photo = photoUrl.url;

		await Property.findByIdAndUpdate({ _id: id }, updates);
		res.status(200).json({ message: 'Property updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteProperty = async (req, res) => {
	try {
		const { id } = req.params;
		const propertyToDelete = await Property.findById({ _id: id }).populate('creator');

		if (!propertyToDelete) throw new Error('Property not found');

		const session = await mongoose.startSession();
		session.startTransaction();
		propertyToDelete.deleteOne({ session });
		propertyToDelete.creator.allproperties.pull(propertyToDelete);

		await propertyToDelete.creator.save({ session });
		await session.commitTransaction();

		res.status(200).json({ message: 'Property Deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { getAllProperties, getPropertyDetails, createProperty, updateProperty, deleteProperty };
