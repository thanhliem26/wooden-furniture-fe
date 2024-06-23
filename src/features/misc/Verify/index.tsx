import styled from "./index.module.scss";

const Verify = () => {
  return (
    <div className={styled["verify__email"]}>
      <div className="verify__email-container">
        <div className="verify__image">
          <img
            src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png"
            alt="Logo"
            width="48"
            style={{
              display: "block",
              width: 48,
              maxWidth: 48,
              minWidth: 48,
            }}
          />
        </div>
        <div className="verify__block">
          <div className="verify__block-title">
            <h1>Confirm Your Email Address</h1>
            <p>You're almost set to start enjoying shopping. Simply click the link below to verify your email address and get started. The link expires in 48 hours.</p>
          </div>
          <div className="verify__block-btn">
            <a href="https://mail.google.com/mail/" target="_blank">Verify my email address</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
