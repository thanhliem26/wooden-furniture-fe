import { useEffect, useRef, useState } from "react";
import styled from "./index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import debounce from "@/utils/debounce";
import { useAppDispatch } from "@/store/index";

interface Props {
  pagination?: basePagination;
  setPagination?: any;
  setFieldSearch?: any;
  placeholder?: string;
}

const InputSearchField = ({
  pagination = { current: 1, pageSize: 10 },
  setFieldSearch,
  setPagination,
  placeholder=''
}: Props) => {
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const inputSearch = useRef<any>(null);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    setPagination && dispatch(setPagination({ current: 1 }));
  };

  const debounceSearch = debounce(onChangeSearch, 500);
  const handleResetSearch = () => {
    inputSearch.current.value = "";
    setSearch("");
    setPagination && dispatch(setPagination({ current: 1 }));
  };

  useEffect(() => {
    setFieldSearch && dispatch(setFieldSearch({ name: search, page: pagination.current, limit: pagination.pageSize }));
  }, [search, pagination]);

  return (
    <div className={styled["search__field"]}>
      <div className="search__field-contain">
        <div className="search__icon">
          <SearchOutlined />
        </div>
        <div className="search__content">
          <input
            ref={inputSearch}
            placeholder={placeholder}
            onChange={debounceSearch}
          />
        </div>
        <div className="search__icon-delete" onClick={handleResetSearch}>
          X
        </div>
      </div>
    </div>
  );
};

export default InputSearchField;
