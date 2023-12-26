import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

export interface InputProps {
	inputName: string;
	inputValue: string | number | readonly string[];
	inputType: HTMLInputTypeAttribute;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	error: boolean;
	className?: string;
}
