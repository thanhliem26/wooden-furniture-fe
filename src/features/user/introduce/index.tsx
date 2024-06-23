import styled from "./index.module.scss";
import Image from "@/constants/images";
import { useAppSelector } from "@/store/index";
import { isJson } from "@/utils/index";
import { Col, Row } from "antd";
import { useMemo } from "react";
import Markdown from "react-markdown";

const Introduce = () => {
  const activeAbout = useAppSelector((state) => state.aboutUs.aboutUsSelected);

  const image = useMemo(() => {
    return isJson(activeAbout?.image)
      ? JSON.parse(activeAbout?.image)[0].url
      : Image.Introduce;
  }, [activeAbout]);

  return (
    <div className={styled["introduce__main"]}>
      <div className="introduce__main-title">
        <h1>{activeAbout?.name}</h1>
        <div className="divider"></div>
      </div>
      <div className="introduce__main-banner">
        <div className="main__banner-image fill">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="introduce__main-contact">
        <Row>
          <Col sm={8} xs={24}>
            <div className="main__contact-item">
              <div className="contact__item-icon">
                <div className="item__icon">
                  <img src={Image.Agenda} alt="agenda" />
                </div>
                <div className="item__name">
                  <h3>{activeAbout?.name}</h3>
                </div>
              </div>
              <div className="contact__item-content">
                <p>{activeAbout?.address}</p>
              </div>
              <div className="contact__item-btn">
                <a href={activeAbout?.address_link} target="blank">
                  CLICK ME!
                </a>
              </div>
            </div>
          </Col>
          <Col sm={8} xs={24}>
            <div className="main__contact-item">
              <div className="contact__item-icon">
                <div className="item__icon">
                  <img src={Image.SmartPhone} alt="smartphone" />
                </div>
                <div className="item__name">
                  <h3>Điện Thoại</h3>
                </div>
              </div>
              <div className="contact__item-content">
                <p>{activeAbout?.phone_number}</p>
              </div>
              <div className="contact__item-btn">
                <a href={`tel:${activeAbout?.phone_number}`}>CLICK ME!</a>
              </div>
            </div>
          </Col>
          <Col sm={8} xs={24}>
            <div className="main__contact-item">
              <div className="contact__item-icon">
                <div className="item__icon">
                  <img src={Image.Agenda} alt="agenda" />
                </div>
                <div className="item__name">
                  <h3>Email</h3>
                </div>
              </div>
              <div className="contact__item-content">
                <p>{activeAbout?.email}</p>
              </div>
              <div className="contact__item-btn">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${activeAbout?.email}`}
                  target="_blank"
                >
                  CLICK ME!
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="introduce__main-markdown">
        <Markdown children={activeAbout?.contentMarkdown} />
      </div>
    </div>
  );
};

export default Introduce;
