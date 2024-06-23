import { Col, Row } from "antd";
import styled from "./index.module.scss";
import DetailContent from "./detailContent";
import { useParams } from "react-router-dom";
import newsApi from "@/api/news";
import { useEffect, useState } from "react";
import { NotificationError } from "@/utils/index";
import DetailSearch from "./detailSearch";

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState<NewsState | null>(null);

    const handleGetNews = async (id) => {
        try {
            const {metadata} = await newsApi.getNewsById(id);
            setNews(metadata)
        } catch(error) {
            NotificationError(error)
        }
    }

    useEffect(() => {
        handleGetNews(id)
    }, [id])
    
  return (
    <div className={styled["news__detail"]}>
      <div className="news__detail-container">
        <Row gutter={[50, 16]}>
          <Col span={24} lg={18}>
          <div className="news__detail-content">
            <DetailContent news={news}/>
          </div>
          </Col>
          <Col span={24} lg={6}>
          <div className="news__detail-search">
            <DetailSearch />
          </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewsDetail;
