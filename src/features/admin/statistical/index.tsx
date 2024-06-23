import { AreaChartOutlined } from "@ant-design/icons";
import styled from "./index.module.scss";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AreaChartStatistical from "./areaChart";
import orderDetailApi from "@/api/orderDetail";
import { NotificationError } from "@/utils/index";
import RadarChartStatistical from "./radarChart";

const { RangePicker } = DatePicker;

const Statistical = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "year"));
  const [endDate, setEndDate] = useState(dayjs());

  const [statisticalOrder, setStatisticalOrder] = useState<statisticalOrder[]>([]);
  const [statisticalProduct, setStatisticalProduct] = useState<statisticalProduct[]>([]);

  const handleChangeDate = ([startDate, endDate]) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleGetListStatistical = async () => {
    try {
      const { metadata } = await orderDetailApi.getListStatistical({
        date_from: startDate.format("YYYY-MM-DD HH:mm:ss"),
        date_to: endDate.format("YYYY-MM-DD HH:mm:ss"),
      });

      setStatisticalOrder(metadata.statistical_order);
      setStatisticalProduct(metadata.statistical_product);

    } catch(error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    handleGetListStatistical();
  }, [startDate, endDate]);

  return (
    <div className={styled["statistical__main"]}>
      <div className="statistical__container">
        <div className="statistical__title">
          <AreaChartOutlined /> <h3> Statistical</h3>
        </div>
        <div className="statistical__content">
          <div className="statistical__content-date">
            <div className="select_date">
              <div className="content__date-title">
                <span>Select date</span>
              </div>
              <div className="content__date-select">
                <RangePicker
                  value={[startDate, endDate]}
                  onChange={handleChangeDate}
                />
              </div>
            </div>
          </div>
          <div className="statistical__content-chart">
            <div className="radar__chart">
              <RadarChartStatistical statisticalProduct={statisticalProduct}/>
            </div>
            <div className="area__chart">
              <AreaChartStatistical statisticalOrder={statisticalOrder}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
