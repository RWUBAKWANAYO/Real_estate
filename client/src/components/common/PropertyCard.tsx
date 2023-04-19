import React from 'react';
import { Place } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { PropertyCardProps } from 'interfaces/property';
import { Link } from 'react-router-dom';

interface NewPropertyCardProps extends PropertyCardProps {
	mode: string;
}
const PropertyCard = ({ id, title, location, price, photo, mode }: NewPropertyCardProps) => {
	return (
		<Card
			component={Link}
			to={`/properties/show/${id}`}
			sx={{
				maxWidth: { md: '327px', lg: '31.6%', xl: '327px' },
				padding: '10px',
				'&:hover': {
					boxShadow:
						'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
				},
				cursor: 'pointer',
			}}
			elevation={0}
		>
			<CardMedia
				component='img'
				height={210}
				width='100%'
				image={photo}
				alt='card image'
				sx={{ borderRadius: '10px' }}
			/>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: '10px',
					paddingX: '5px',
				}}
			>
				<Stack direction='column' gap={1}>
					<Typography
						fontSize='14px'
						fontWeight={500}
						color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
					>
						{title}
					</Typography>
					<Stack direction='row' gap={0.5} alignItems='flex-start'>
						<Place
							sx={{ fontSize: 18, color: mode === 'dark' ? '#EFEFEF' : '#11142D', margin: 0.5 }}
						/>
						<Typography
							color={mode === 'dark' ? '#6F767E' : '#808191'}
							fontSize={13}
							fontWeight={300}
						>
							{location}
						</Typography>
					</Stack>
				</Stack>
				<Box
					px={1.5}
					py={0.5}
					borderRadius={1}
					bgcolor={mode === 'dark' ? '#212121' : '#dadefa'}
					height='fit-content'
				>
					<Typography color='#475BE8' fontSize={12} fontWeight={600}>
						${price}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default PropertyCard;
