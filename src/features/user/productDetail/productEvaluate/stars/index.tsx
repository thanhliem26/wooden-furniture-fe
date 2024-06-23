import EvaluateApi from "@/api/evaluate";
import { isJson, NotificationError } from "@/utils/index";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Images from "@/constants/images";
import styled from "./index.module.scss";
import { isEmpty } from "lodash";
import moment from "moment";
import StarFull from "@/components/starFull";
import StarEmpty from "@/components/starEmpty";
import { Progress, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getListEvaluate, pushEvaluateList, setPagination } from "@/store/evaluate";

const Stars = () => {
  const { id } = useParams();
  const evaluateList = useAppSelector((state) => state.evaluate.evaluateList);
  const count = useAppSelector((state) => state.evaluate.total);
  const countReview = useAppSelector((state) => state.evaluate.totalReview);
  const stars = useAppSelector((state) => state.evaluate.countStar);
  const pagination = useAppSelector((state) => state.evaluate.pagination);

  const dispatch = useAppDispatch();

  const starTotal = useMemo(() => {
    const total = stars.reduce((current, next) => {
      return current + next.count * next.value;
    }, 0);

    return total ? (total / count).toFixed(2) : '0';
  }, [stars, count]);

  const handleScrollPage = async (param = { pageSize: 10, current: 1 }) => {
    const optionQuery: any = {};

    optionQuery.product_id = id;
    optionQuery.limit = param.pageSize;
    optionQuery.page = param.current;

    try {
      const { metadata } = await EvaluateApi.getListEvaluate({...optionQuery});
      const { rows } = metadata;
      dispatch(pushEvaluateList(rows))
    } catch(error) {
      NotificationError(error)
    }
  };

  const handleFetchScroll = async () => {
    const paginationNext = {...pagination, pageSize: pagination.pageSize, current: pagination.current + 1}
    handleScrollPage(paginationNext)
    dispatch(setPagination({...paginationNext}))
  };

  useEffect(() => {
    dispatch(getListEvaluate({product_id: id, limit: pagination.pageSize, page: pagination.current}))
  }, [])

  return (
    <div className={styled["evaluate__main"]}>
      <div className="evaluate__star">
        <div className="evaluate__star-title">
          <h4>Community Reviews</h4>
        </div>
        <div className="evaluate__star-number">
          <div className="star__number-count">
            {stars.map((star, index) => {
              const widthSplit = starTotal.split(".")[1];
              const widthStar =
                Math.floor(Number(starTotal)) === star.value
                  ? widthSplit
                  : Math.floor(Number(starTotal)) > star.value
                  ? 0
                  : 100;

              return (
                <div className="evaluate__item-star" key={index}>
                  <div className="star__full" style={{width: `${widthStar}%`}}>
                    <StarFull />
                  </div>
                  <StarEmpty />
                </div>
              );
            })}
            <div className="star__number-title">
              {starTotal !== '0' ? Number(starTotal).toFixed(1) : 5}
            </div>
          </div>
          <div className="star__number-countReview">
            <span>{count} ratings</span>
            <span>.</span>
            <span>{countReview} reviews</span>
          </div>
        </div>
        <div className="evaluate__star-progress">
          {stars.map((star, index) => {
            return (
              <div className="star__progress-item" key={index}>
                <div className="progress__item-name">
                  <span>{star.name}</span>
                </div>
                <div className="progress__item-sc">
                  <Progress
                    size={[500, 10]}
                    strokeColor={"#e87400"}
                    percent={Math.round((star.count / count) * 100)}
                    format={(percent) => `${star.count} (${percent}%)`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="evaluate__list">
      <InfiniteScroll
            dataLength={evaluateList.length}
            next={handleFetchScroll}
            hasMore={evaluateList.length < count}
            loader={<Spin />}
          >
           {!isEmpty(evaluateList) &&
          evaluateList.map((evaluate, index) => {
            const { user_evaluate, createdAt, star } = evaluate;
            const image = isJson(user_evaluate?.avatar)
              ? JSON.parse(user_evaluate.avatar).url
              : Images.AvatarDefault;

            return (
              <div className="evaluate__item" key={index}>
                <div className="evaluate__item-image">
                  <img src={image} alt="avatar" />
                </div>
                <div className="evaluate__item-content">
                  <div className="item__content-name">
                    <span>{user_evaluate.fullName}</span>
                  </div>
                  <div className="item__content-star">
                    {Array.apply(null, Array(5)).map((_, index) => {
                      return (
                        <div className="evaluate__star" key={index}>
                          {star >= index + 1 ? <StarFull /> : <StarEmpty />}
                        </div>
                      );
                    })}
                  </div>
                  <div className="item__content-date">
                    <span>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</span>
                  </div>
                  <div className="item__content-description">
                    <p>{evaluate.evaluate}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </InfiniteScroll>
      </div>
    </div>
  );
};

export default Stars;
