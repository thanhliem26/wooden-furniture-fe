import imageRegister from '@/assets/images/signup-image.jpg';
import { Link } from "react-router-dom";

const ImageRegister = () => {
  return (
    <div className="singUp__content-image">
      <figure>
        <img src={imageRegister} alt="sing up image" />
        <Link to="/login">I am already member</Link>
      </figure>
    </div>
  );
};

export default ImageRegister;
