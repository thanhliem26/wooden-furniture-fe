import { useEffect, useRef } from "react";
import styled from "./index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import { formatCurrency } from "@/utils/index";
import BoxContent from "../boxContent";
import productApi from "@/api/product";
import { RootState, useAppDispatch, useAppSelector } from "@/store/index";
import { searchCategory, setCategorySelected } from "@/store/manageCategories";
import { debounce } from "lodash";
import { searchProduct } from "@/store/manageProducts";
import { setPagination } from "@/store/manageProducts";
import { useLocation, useNavigate } from "react-router-dom";
import TEXT_COMMON from "@/constants/text";

interface Props {
  sliderPrice: [number, number];
  setSliderPrice: any;
  rangePrice: { minPrice: number; maxPrice: number };
  setRangePrice: any;
  nameProduct: string;
  setNameProduct: any;
  categorySelected: CategoryState | null;
}

const ProductFilter = ({
  sliderPrice,
  setSliderPrice,
  rangePrice,
  setRangePrice,
  nameProduct,
  setNameProduct,
  categorySelected,
}: Props) => {
  const categories = useAppSelector(
    (state: RootState) => state.manageCategory.categoryList
  );
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGetRangePrice = async () => {
    const { metadata } = await productApi.getRangePrice();
    setRangePrice(metadata);
  };

  const handleChangeName = (value) => {
    setNameProduct(value);
  };

  const handleFilterProduct = (param = { pageSize: 10, current: 1 }) => {
    const optionQuery: any = {};

    if (categorySelected) {
      optionQuery.category_id = categorySelected.id;
    }

    if (sliderPrice[0] !== 0 && sliderPrice[1] !== 0) {
      optionQuery.minPrice = sliderPrice[0];
      optionQuery.maxPrice = sliderPrice[1];
    }

    optionQuery.name = nameProduct;
    optionQuery.limit = param.pageSize;
    optionQuery.page = param.current;

    dispatch(setPagination({ ...param }));
    dispatch(searchProduct({ ...optionQuery }));
  };

  const debounceChangeName = debounce(handleChangeName, 300);

  useEffect(() => {
    handleGetRangePrice();
  }, []);

  useEffect(() => {
    setSliderPrice([rangePrice.minPrice, rangePrice.maxPrice]);
  }, [rangePrice]);

  useEffect(() => {
    dispatch(searchCategory({ name: "" }));
  }, []);

  useEffect(() => {
    handleFilterProduct();
  }, [nameProduct, categorySelected, rangePrice]);

  useEffect(() => {
    if (location.state?.name) {
      if(inputRef.current) inputRef.current.value = location.state.name;
      navigate(location.pathname, { replace: true, state: {} }); //remove state when component mounted
      setNameProduct(location.state.name)
    }
    
  }, [location.state?.name]);

  return (
    <div className={styled["product__filter"]}>
      <div className="product__filter-search">
        <BoxContent title="ACTIVE FILTERS">
          <div className="filter__search-input">
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm..."
              onChange={(e) => debounceChangeName(e.target.value)}
            />

            <div className="filter__search-icon">
              <SearchOutlined />
            </div>
          </div>
        </BoxContent>
      </div>
      <div className="product__filter-category">
        <BoxContent title="Danh mục sản phẩm">
          <ul className="filter__ul">
            {categories.map((category, index) => {
              return (
                <li className="filter__li" key={index}>
                  {categorySelected?.id === category.id ? (
                    <p className="filter__li-selected">
                      {category.name}{" "}
                      <span onClick={() => dispatch(setCategorySelected(null))}>
                        {" "}
                        &#10006;
                      </span>
                    </p>
                  ) : (
                    <p onClick={() => dispatch(setCategorySelected(category))}>
                      <span>&gt;</span> {category.name}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </BoxContent>
      </div>
      <div className="product__filter-price">
        <BoxContent title="Lọc theo giá">
          <div className="filter__price-number">
            <div className="price__number-slider">
              <Slider
                range
                value={sliderPrice}
                min={rangePrice.minPrice}
                max={rangePrice.maxPrice}
                onChange={(value) => {
                  setSliderPrice(value);
                }}
              />
            </div>
            <div className="price__number-text">
              <div className="number__text-btn">
                <button onClick={() => handleFilterProduct()}>
                  <span>Lọc</span>
                </button>
              </div>
              <div className="number__text-price">
                <span>Giá: </span>
                <p>
                  {formatCurrency(sliderPrice[0])} {TEXT_COMMON.SHOW_TEXT.CURRENT_ENDPOINT} -{" "}
                  {formatCurrency(sliderPrice[1])} {TEXT_COMMON.SHOW_TEXT.CURRENT_ENDPOINT}
                </p>
              </div>
            </div>
          </div>
        </BoxContent>
      </div>
    </div>
  );
};

export default ProductFilter;
