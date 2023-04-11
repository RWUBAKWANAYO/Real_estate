import mongoose from 'mongoose';

const UserSchema = new mongoose({
	name: { type: String, required: true },
	email: { type: String, required: true },
	avatar: { type: String, required: true },
	allproperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

const userModel = mongoose.model('User', UserSchema);
export default userModel;
