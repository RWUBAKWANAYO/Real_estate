import React, { useContext } from 'react';
import { useList } from '@refinedev/core';
import { ColorModeContext } from '../contexts/color-mode';
import { PieChart, PropertyCard, PropertyReferrals, TopAgent, TotalRevenue } from 'components';
import { Box, Stack, Typography } from '@mui/material';
export const Home = () => {
	const { mode } = useContext(ColorModeContext);
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
		</Box>
	);
};
