import { EmailOutlined, LocationCity, Phone, Place } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useGetIdentity } from '@refinedev/core';
import { AgentCardProp, InfoBarProps } from 'interfaces/agent';
import React from 'react';
import { Link } from 'react-router-dom';

interface NewAgentCardProps extends AgentCardProp {
	mode: string;
}
const AgentCard = ({ id, name, email, avatar, noOfProperties, mode }: NewAgentCardProps) => {
	const { data: currentUser } = useGetIdentity();

	//@ts-ignore
	const generateLink = () => (currentUser.email === email ? '/my-profile' : `agent/show/${id}`);
	const InfoBar = ({ icon, name }: InfoBarProps) => (
		<Stack
			flex={1}
			minWidth={{ xs: '100%', sm: 300, gap: 1.5, direction: 'row' }}
			direction='row'
			gap={1}
		>
			{icon}
			<Typography fontSize={14}>{name}</Typography>
		</Stack>
	);
	return (
		<Box
			component={Link}
			to={generateLink()}
			width='100%'
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				gap: '20px',
				padding: '20px',
				'&:hover': {
					boxShadow:
						'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
				},
			}}
		>
			<img
				src={avatar}
				alt='user'
				width={90}
				height={90}
				style={{ borderRadius: 8, objectFit: 'cover' }}
			/>
			<Stack direction='column' justifyContent='space-between' flex={1} gap={{ xs: 4, sm: 2 }}>
				<Stack gap={2} direction='row' flexWrap='wrap' alignItems='center'>
					<Typography
						fontSize={20}
						fontWeight={600}
						color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
					>
						{name}
					</Typography>
					<Typography fontSize={14} color={mode === 'dark' ? '#6F767E' : '#808191'}>
						Real-Estate Agent
					</Typography>
				</Stack>
				<Stack
					direction='row'
					flexWrap='wrap'
					justifyContent='space-between'
					alignItems='center'
					gap={1.5}
					sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }}
				>
					<InfoBar
						icon={<EmailOutlined sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />}
						name={email}
					/>

					<InfoBar
						icon={<Place sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />}
						name='London'
					/>
					<InfoBar
						icon={<Phone sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />}
						name='+502-4078-4412'
					/>
					<InfoBar
						icon={<LocationCity sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />}
						name={`${noOfProperties} Properties`}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default AgentCard;
