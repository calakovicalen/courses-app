import { MouseEvent } from 'react';

export interface ButtonProps {
	buttonText: string;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset';
}
