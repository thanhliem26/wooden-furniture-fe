import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { useEffect } from "react";
import { searchNews } from "@/store/manageNews";
import { isEmpty } from "lodash";
import moment from "moment";
import Markdown from "react-markdown";
import { handleURL } from "@/utils/index";
import { Link } from "react-router-dom";

const UseFulInformation = () => {
  const newsList = useAppSelector(
    (state: RootState) => state.manageNews.newsList
  );
  // eslint-disable-next-line
  const SlickButton = ({ currentSlide, slideCount, children, ...props }) => {
    return <span {...props}>{children}</span>;
  };

  const setting = {
    draggable: true,
    slidesToShow: 3,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    arrows: true,
    initialSlide: 0,
    nextArrow: (
      <SlickButton currentSlide slideCount>
        <RightOutlined className="prev_icon" />
      </SlickButton>
    ),
    prevArrow: (
      <SlickButton currentSlide slideCount>
        <LeftOutlined className="next_icon" />
      </SlickButton>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchNews({ name: "", limit: 10, page: 1 }));
  }, []);

  return (
    <div className="main_useful">
      <div className="main__useful-title">
        <span>Thông tin hữu ích</span>
      </div>

      <Carousel {...setting}>
        {!isEmpty(newsList) &&
          newsList.map((news, index) => {
            const image = handleURL(news.image);

            return (
              <div className="useful__content" key={index}>
                <Link to={`/news/${news.id}`}>
                  <div className="useful__content-image">
                    <img src={image.url} alt="image news" />
                    <div className="useful__content-day">
                      <span className="sp1">
                        {moment(news.createdAt).format("DD")}
                      </span>
                      <br />
                      <span className="sp2">
                        TH{moment(news.createdAt).format("M")}
                      </span>
                    </div>
                  </div>
                  <div className="useful__content-description">
                    <h5 className="overflow__text">{news.name}</h5>
                    <div className="is_divider"></div>
                    <div className="overflow__text">
                      <Markdown children={news?.contentMarkdown} />;
                    </div>
                    <button>Đọc thêm</button>
                  </div>
                </Link>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};

export default UseFulInformation;
