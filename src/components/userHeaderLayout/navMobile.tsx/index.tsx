import { createPortal } from "react-dom";
import styled from "./index.module.scss";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import NavMobile from "./navMobile";

interface Props {
  menu: metadataMenu[],
}

const NavBarUser = ({menu}: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className={styled["nav__user"]}>
      <MenuOutlined style={{fontSize: '22px'}} onClick={() => setOpenMenu((prev) => !prev)} />
      {openMenu ? createPortal(<NavMobile menu={menu} setOpenMenu={setOpenMenu}/>, document.body) : ""}
    </div>
  );
};

export default NavBarUser;
