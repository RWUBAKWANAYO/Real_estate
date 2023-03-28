import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { PieChartProps } from 'interfaces/home';
import ReactApexChart from 'react-apexcharts';
interface ExtendPieChart extends PieChartProps {
	mode: string;
}
const PieChart = ({ title, value, series, colors, mode }: ExtendPieChart) => {
	return (
		<Box
			id='chart'
			display='flex'
			flex={1}
			flexDirection='row'
			justifyContent='space-between'
			alignItems='center'
			pl={3.5}
			py={2}
			gap={2}
			borderRadius='15px'
			minHeight='110px'
			width='fit-content'
			bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
		>
			<Stack direction='column'>
				<Typography fontSize={14} color={mode === 'dark' ? '#6F767E' : '#808191'}>
					{title}
				</Typography>
				<Typography
					fontSize={24}
					fontWeight={700}
					mt={1}
					color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
				>
					{value}
				</Typography>
			</Stack>
			<ReactApexChart
				options={{
					chart: { type: 'donut' },
					colors,
					legend: { show: false },
					dataLabels: { enabled: false },
					stroke: {
						show: false,
						width: 0,
					},
				}}
				series={series}
				type='donut'
				width='110px'
			/>
		</Box>
	);
};

export default PieChart;
