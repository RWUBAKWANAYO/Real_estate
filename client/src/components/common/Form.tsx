import React, { useContext } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	Stack,
	TextareaAutosize,
	TextField,
	Typography,
} from '@mui/material';
import { ColorModeContext } from 'contexts/color-mode';
import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({
	type,
	register,
	formLoading,
	handleSubmit,
	onFinishHandler,
	handleImageChange,
	propertyImage,
}: FormProps) => {
	const { mode } = useContext(ColorModeContext);
	return (
		<Box>
			<Typography fontSize={25} fontWeight={700} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
				{type} a Property
			</Typography>
			<Box
				mt={2.5}
				borderRadius='15px'
				padding='20px'
				bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
			>
				<form
					style={{
						marginTop: '20px',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
					}}
					onSubmit={handleSubmit(onFinishHandler)}
				>
					<FormControl>
						<FormHelperText
							sx={{
								fontSize: 14,
								margin: '10px 0',
								fontWeight: 500,
								color: mode === 'dark' ? '#EFEFEF' : '#11142D',
							}}
						>
							Enter property name
						</FormHelperText>
						<TextField
							fullWidth
							required
							id='outlined-basic'
							color='info'
							variant='outlined'
							{...register('title', { required: true })}
						/>
					</FormControl>

					<FormControl>
						<FormHelperText
							sx={{
								fontSize: 14,
								margin: '10px 0',
								fontWeight: 500,
								color: mode === 'dark' ? '#EFEFEF' : '#11142D',
							}}
						>
							Enter Description
						</FormHelperText>
						<TextareaAutosize
							minRows={5}
							required
							placeholder='Write Description...'
							style={{
								fontSize: '14px',
								borderRadius: 6,
								padding: 20,
								borderColor: 'rgba(133, 133, 133, 0.5)',
								color: mode === 'dark' ? '#EFEFEF' : '#11142D',
								background: 'transparent',
							}}
							variant='outlined'
							{...register('description', { required: true })}
						/>
					</FormControl>
					<Stack direction='row' gap={4}>
						<FormControl sx={{ flex: 1 }}>
							<FormHelperText
								sx={{
									fontWeight: 500,
									margin: '10px 0',
									fontSize: 14,
									color: mode === 'dark' ? '#EFEFEF' : '#11142D',
								}}
							>
								Select Property Type
							</FormHelperText>
							<Select
								variant='outlined'
								color='info'
								displayEmpty
								required
								inputProps={{ 'aria-label': 'without label' }}
								defaultValue='apartment'
							>
								<MenuItem value='apartment'>Apartment</MenuItem>
								<MenuItem value='villa'>Villa</MenuItem>
								<MenuItem value='farmhouse'>Farmhouse</MenuItem>
								<MenuItem value='condos'>Condos</MenuItem>
								<MenuItem value='townhouse'>Townhouse</MenuItem>
								<MenuItem value='duplex'>Duplex</MenuItem>
								<MenuItem value='studio'>Studio</MenuItem>
								<MenuItem value='chalet'>Chalet</MenuItem>
							</Select>
						</FormControl>

						<FormControl>
							<FormHelperText
								sx={{
									fontSize: 14,
									margin: '10px 0',
									fontWeight: 500,
									color: mode === 'dark' ? '#EFEFEF' : '#11142D',
								}}
							>
								Enter property price
							</FormHelperText>
							<TextField
								fullWidth
								required
								id='outlined-basic'
								color='info'
								type='number'
								variant='outlined'
								{...register('price', { required: true })}
							/>
						</FormControl>
					</Stack>

					<FormControl>
						<FormHelperText
							sx={{
								fontSize: 14,
								margin: '10px 0',
								fontWeight: 500,
								color: mode === 'dark' ? '#EFEFEF' : '#11142D',
							}}
						>
							Enter Location
						</FormHelperText>
						<TextField
							fullWidth
							required
							id='outlined-basic'
							color='info'
							variant='outlined'
							{...register('location', { required: true })}
						/>
					</FormControl>
					<Stack direction='column' gap={1} justifyContent='center' mb={2}>
						<Stack direction='row' gap={2}>
							<Typography
								fontSize={14}
								fontWeight={500}
								my='10px'
								color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
							>
								Property Photo
							</Typography>
							<Button
								component='label'
								sx={{
									widht: 'fit-content',
									color: '#2ed480',
									textTransform: 'capitalize',
									fontSize: 14,
								}}
							>
								Upload *
								<input
									hidden
									accept='image/*'
									type='file'
									//@ts-ignore
									onChange={(e) => handleImageChange(e.target.files[0])}
								/>
							</Button>
						</Stack>
						<Typography fontSize={14} color='#808191' sx={{ wordBreak: 'break-all' }}>
							{propertyImage?.name}
						</Typography>
					</Stack>
					<CustomButton
						type='submit'
						title={formLoading ? 'Submitting...' : 'Submit'}
						backgroundColor='#475be8'
						color='#fcfcfc'
					/>
				</form>
			</Box>
		</Box>
	);
};

export default Form;
