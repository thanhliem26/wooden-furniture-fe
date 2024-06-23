import styled from "./index.module.scss";
import { Col, Row, Spin } from "antd";
import { useAppSelector } from "@/store/index";
import Markdown from "react-markdown";
import { handleURL } from "@/utils/index";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import lodash from "lodash";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  handleFetchScroll: () => void;
}

const NewsList = ({ handleFetchScroll }: Props) => {
  const newsList = useAppSelector((state) => state.manageNews.newsList);
  const totalList = useAppSelector((state) => state.manageNews.total);

  //init aos
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return (
    <div className={styled["news__list"]}>
      {!lodash.isEmpty(newsList) ? (
        <InfiniteScroll
          dataLength={newsList.length}
          next={handleFetchScroll}
          hasMore={newsList.length < totalList}
          loader={<Spin />}
        >
          <Row gutter={[30, 50]}>
            {newsList.map((news, index) => {
              const image = handleURL(news.image);
              return (
                <Col
                  span={12}
                  md={8}
                  lg={6}
                  key={index}
                  data-aos="fade-left"
                  data-aos-delay={"200"}
                >
                  <div className="news__list-item">
                    <Link to={`/news/${news.id}`}>
                      <div className="news__item-image">
                        <div className="news__image">
                          <img src={image.url} alt="image news" />
                        </div>
                        <div className="news__date">
                          <div className="badge-inner">
                            <span>{moment(news.createdAt).format("DD")}</span>
                            <br />
                            <span className="is-xsmall">
                              TH{moment(news.createdAt).format("M")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="news__item-content">
                        <div className="item__content-name">
                          <h5 className="overflow__text">{news.name}</h5>
                        </div>
                        <div className="is__divider"></div>

                        <div className="news__item-description">
                          <div className="overflow__text">
                            <Markdown children={news?.contentMarkdown} />;
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      ) : (
        <Col span={12} md={8} lg={6}>
          <Spin />
        </Col>
      )}
    </div>
  );
};

export default NewsList;
