import { Add } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useList } from '@refinedev/core';
import { CustomButton, PropertyCard } from 'components';
import { ColorModeContext } from 'contexts/color-mode';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const PropertyList = () => {
	const { mode } = useContext(ColorModeContext);
	const navigate = useNavigate();

	return (
		<Box>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Typography fontSize={25} fontWeight={700} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
					All Properties
				</Typography>
				<CustomButton
					title='Add Property'
					handleClick={() => navigate('/properties/create')}
					backgroundColor='#475be8'
					color='#fcfcfc'
					icon={<Add />}
				/>
			</Stack>
		</Box>
	);
};

