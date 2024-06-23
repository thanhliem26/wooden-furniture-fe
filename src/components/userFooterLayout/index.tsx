import styled from "./index.module.scss";
import { Col, Row } from "antd";
import Directional from "./directional";
import Advertisement from "./advertisement";
import AboutMe from "./aboutMe";

const UserFooterLayout = () => {

  return (
    <div className={styled["layout__footer"]}>
      <div className="layout__footer-main">
        <Row gutter={[16, 16]}>
          <Col md={6} span={24}>
            <Directional /> 
          </Col>
          <Col md={12} span={24} className="border__item">
            <Advertisement />
          </Col>
          <Col md={6} span={24}>
            <AboutMe /> 
          </Col>
        </Row>
      </div>
      <div className="layout__footer-introduce">
        <p>© All rights reserved. Thiết kế website TL</p>
      </div>
    </div>
  );
};

export default UserFooterLayout;
