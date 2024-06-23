import { Col, Row } from "antd";
import ImageConstant from "@/constants/images";
import { useContext, useEffect, useState } from "react";
import MainPageContext from "../constant";
import lodash from 'lodash';
import AOS from "aos";
import "aos/dist/aos.css";

type imageState = {
  url: string;
  origin?: string;
  name?: string;
};

const BestOffer = () => {
  const pageContext = useContext(MainPageContext);
  const [images, setImage] = useState<imageState[]>([]);

  useEffect(() => {
    const imageMain = pageContext?.ImageSP ? JSON.parse(pageContext?.ImageSP) : [];

    if (!lodash.isEmpty(imageMain)) {
      setImage(imageMain);
    } else {
      setImage([
        { url: ImageConstant.BOF1 },
        { url: ImageConstant.BOF2 },
      ]);
    }
  }, [pageContext?.ImageSP]);

  //init aos 
  useEffect(() => {
    AOS.init({ duration: 1000,
      once: true
    });
    AOS.refresh();
  }, [])

  return (
    <Row gutter={[20, 40]} className="bestOffer__images">
      {images.map((image, index) => {
        return (
          <Col sm={12} xs={24} key={index} data-aos="fade-right"  data-aos-delay={(index * 200).toString()}>
          <div className="bestOffer__image">
              <img src={image.url} alt="" />
          </div>
        </Col>
        )
      })}
    </Row>
  );
};

export default BestOffer;
