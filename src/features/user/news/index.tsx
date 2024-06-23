import { useEffect, useState } from "react";
import styled from "./index.module.scss";
import { Col, Row } from "antd";
import NewsList from "./newsList";
import NewsSearch from "./newsSearch";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { pushListNews, searchNews, setPagination } from "@/store/manageNews";
import newsApi from "@/api/news";
import { NotificationError } from "@/utils/index";
import { debounce } from 'lodash';

const News = () => {
  const [search, setSearch] = useState("");
  const pagination = useAppSelector((state) => state.manageNews.pagination);
  const dispatch = useAppDispatch();

  const handleScrollPage = async (param = { pageSize: 10, current: 1 }) => {
    const optionQuery: any = {};

    optionQuery.name = search;
    optionQuery.limit = param.pageSize;
    optionQuery.page = param.current;

    try {
      const { metadata } = await newsApi.searchNews({...optionQuery});
      const { rows } = metadata;
      dispatch(pushListNews(rows))
    } catch(error) {
      NotificationError(error)
    }
  };

  const handleFetchScroll = () => {
    const paginationNext = {...pagination, pageSize: pagination.pageSize, current: pagination.current + 1}
    handleScrollPage(paginationNext)
    dispatch(setPagination({...paginationNext}))
  }

  const handChangeSearch = (value) => {
   setSearch(value)
  }

  useEffect(() => {
    dispatch(
      searchNews({
        name: search,
        limit: 10,
        page: 1,
      })
    );
  }, [search]);

  return (
    <div className={styled["news__main"]}>
      <div className="news__main-container">
        <div className="news__main-title">
          <h1>Category Archives: Tin tức</h1>
        </div>
        <div className="news__main-wrapper">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <NewsSearch handChangeSearch={debounce(handChangeSearch, 300)}/>
            </Col>
            <Col span={24}>
              <NewsList handleFetchScroll={handleFetchScroll}/>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default News;
