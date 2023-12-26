import React from 'react';
import Trash from 'src/assets/Trash';

import './AuthorItem.css';

function AuthorItem({ author, onDelete, onAdd }) {
	return (
		<li className='authors-list'>
			{author.name}
			<button onClick={() => onAdd(author)}>+</button>
			<button onClick={() => onDelete(author)}>
				<Trash />
			</button>
		</li>
	);
}

export default AuthorItem;
