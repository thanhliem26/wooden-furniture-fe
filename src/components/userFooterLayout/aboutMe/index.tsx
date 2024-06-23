import { useAppSelector } from "@/store/index";

const AboutMe = () => {
  const activeAbout = useAppSelector((state) => state.aboutUs.aboutUsSelected);

  return (
    <div className="aboutMe layout__footer-contain">
      <div className="aboutMe__title">
        <h3>Thông tin liên hệ</h3>
      </div>
      <div className="aboutMe__content">
        <div className="aboutMe__content-field">
          <p><span>Address:</span>{activeAbout?.address}</p>
        </div>
        <div className="aboutMe__content-field">
          <p><span>Telephone:</span> {activeAbout?.phone_number}</p>
        </div>
        <div className="aboutMe__content-field">
          <p><span>Email:</span> {activeAbout?.email}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutMe