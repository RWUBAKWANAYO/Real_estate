import React, { useContext } from 'react';
import { Profile } from 'components';
import { ColorModeContext } from 'contexts/color-mode';
import { useOne } from '@refinedev/core';
import { useParams } from 'react-router-dom';

export const AgentShow = () => {
	const { mode } = useContext(ColorModeContext);

	const { id } = useParams();
	const { data, isLoading, isError } = useOne({ resource: 'users', id: id as string });
	const myProfile = data?.data ?? {};

	console.log(myProfile);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;
	return (
		<Profile
			type='Agent'
			name={myProfile.name}
			email={myProfile.email}
			avatar={myProfile.avatar}
			properties={myProfile.allproperties}
			mode={mode}
		/>
	);
};

