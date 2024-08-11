import images from "@/constants/images";
import { useAppSelector } from "@/store/index";

const MediaComponent = () => {
  const activeAbout = useAppSelector((state) => state.aboutUs.aboutUsSelected);

  return (
    <div className="media__component">
      <div className="icon-wrapper zalo-wrapper">
        <a href={`https://zalo.me/${activeAbout?.phone_number}`} target="_blank">
          <div className="box-icon zalo-icon">
            <img src={images.Zalo} alt="Zalo Icon" className="icon zalo-icon" />
          </div>
        </a>
      </div>
      <div className="icon-wrapper phone-wrapper">
        <a href={`tel:${activeAbout?.phone_number}`}>
          <div className="box-icon">
            <img
              src={images.Phone}
              alt="Phone Icon"
              className="icon phone-icon"
            />
          </div>
        </a>
      </div>
      <div className="icon-wrapper zalo-wrapper">
        <a href={`https://www.messenger.com/t/25155471194099257`} target="_blank">
          <div className="box-icon zalo-icon">
            <img
              src={images.Mess}
              alt="Phone Icon"
              className="icon phone-icon"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default MediaComponent;
