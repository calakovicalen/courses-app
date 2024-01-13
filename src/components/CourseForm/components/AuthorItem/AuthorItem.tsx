import React from 'react';
import TrashAuthor from 'src/assets/TrashAuthor';

import './AuthorItem.css';

const AuthorItem = ({ author, onDelete, onAdd }) => (
	<li className='authors-list'>
		{author.name}
		<button type='button' onClick={() => onAdd(author)}>
			+
		</button>
		<button type='button' onClick={() => onDelete(author)}>
			<TrashAuthor />
		</button>
	</li>
);

export default AuthorItem;
