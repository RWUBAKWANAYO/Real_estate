import { useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { Form } from 'components';
import { useNavigate } from 'react-router-dom';

export const PropertyCreate = () => {
	const navigate = useNavigate();
	const { data: user } = useGetIdentity();
	const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });
	const {
		refineCore: { onFinish, formLoading },
		register,
		handleSubmit,
	} = useForm();

	const handleImageChange = () => {};
	const onFinishHandler = () => {};
	return (
		<Form
			type='Create'
			register={register}
			onFinish={onFinish}
			formLoading={formLoading}
			handleSubmit={handleSubmit}
			propertyImage={propertyImage}
			handleImageChange={handleImageChange}
			onFinishHandler={onFinishHandler}
		/>
	);
};

