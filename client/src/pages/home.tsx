import React, { useContext } from 'react';
import { useList } from '@refinedev/core';
import { ColorModeContext } from '../contexts/color-mode';
import { PieChart, PropertyCard, PropertyReferrals, TopAgent, TotalRevenue } from 'components';
import { Box, Stack, Typography } from '@mui/material';

export const Home = () => {
	const { mode } = useContext(ColorModeContext);
	const { data, isLoading, isError } = useList({
		resource: 'properties',
		config: {
			pagination: {
				pageSize: 6,
			},
		},
	});

	const latestProperties = data?.data ?? [];
	if (isLoading) return <div>Loading....</div>;
	if (isError) return <div>Error</div>;
	return (
		<Box>
			<Typography fontSize={25} fontWeight={700} color={mode === 'dark' ? '#fff' : '#11142d'}>
				Dashboard
			</Typography>
			<Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
				<PieChart
					mode={mode}
					title='Properties for sale'
					value={684}
					series={[75, 25]}
					colors={['#475be8', '#E4E8EF']}
				/>
				<PieChart
					mode={mode}
					title='Properties for rent'
					value={550}
					series={[40, 60]}
					colors={['#FD8539', '#E4E8EF']}
				/>
				<PieChart
					mode={mode}
					title='Total customer'
					value={5684}
					series={[90, 10]}
					colors={['#2ED480', '#E4E8EF']}
				/>
				<PieChart
					mode={mode}
					title='Properties for cities'
					value={555}
					series={[65, 65]}
					colors={['#FE6D8E', '#E4E8EF']}
				/>
			</Box>

			<Stack mt='25px' width='100%' direction={{ xs: 'column', lg: 'row' }} gap={4}>
				<TotalRevenue mode={mode} />
				<PropertyReferrals mode={mode} />
			</Stack>

			<Box
				flex={1}
				borderRadius='15px'
				padding='20px'
				bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
				display='flex'
				flexDirection='column'
				minWidth='100%'
				mt='25px'
			>
				<Typography fontSize={18} fontWeight={600} color={mode === 'dark' ? '#EFEFEF' : '#11142D'}>
					Latest Properties
				</Typography>
				<Box mt='20px' sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 3 }}>
					{latestProperties.map((property) => (
						<PropertyCard
							key={property._id}
							id={property._id}
							title={property.title}
							price={property.price}
							location={property.location}
							photo={property.photo}
							mode={mode}
							colorCard='none'
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
};
