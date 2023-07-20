function SocialButton({ icon, altText }) {
  return (
    <button className="container__social-button">
      <img src={icon} alt={altText} />
    </button>
  );
}

export default SocialButton;
