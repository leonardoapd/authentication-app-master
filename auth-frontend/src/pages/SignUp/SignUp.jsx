// SignUp.js
import { Link } from "react-router-dom";
import { useColorMode } from "../../context/ColorModeContext";
import FormInput from "../../components/FormInput/FormInput";
import Logo from "../../components/Logo/Logo";
import SocialButton from "../../components/SocialButton/SocialButton";
import images from "../../constants/images";
import "./SignUp.css";

function SignUp() {
  const { isDarkMode } = useColorMode();

  return (
    <main className="container">
      <Logo isDarkMode={isDarkMode} />
      <h2 className={`container__heading ${isDarkMode}`}>
        Join thousands of learners from around the world
      </h2>
      <p className={`container__text ${isDarkMode}`}>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <form action="" className="form">
        <FormInput
          label="Email"
          name="email"
          type="email"
          onChange={() => {}}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          onChange={() => {}}
        />
        <button className="form__button" type="submit">
          Start coding now
        </button>
      </form>

      <p className="container__social-text">
        or continue with these social profile{" "}
      </p>
      <div className="container__social-buttons">
        <SocialButton icon={images.googleIcon} altText="Google logo" />
        <SocialButton icon={images.facebookIcon} altText="Facebook logo" />
        <SocialButton icon={images.twitterIcon} altText="Twitter logo" />
        <SocialButton icon={images.githubIcon} altText="Github logo" />
      </div>

      <p className="container__social-text">
        Already a member? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default SignUp;
