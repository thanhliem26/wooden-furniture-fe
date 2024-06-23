import { Link } from "react-router-dom";
import styled from "./index.module.scss";
import {
  CloseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface Props {
  setOpenMenu: (value) => void;
  menu: metadataMenu[]
}

const NavMobile = ({setOpenMenu, menu}: Props) => {
  return (
    <div className={styled["nav__user-mobile"]}>
      <div className="user__background" onClick={() => setOpenMenu((prev: boolean) => !prev)}></div>
      <div className="user__mobile">
        <div className="user__mobile-nav">
          <div className="mobile__nav-search">
            <div className="util__search-input">
              <input type="text" placeholder="Tìm kiếm..." />
              <SearchOutlined />
            </div>
          </div>
          <div className="mobile__nav-menu">
            {menu && menu.map((item, index) => {
              return  <div className="nav__menu-item" key={index}><Link to={item.href}>{item.label}</Link></div>;
            })}
            <div className="nav__menu-item">
              <Link to='/cart'>GIỎ HÀNG <ShoppingCartOutlined /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="remove__background" onClick={() => setOpenMenu((prev: boolean) => !prev)}>
        <CloseOutlined />
      </div>
    </div>
  );
};

export default NavMobile;
