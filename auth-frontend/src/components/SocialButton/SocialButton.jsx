function SocialButton({ icon, altText, onClick }) {

  const handleOnClick = () => {
    onClick();
  };
    
  return (
    <button className="container__social-button" onClick={handleOnClick}>
      <img src={icon} alt={altText} />
    </button>
  );
}

export default SocialButton;
