import React, { useState } from 'react';

const Search = () => {
	const [search, setSearch] = useState('');
	return (
		<div className='search w-100 position-relative'>
			<input
				type='text'
				className='form-control me-2 w-100'
				value={search}
				placeholder='검색어를 입력하세요.'
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
	);
};

export default Search;
