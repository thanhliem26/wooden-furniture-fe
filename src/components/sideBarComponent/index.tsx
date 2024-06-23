import useResizeWindow from "@/hoc/useWindow";
import { Layout } from "antd";
import MenuNavbar from "./menuNavbar";
import { useAppSelector } from "@/store/index";
import { useEffect, useState } from "react";
import images from "@/constants/images";

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: any) => void;
}

const SideBar = ({ collapsed, setCollapsed }: Props) => {
  const resize = useResizeWindow();
  const [avatar, setAvatar] = useState<string>("");
  const userInfo = useAppSelector((state) => state.user);

  useEffect(() => {
    const imageAvatar = userInfo.avatar && JSON.parse(userInfo.avatar);
    setAvatar(imageAvatar ? imageAvatar.url : images.AvatarDefault);
  }, [userInfo]);

  return (
    <Sider
      //pc
      trigger={resize.width >= 1200 ? null : undefined}
      collapsible={true}
      collapsed={collapsed}
      //tablet and phone
      breakpoint={resize.width < 1200 ? "xxl" : undefined}
      collapsedWidth={resize.width < 1200 ? "0" : undefined}
      onBreakpoint={() => {
        setCollapsed((collapse) => !collapse);
      }}
      onCollapse={() => {
        setCollapsed((collapse) => !collapse);
      }}
    >
      <div className="logo__admin-vertical">
        <div className="user__image">
          <img src={avatar} alt={userInfo.fullName} />
        </div>
        {!collapsed ? (
          <div className="user__name">
            <p>{userInfo.fullName}</p>
          </div>
        ) : null}
      </div>
      <MenuNavbar />
    </Sider>
  );
};

export default SideBar;
