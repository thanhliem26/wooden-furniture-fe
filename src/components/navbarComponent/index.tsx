import useResizeWindow from "@/hoc/useWindow";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Button, theme } from "antd";

const { Header, Content } = Layout;

interface Props {
  children: React.ReactNode;
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void;
}

const NavbarComponent = ({ children, collapsed, setCollapsed }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const resize = useResizeWindow();
  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        {resize.width >= 1200 && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        )}
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          style={{ padding: "24px", minHeight: "360px", background: "#ffffff" }}
        >
          {children}
        </div>
      </Content>
      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default NavbarComponent;
