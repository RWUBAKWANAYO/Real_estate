import React, { useContext } from 'react';
import { useList } from '@refinedev/core';
import { ColorModeContext } from 'contexts/color-mode';
import { Box, Typography } from '@mui/material';
import { AgentCard } from 'components';
export const AgentList = () => {
	const { mode } = useContext(ColorModeContext);
	const { data, isLoading, isError } = useList({ resource: 'users' });
	const allAgents = data?.data ?? [];

	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>Error</div>;

	return (
		<Box>
			<Typography fontSize={25} fontWeight={700} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
				Agents List
			</Typography>
			<Box
				mt='20px'
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '20px',
					backgroundColor: mode === 'dark' ? '#ffffff14' : '#fff',
				}}
			>
				{allAgents.map((agent) => (
					<AgentCard
						key={agent._id}
						id={agent._id}
						name={agent.name}
						email={agent.email}
						avatar={agent.avatar}
						noOfProperties={agent.allproperties.length}
						mode={mode}
					/>
				))}
			</Box>
		</Box>
	);
};

