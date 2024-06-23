import { SearchOutlined } from "@ant-design/icons";
import styled from "./index.module.scss";
import { useEffect, useState } from "react";
import { NotificationError, handleURL } from "@/utils/index";
import newsApi from "@/api/news";
import { isEmpty, debounce } from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

const DetailSearch = () => {
  const [newsList, setNewsList] = useState<NewsState[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const searchDebounce = debounce(handleSearch, 300);

  const handleGetNewsList = async (name) => {
    try {
      const { metadata } = await newsApi.searchNews({
        name: name,
        limit: 10,
        page: 1,
      });
      setNewsList(metadata.rows);
    } catch (error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    handleGetNewsList(search);
  }, [search]);

  return (
    <div className={styled["detail__search"]}>
      <div className="detail__search-field">
        <div className="search__field-input">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            onChange={searchDebounce}
          />
        </div>
        <div className="search__field-icon">
        <SearchOutlined />
        </div>
      </div>
      <div className="detail__search-title">
        <span>Bài viết mới</span>
      </div>
      <div className="is__divider"></div>
      <div className="detail__search-list">
        {!isEmpty(newsList) &&
          newsList.map((news, index) => {
            const image = handleURL(news?.image);

            return (
              <div className="search__list-item" key={index}>
                <div className="search__item-image">
                  <img src={image.url} alt="image news" />
                  <div className="item__image-date">
                    <span>{moment(news.createdAt).format("DD")}</span>
                    <br />
                    <span className="is__small">
                      TH{moment(news.createdAt).format("M")}
                    </span>
                  </div>
                </div>
                <div className="search__item-text">
                  <Link to={`/news/${news.id}`}>{news.name}</Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailSearch;
