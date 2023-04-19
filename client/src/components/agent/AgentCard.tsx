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
	const generateLink = () => (currentUser.email === email ? '/my-profile' : `/agents/show/${id}`);
	const checkImage = (url: string) => {
		const img = new Image();
		img.src = url;
		return img.width !== 0 && img.height !== 0;
	};
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
					boxShadow: '0 22px 45px 2px rgba(0,0,0,0.1)',
				},
			}}
		>
			<img
				src={
					checkImage(avatar)
						? avatar
						: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
				}
				alt='user'
				width={90}
				height={90}
				style={{
					borderRadius: 8,
					objectFit: 'cover',
				}}
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
