import User from '../models/user.js';

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).limit(req.query._end);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, avatar } = req.body;
		const userExists = await User.findOne({ email });

		if (userExists) return res.status(200).json(userExists);

		const newUser = await User.create({ name, email, avatar });

		return res.status(200).json(newUser);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUserInfoByID = async (req, res) => {
	const { id } = req.params;
	const user = await User.findOne({ _id: id }).populate('allproperties');
	if (!user) return res.status(404).json({ message: 'User not found' });

	res.status(200).json(user);
	try {
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { getAllUsers, createUser, getUserInfoByID };
