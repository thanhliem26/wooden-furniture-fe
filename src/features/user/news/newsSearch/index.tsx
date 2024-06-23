import styled from "./index.module.scss";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  handChangeSearch: (search: string) => void;
}

const NewsSearch = ({handChangeSearch}: Props) => {
  return (
    <div className={styled["news__search"]}>
      <div className="news__search-field">
        <input type="text" onChange={(e) => handChangeSearch(e.target.value)}/>
      </div>
      <div className="filter__search-icon">
        <SearchOutlined />
      </div>
    </div>
  );
};

export default NewsSearch;
