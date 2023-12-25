import React, { useState, ChangeEvent } from 'react';

import Button from 'src/common/Button/Button';

import { SearchBarProps } from './SearchBar.type';

import './SearchBar.css';
import Input from 'src/common/Input/Input';

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
			<Input
				inputName=''
				inputType='text'
				inputValue={searchQuery}
				onChange={handleInputChange}
				error={null}
			/>
			<Button buttonText='Search' onClick={handleSearchClick} />
		</div>
	);
};

export default SearchBar;
