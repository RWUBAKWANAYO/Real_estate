import { Add } from '@mui/icons-material';
import { Box, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useTable } from '@refinedev/core';
import { CustomButton, PropertyCard } from 'components';
import { ColorModeContext } from 'contexts/color-mode';
import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const PropertyList = () => {
	const { mode } = useContext(ColorModeContext);
	const navigate = useNavigate();

	const {
		tableQueryResult: { data, isLoading, isError },
		current,
		setCurrent,
		setPageSize,
		pageCount,
		sorter,
		setSorter,
		filters,
		setFilters,
	} = useTable();

	const allProperties = data?.data ?? [];

	const currentPrice = sorter.find((item) => item.field === 'price')?.order;

	const toggleSort = (field: string) => {
		setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
	};

	const currentFilterValue = useMemo(() => {
		const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));
		return {
			title: logicalFilters.find((item) => item.field === 'title')?.value || '',
			propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
		};
	}, [filters]);

	if (isLoading) return <Typography>Loading...</Typography>;
	if (isError) return <Typography>Error...</Typography>;
	return (
		<Box>
			<Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
				<Stack direction='column' width='100%'>
					<Typography
						fontSize={25}
						fontWeight={700}
						color={mode === 'dark' ? '#EFEFEF' : '#11142D'}
					>
						{!allProperties.length ? 'There are no properties' : 'All Properties'}
					</Typography>
					<Box
						mb={2}
						mt={3}
						display='flex'
						width={'100%'}
						justifyContent='space-between'
						flexWrap='wrap'
					>
						<Box
							display='flex'
							width='100%'
							flexDirection={{ xs: 'column', sm: 'row' }}
							justifyContent='space-between'
						>
							<Box display='flex' gap={2} flexWrap='wrap' mb={{ xs: '20px', sm: 0 }}>
								<CustomButton
									title={`Sort price ${currentPrice === 'asc' ? ' ↑' : ' ↓'}`}
									handleClick={() => toggleSort('price')}
									backgroundColor='#475be8'
									color='#fcfcfc'
								/>
								<TextField
									variant='outlined'
									color='info'
									placeholder='Search by title'
									value={currentFilterValue.title}
									onChange={(e) => {
										setFilters([
											{
												field: 'title',
												operator: 'contains',
												value: e.currentTarget.value ? e.currentTarget.value : undefined,
											},
										]);
									}}
									sx={{
										'& .css-1fp8ei4-MuiInputBase-input-MuiOutlinedInput-input': {
											padding: '10px 15px',
											height: 'auto',
											boxSizing: 'border-box',
											fontSize: '14px',
										},
									}}
								/>
								<Select
									variant='outlined'
									color='info'
									displayEmpty
									required
									inputProps={{ 'aria-label': 'label' }}
									defaultValue=''
									value={currentFilterValue.propertyType}
									onChange={(e) => {
										setFilters(
											[
												{
													field: 'propertyType',
													operator: 'eq',
													value: e.target.value,
												},
											],
											'replace'
										);
									}}
									sx={{
										'& .css-j9pheo-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
											padding: '10px 15px',
											fontSize: '14px',
										},
									}}
								>
									<MenuItem value=''>All</MenuItem>
									{[
										'Apartment',
										'Villa',
										'Farmhouse',
										'Condos',
										'Townhouse',
										'Duplex',
										'Studio',
										'Chalet',
									].map((type) => (
										<MenuItem key={type} value={type.toLocaleLowerCase()}>
											{type}
										</MenuItem>
									))}
								</Select>
							</Box>
							<Stack direction='row' justifyContent='space-between' alignItems='center'>
								<CustomButton
									title='Add Property'
									handleClick={() => navigate('/properties/create')}
									backgroundColor='#475be8'
									color='#fcfcfc'
									icon={<Add />}
								/>
							</Stack>
						</Box>
					</Box>
				</Stack>
			</Box>

			<Box mt='20px' sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 3 }}>
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
			{allProperties.length > 0 && (
				<Box display='flex' justifyContent='center' gap={2} mt={5} flexWrap='wrap'>
					<CustomButton
						title='previous'
						handleClick={() => setCurrent((prev) => prev - 1)}
						backgroundColor='#475be8'
						color='#fcfcfc'
						disabled={!(current > 1)}
					/>
					<Box
						display={{ xs: 'hidden', sm: 'flex' }}
						alignItems='center'
						gap='5px'
						sx={{ fontSize: '14px', marginX: { xs: 0, sm: 2 } }}
					>
						page{' '}
						<strong>
							{current} of {pageCount}
						</strong>
					</Box>
					<CustomButton
						title='next'
						handleClick={() => setCurrent((prev) => prev + 1)}
						backgroundColor='#475be8'
						color='#fcfcfc'
						disabled={current === pageCount}
					/>
					<Select
						variant='outlined'
						color='info'
						displayEmpty
						required
						inputProps={{ 'aria-label': 'label' }}
						defaultValue={6}
						onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
						sx={{
							ml: { xs: 0, sm: 2 },
							'& .css-j9pheo-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
								padding: '10px',
								fontSize: '14px',
							},
						}}
					>
						{[6, 12, 24, 36, 48, 52].map((size) => (
							<MenuItem key={size} value={size} sx={{ fontSize: '14px' }}>
								Show {size}
							</MenuItem>
						))}
					</Select>
				</Box>
			)}
		</Box>
	);
};

