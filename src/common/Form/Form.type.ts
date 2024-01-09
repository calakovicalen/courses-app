export interface FormProps {
	header: string;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode;
}
