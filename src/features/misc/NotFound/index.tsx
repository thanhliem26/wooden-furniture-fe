import styled from "./index.module.scss";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className={styled["page_404"]}>
      <Row className="page_404-main">
        <Col md={14} span={24}>
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>
          <div className="contant_box_404">
            <h2>Look like you're lost</h2>

            <p>the page you are looking for not avaible!</p>

            <Link to="/" className="link_404">
              Go to Home
            </Link>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default NotFound;
