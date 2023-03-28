import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { propertyReferralsInfo } from '../../constants';

interface currentTheme {
	mode: string;
}
interface ProgressBarProps {
	title: string;
	percentage: number;
	color: string;
	mode: string;
}

const ProgressBar = ({ title, percentage, color, mode }: ProgressBarProps) => (
	<Box width='100%'>
		<Stack direction='row' alignItems='center' justifyContent='space-between'>
			<Typography fontSize={14} fontWeight={500} color={mode === 'dark' ? '#6F767E' : '#808191'}>
				{title}
			</Typography>
			<Typography fontSize={14} fontWeight={500} color={mode === 'dark' ? '#6F767E' : '#808191'}>
				{percentage}%
			</Typography>
		</Stack>
		<Box mt={2} position='relative' width='100%' height='8px' borderRadius={1} bgcolor='#e4e8ef'>
			<Box
				width={`${percentage}% `}
				bgcolor={color}
				position='absolute'
				height='100%'
				borderRadius={1}
			/>
		</Box>
	</Box>
);

const PropertyReferrals = ({ mode }: currentTheme) => {
	return (
		<Box
			p={4}
			id='chart'
			minWidth={490}
			display='flex'
			flexDirection='column'
			borderRadius='15px'
			bgcolor={mode === 'dark' ? '#ffffff14' : '#fff'}
		>
			<Typography fontSize={18} fontWeight={600} color={mode === 'dark' ? '#fff' : '#11142d'}>
				Property Referrals
			</Typography>
			<Stack my='20px' direction='column' gap={4}>
				{propertyReferralsInfo.map((bar) => (
					<ProgressBar key={bar.title} mode={mode} {...bar} />
				))}
			</Stack>
		</Box>
	);
};

export default PropertyReferrals;
