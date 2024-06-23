import imageLogin from '@/assets/images/signin-image.jpg';
import { Link } from "react-router-dom";

const ImageLogin = () => {
  return (
    <div className="singIn__content-image">
      <figure>
        <img src={imageLogin} alt="sing in image" />
        <Link to="/login/sing-up">Create an account</Link>
      </figure>
    </div>
  );
};

export default ImageLogin;
