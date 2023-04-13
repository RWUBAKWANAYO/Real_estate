import { Add } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useTable } from '@refinedev/core';
import { CustomButton, PropertyCard } from 'components';
import { ColorModeContext } from 'contexts/color-mode';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const PropertyList = () => {
	const { mode } = useContext(ColorModeContext);
	const navigate = useNavigate();

	const {
		tableQueryResult: { data, isLoading, isError },
	} = useTable();

	const allProperties = data?.data ?? [];

	if (isLoading) return <Typography>Loading...</Typography>;
	if (isError) return <Typography>Error...</Typography>;
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
			<Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
				{allProperties.map((property) => (
					<PropertyCard
						key={property._id}
						id={property._id}
						title={property.title}
						price={property.price}
						location={property.location}
						photo={property.photo}
						mode={mode}
					/>
				))}
			</Box>
		</Box>
	);
};

