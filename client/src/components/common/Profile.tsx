import React from 'react';
import { ProfileProps, PropertyProps } from 'interfaces/common';
import { Box, Stack, Typography } from '@mui/material';
import { Email, Phone, Place } from '@mui/icons-material';
import PropertyCard from './PropertyCard';

interface NewProfileProps extends ProfileProps {
	mode: string;
}
const Profile = ({ type, name, email, avatar, properties, mode }: NewProfileProps) => {
	function checkImage(url: any) {
		const img = new Image();
		img.src = url;
		return img.width !== 0 && img.height !== 0;
	}

	return (
		<Box>
			<Typography fontSize={25} fontWeight={700} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
				{type} Profile
			</Typography>

			<Box
				mt='20px'
				borderRadius='15px'
				padding='20px'
				bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						gap: 2.5,
					}}
				>
					<img
						src='https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
						width={340}
						height={320}
						alt='abstract'
						className='my_profile-bg'
					/>
					<Box
						flex={1}
						sx={{
							marginTop: { md: '58px' },
							marginLeft: { xs: '20px', md: '0px' },
						}}
					>
						<Box flex={1} display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap='20px'>
							<img
								src={
									checkImage(avatar)
										? avatar
										: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
								}
								width={78}
								height={78}
								alt='user_profile'
								className='my_profile_user-img'
							/>

							<Box
								flex={1}
								display='flex'
								flexDirection='column'
								justifyContent='space-between'
								gap='30px'
							>
								<Stack direction='column'>
									<Typography
										fontSize={20}
										fontWeight={600}
										color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
									>
										{name}
									</Typography>
									<Typography fontSize={16} color={mode === 'dark' ? '#6F767E' : '#808191'}>
										Realestate Agent
									</Typography>
								</Stack>

								<Stack direction='column' gap='30px'>
									<Stack gap='15px'>
										<Typography
											fontSize={14}
											fontWeight={500}
											color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
										>
											Address
										</Typography>
										<Box display='flex' flexDirection='row' alignItems='center' gap='5px'>
											<Place sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />
											<Typography fontSize={14} color={mode === 'dark' ? '#6F767E' : '#808191'}>
												4517 Washington Ave. Manchaster, Kentucky 39495
											</Typography>
										</Box>
									</Stack>

									<Stack direction='row' flexWrap='wrap' gap='20px' pb={4}>
										<Stack flex={1} gap='15px'>
											<Typography
												fontSize={14}
												fontWeight={500}
												color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
											>
												Phone Number
											</Typography>
											<Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
												<Phone sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />
												<Typography
													fontSize={14}
													color={mode === 'dark' ? '#6F767E' : '#808191'}
													noWrap
												>
													+0123 456 7890
												</Typography>
											</Box>
										</Stack>

										<Stack flex={1} gap='15px'>
											<Typography
												fontSize={14}
												fontWeight={500}
												color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
											>
												Email
											</Typography>
											<Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
												<Email sx={{ color: mode === 'dark' ? '#6F767E' : '#808191' }} />
												<Typography fontSize={14} color={mode === 'dark' ? '#6F767E' : '#808191'}>
													{email}
												</Typography>
											</Box>
										</Stack>
									</Stack>
								</Stack>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>

			{properties.length > 0 && (
				<Box
					mt={2.5}
					borderRadius='15px'
					padding='20px'
					bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
				>
					<Typography
						fontSize={18}
						fontWeight={600}
						color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
					>
						{type} Properties
					</Typography>

					<Box
						mt={2.5}
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 2.5,
						}}
					>
						{properties?.map((property: PropertyProps) => (
							<PropertyCard
								key={property._id}
								id={property._id}
								title={property.title}
								location={property.location}
								price={property.price}
								photo={property.photo}
								mode={mode}
								colorCard='none'
							/>
						))}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Profile;
