import NProgress from "nprogress";
import { FC, Fragment, useEffect } from "react";

const LoadingScreen: FC = () => {
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <Fragment />;
};

export default LoadingScreen;
