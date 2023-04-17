import React, { useContext } from 'react';
import { ChatBubble, Delete, Phone, Place, Star, Edit } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useDelete, useGetIdentity, useShow } from '@refinedev/core';
import { CustomButton } from 'components';
import { ColorModeContext } from 'contexts/color-mode';
import { useNavigate, useParams } from 'react-router-dom';

export const PropertyShow = () => {
	const { mode } = useContext(ColorModeContext);
	const navigate = useNavigate();
	const { data: user } = useGetIdentity();
	const { id } = useParams();
	const { mutate } = useDelete();
	const { queryResult } = useShow();

	const { data, isLoading, isError } = queryResult;

	const propertyDetails = data?.data ?? {};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	function checkImage(url: any) {
		const img = new Image();
		img.src = url;
		return img.width !== 0 && img.height !== 0;
	}
	//@ts-ignore
	const isCurrentUser = user.email === propertyDetails.creator.email;

	const handleDeleteProperty = () => {
		const response = window.confirm('Are you sure you want to delete this property?');
		if (response) {
			mutate(
				{
					resource: 'properties',
					id: id as string,
				},
				{
					onSuccess: () => {
						navigate('/properties');
					},
				}
			);
		}
	};

	return (
		<Box
			borderRadius='15px'
			padding='20px'
			bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
			width='fit-content'
		>
			<Typography fontSize={25} fontWeight={700} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
				Property Details
			</Typography>

			<Box mt='20px' display='flex' flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
				<Box flex={1} maxWidth={764}>
					<img
						src={propertyDetails.photo}
						alt='property_details-img'
						height={546}
						style={{ objectFit: 'cover', borderRadius: '10px' }}
						className='property_details-img'
					/>

					<Box mt='15px'>
						<Stack
							direction='row'
							justifyContent='space-between'
							flexWrap='wrap'
							alignItems='center'
						>
							<Typography
								fontSize={14}
								fontWeight={500}
								color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
								textTransform='capitalize'
							>
								{propertyDetails.propertyType}
							</Typography>
							<Box>
								{[1, 2, 3, 4, 5].map((item) => (
									<Star key={`star-${item}`} sx={{ color: '#F2C94C' }} />
								))}
							</Box>
						</Stack>

						<Stack
							direction='row'
							flexWrap='wrap'
							justifyContent='space-between'
							alignItems='center'
							gap={2}
						>
							<Box>
								<Typography
									fontSize={18}
									fontWeight={600}
									mt='10px'
									color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
								>
									{propertyDetails.title}
								</Typography>
								<Stack mt={0.5} direction='row' alignItems='center' gap={0.5}>
									<Place sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />
									<Typography fontSize={14} color={mode === 'dark' ? '#6F767E' : '#808191'}>
										{propertyDetails.location}
									</Typography>
								</Stack>
							</Box>

							<Box>
								<Typography
									fontSize={16}
									fontWeight={600}
									mt='10px'
									color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
								>
									Price
								</Typography>
								<Stack direction='row' alignItems='flex-end' gap={1}>
									<Typography fontSize={25} fontWeight={700} color='#475BE8'>
										${propertyDetails.price}
									</Typography>
									<Typography
										fontSize={14}
										color={mode === 'dark' ? '#6F767E' : '#808191'}
										mb={0.5}
									>
										for one day
									</Typography>
								</Stack>
							</Box>
						</Stack>

						<Stack mt='25px' direction='column' gap='10px'>
							<Typography fontSize={18} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
								Description
							</Typography>
							<Typography fontSize={14} color={mode === 'dark' ? '#6F767E' : '#808191'}>
								{propertyDetails.description}
							</Typography>
						</Stack>
					</Box>
				</Box>

				<Box width='100%' flex={1} maxWidth={326} display='flex' flexDirection='column' gap='20px'>
					<Stack
						width='100%'
						p={2}
						direction='column'
						justifyContent='center'
						alignItems='center'
						border={mode === 'dark' ? '1px solid #6f767e80' : ' 1px solid #80819180'}
						borderRadius={2}
					>
						<Stack mt={2} justifyContent='center' alignItems='center' textAlign='center'>
							<img
								src={
									checkImage(propertyDetails.creator.avatar)
										? propertyDetails.creator.avatar
										: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
								}
								alt='avatar'
								width={90}
								height={90}
								style={{
									borderRadius: '100%',
									objectFit: 'cover',
								}}
							/>

							<Box mt='15px'>
								<Typography
									fontSize={18}
									fontWeight={600}
									color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
								>
									{propertyDetails.creator.name}
								</Typography>
								<Typography
									mt='5px'
									fontSize={14}
									fontWeight={400}
									color={mode === 'dark' ? '#6F767E' : '#808191'}
								>
									Agent
								</Typography>
							</Box>

							<Stack mt='15px' direction='row' alignItems='center' gap={1}>
								<Place sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />
								<Typography
									fontSize={14}
									fontWeight={400}
									color={mode === 'dark' ? '#6F767E' : '#808191'}
								>
									North Carolina, USA
								</Typography>
							</Stack>

							<Typography
								mt={1}
								fontSize={16}
								fontWeight={600}
								color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
							>
								{console.log(propertyDetails.creator)}
								{propertyDetails.creator.allproperties.length} Properties
							</Typography>
						</Stack>

						<Stack width='100%' mt='25px' direction='row' flexWrap='wrap' gap={2}>
							<CustomButton
								title={!isCurrentUser ? 'Message' : 'Edit'}
								backgroundColor='#475BE8'
								color='#FCFCFC'
								fullWidth
								icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
								handleClick={() => {
									if (isCurrentUser) {
										navigate(`/properties/edit/${propertyDetails._id}`);
									}
								}}
							/>
							<CustomButton
								title={!isCurrentUser ? 'Call' : 'Delete'}
								backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
								color='#FCFCFC'
								fullWidth
								icon={!isCurrentUser ? <Phone /> : <Delete />}
								handleClick={() => {
									if (isCurrentUser) handleDeleteProperty();
								}}
							/>
						</Stack>
					</Stack>

					<Stack>
						<img
							src='https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525'
							alt='location map'
							width='100%'
							height={306}
							style={{ borderRadius: 10, objectFit: 'cover' }}
						/>
					</Stack>

					<Box>
						<CustomButton title='Book Now' backgroundColor='#475BE8' color='#FCFCFC' fullWidth />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

