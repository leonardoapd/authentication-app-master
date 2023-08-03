import './Dialog.css';

export default function Dialog({ title, content }) {
	return (
		<>
			<dialog open>
				<h2>{title}</h2>
				<p>{content}</p>
			</dialog>
		</>
	);
}
