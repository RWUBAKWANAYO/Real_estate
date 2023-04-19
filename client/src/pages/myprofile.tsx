import React, { useContext } from 'react';
import { Profile } from 'components';
import { ColorModeContext } from 'contexts/color-mode';
import { useGetIdentity, useOne } from '@refinedev/core';

export const MyProfile = () => {
	const { mode } = useContext(ColorModeContext);

	const { data: user } = useGetIdentity();
	//@ts-ignore
	const { data, isLoading, isError } = useOne({ resource: 'users', id: user?.userid });
	const myProfile = data?.data ?? {};

	console.log(myProfile);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;
	return (
		<Profile
			type='My'
			name={myProfile.name}
			email={myProfile.email}
			avatar={myProfile.avatar}
			properties={myProfile.allproperties}
			mode={mode}
		/>
	);
};
