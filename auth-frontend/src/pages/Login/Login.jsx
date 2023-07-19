import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import images from "../../constants/images";
import "./Login.css";

function Login() {
  return (
    <main className="container">
      <img src={images.logo} alt="Devchallenges logo" />
      <h2 className="container__heading">Login</h2>
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
          Login
        </button>
      </form>

      <p className="container__social-text">
        or continue with these social profile{" "}
      </p>
      <div className="container__social-buttons">
        <button className="container__social-button">
          <img src={images.googleIcon} alt="Google logo" />
        </button>
        <button className="container__social-button">
          <img src={images.facebookIcon} alt="Facebook logo" />
        </button>
        <button className="container__social-button">
          <img src={images.twitterIcon} alt="Twitter logo" />
        </button>
        <button className="container__social-button">
          <img src={images.githubIcon} alt="Github logo" />
        </button>
      </div>

      <p className="container__social-text">
        Don&apos;t have an account yet? <Link to="/signup">Register</Link>
      </p>
    </main>
  );
}

export default Login;
