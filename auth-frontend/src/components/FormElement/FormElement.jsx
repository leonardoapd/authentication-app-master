import { useState, forwardRef, useImperativeHandle } from 'react';
import './FormElement.css';

const FormElement = forwardRef(
	({ label, name, type, icon, onChange, rows }, ref) => {
		const [value, setValue] = useState('');
		const [error, setError] = useState('');

		const elementId = label.replace(/\s+/g, '-').toLowerCase();

		useImperativeHandle(ref, () => ({
			resetInput: () => {
				setValue('');
				setError('');
			},
		}));

		// Function to handle changes to the input/textarea value
		const handleChange = (e) => {
			const { value } = e.target;

			setValue(value);
			setError('');

			if (value.length === 0) {
				setError('This field is required');
			}

			if (typeof onChange === 'function') {
				onChange(value, e);
			}
		};

		return (
			<div className='form-group'>
				{icon}
				{type === 'textarea' ? (
					<textarea
						title={elementId}
						className='form-group__textarea'
						name={name}
						id={elementId}
						value={value}
						onChange={handleChange}
						style={{
							'borderColor': error
								? '#FF6B6B'
								: 'var(--border-color)',
						}}
						rows={rows}
					/>
				) : (
					<input
						title={elementId}
						className='form-group__input'
						name={name}
						type={type}
						id={elementId}
						value={value}
						onChange={handleChange}
						style={{
							'borderColor': error
								? '#FF6B6B'
								: 'var(--border-color)',
						}}
					/>
				)}
				<label
					className={`form-group__label ${
						value && 'form-group__label--filled'
					}`}
					htmlFor={elementId}
				>
					{label}
				</label>
				{error && <p className='form-group__error'>{error}</p>}
			</div>
		);
	}
);

export default FormElement;
