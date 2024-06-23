import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import authApi from "@/api/auth";
import { NotificationError } from "@/utils/index";
import Notification from "@/components/notificationSend";
import TEXT_COMMON from "@/constants/text";

const ActiveUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleActiveUser = async (data) => {
    try {
      const { metadata } = await authApi.activeUser(data);
      if (metadata.user_active) {
        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
          description: TEXT_COMMON.SUCCESS_TEXT.ACTIVE_USER_DESCRIPTION,
          duration: 10,
        });

        navigate("/login");
      }
    } catch (error) {
      NotificationError(error);
    }
  };

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    handleActiveUser(parsed);
  }, []);
  return <div>Active_User</div>;
};

export default ActiveUser;
