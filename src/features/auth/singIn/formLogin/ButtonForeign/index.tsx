import authApi from "@/api/auth";
import styled from "./index.module.scss";
import Images from "@/constants/images";
import { HEADER, TYPE_PROVIDER_LOGIN } from "@/constants/index";
import {
  authentication,
  providerGoogle,
  providerFacebook,
} from "@/utils/firebase";
import { UserCredential, signInWithPopup } from "firebase/auth";
import {
  NotificationError,
  setRefreshToken,
  setToken,
  setUser,
} from "@/utils/index";
import Notification from "@/components/notificationSend";
import { setHeader } from "@/api/axiosService";
import { useNavigate } from "react-router-dom";
import TEXT_COMMON from "@/constants/text";

const ButtonForeign = () => {
  const navigate = useNavigate();

  const handleLoginGoogle = () => {
    signInWithPopup(authentication, providerGoogle)
      .then((data: UserCredential) => {
        const { user } = data;

        const avatar = {
          url: user.photoURL,
          name: "avatar google",
          origin: TYPE_PROVIDER_LOGIN.GOOGLE,
        };

        const body = {
          fullName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          avatar: JSON.stringify(avatar),
          uid: user.uid,
          provider: TYPE_PROVIDER_LOGIN.GOOGLE,
        };

        return authApi.loginProvider(body);
      })
      .then((response) => {
        const { tokens, user } = response.metadata;

        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
          description: TEXT_COMMON.SUCCESS_TEXT.LOGIN_DESCRIPTION,
        });
        setUser(user);
        setToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        setHeader(HEADER.AUTHORIZATION, tokens.accessToken);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        NotificationError(error);
      });
  };

  const handleLoginFacebook = async () => {
    signInWithPopup(authentication, providerFacebook)
      .then((data: UserCredential) => {
        const { user, _tokenResponse } = data;

        const avatar = {
          url: JSON.parse(_tokenResponse.rawUserInfo).picture.data.url,
          name: "avatar facebook",
          origin: TYPE_PROVIDER_LOGIN.FACEBOOK,
        };

        const body = {
          fullName: _tokenResponse.displayName,
          email: _tokenResponse.email,
          phoneNumber: user.phoneNumber,
          avatar: JSON.stringify(avatar),
          uid: user.uid,
          provider: TYPE_PROVIDER_LOGIN.FACEBOOK,
        };

        return authApi.loginProvider(body);
      })
      .then((response) => {
        const { tokens, user } = response.metadata;

        Notification({
          message: TEXT_COMMON.SUCCESS_TEXT.NOTIFY_MESSAGE,
          description: TEXT_COMMON.SUCCESS_TEXT.LOGIN_DESCRIPTION,
        });
        setUser(user);
        setToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        setHeader(HEADER.AUTHORIZATION, tokens.accessToken);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        NotificationError(error);
      });
  };

  return (
    <div className={styled["btn__foreign"]}>
      <div className="btn btn__facebook">
        <button type="button" onClick={handleLoginFacebook}>
          <img src={Images.Facebook} alt="image facebook" />
          <span>{TEXT_COMMON.SHOW_TEXT.FACE_BOOK}</span>
        </button>
      </div>
      <div className="btn btn__google">
        <button type="button" onClick={handleLoginGoogle}>
          <img src={Images.Google} alt="image facebook" />{" "}
          <span>{TEXT_COMMON.SHOW_TEXT.GOOGLE}</span>
        </button>
      </div>
    </div>
  );
};

export default ButtonForeign;
