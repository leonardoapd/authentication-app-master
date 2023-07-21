import './Footer.css';

export default function Footer() {
	return (
		<footer className='footer'>
			<p className='footer__created-by'>
				created by <span className='footer__author'>leonardoapd</span>
			</p>
			<a className='footer__dev-challenges' href='https://devchallenges.io/' target='_blank' rel='noreferrer'>
                devChallenges.io
            </a>
		</footer>
	);
}
