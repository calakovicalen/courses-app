import React, { useState, ChangeEvent } from 'react';

import Button from 'src/common/Button/Button';

import { SearchBarProps } from './SearchBar.type';

import './SearchBar.css';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleSearchClick = () => {
		onSearch(searchQuery);
	};

	return (
		<div className='search-bar__container'>
			<input
				type='text'
				placeholder='Search by title or ID'
				value={searchQuery}
				onChange={handleInputChange}
				className='search-bar'
			/>
			<Button buttonText='Search' onClick={handleSearchClick} />
		</div>
	);
};

export default SearchBar;
