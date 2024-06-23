import images from '@/constants/images';
import styled from './index.module.scss';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className={styled['forbidden__page']}>
      <div className="maincontainer">
        <div className="bat">
          <img
            className="wing leftwing"
            src={images.BatWing}
          />
          <img
            className="body"
            src={images.BatBody}
            alt="bat"
          />
          <img
            className="wing rightwing"
            src={images.BatWing}
          />
        </div>
        <div className="bat">
          <img
            className="wing leftwing"
            src={images.BatWing}
          />
          <img
            className="body"
            src={images.BatBody}
            alt="bat"
          />
          <img
            className="wing rightwing"
            src={images.BatWing}
          />
        </div>
        <div className="bat">
          <img
            className="wing leftwing"
            src={images.BatWing}
          />
          <img
            className="body"
            src={images.BatBody}
            alt="bat"
          />
          <img
            className="wing rightwing"
            src={images.BatWing}
          />
        </div>
        <img
          className="foregroundimg"
          src={images.HauntedHouseForeground}
          alt="haunted house"
        />
      </div>
      <h1 className="errorcode">ERROR 403</h1>
      <div className="errortext">This area is forbidden . <Link to="/">Turn back now!</Link> <button></button></div>
    </div>
  );
};

export default Forbidden;
