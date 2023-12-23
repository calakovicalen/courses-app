import { ChangeEvent } from 'react';

export interface InputProps {
	inputName: string;
	inputValue: string;
	inputType: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	error: boolean;
}
