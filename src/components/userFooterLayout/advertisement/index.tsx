import Logo from "@/assets/images/logo.png";
import { useAppSelector } from "@/store/index";
import { isJson } from "@/utils/index";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const activeAbout = useAppSelector((state) => state.aboutUs.aboutUsSelected);

  const logo = useMemo(() => {
    return isJson(activeAbout?.logo)
      ? JSON.parse(activeAbout?.logo)[0].url
      : Logo;
  }, [activeAbout]);

  return (
    <div className="advertisement layout__footer-contain">
      <div className="util__logo">
        <Link to="/">
          <img width="200" height="100" src={logo} alt="noithatbanghe" />
        </Link>
      </div>
      <div className="advertisement__content">
        <h1 >
          Đồ Gỗ Thành Lành cơ sở chuyên sản xuất và cung cấp sản phẩm đồ gỗ mỹ
          nghệ cao cấp tại Nam Định. Đồ Gỗ Thành Lành có nhiều mẫu đồ gỗ đẹp cao
          cấp được làm bởi những nghệ nhân và kỹ sư dày dặn kinh nghiệm, tâm
          huyết với nghề.
        </h1>
      </div>
    </div>
  );
};

export default Advertisement;
