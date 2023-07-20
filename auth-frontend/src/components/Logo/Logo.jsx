import images from "../../constants/images";

function Logo({ isDarkMode }) {
  return (
    <img
      src={isDarkMode === "dark" ? images.logoDark : images.logo}
      alt="Devchallenges logo"
    />
  );
}

export default Logo;
