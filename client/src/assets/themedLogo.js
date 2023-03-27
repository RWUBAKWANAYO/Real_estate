import React, { useContext } from 'react';
import logo_dark from './logo_dark.svg';
import logo_light from './logo_light.svg';
import { ColorModeContext } from '../contexts/color-mode';

export const ThemedLogo = () => {
	const { mode } = useContext(ColorModeContext);

	return mode === 'dark' ? (
		<img src={logo_dark} alt='logo' width='140px' />
	) : (
		<img src={logo_light} alt='logo' width='140px' />
	);
};
