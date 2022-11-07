import React from "react";

const Disclaimer = () => {
  return (
    <div className="mt-4">
      <p>We made this tool for our personal use.</p>
      <p>If you need to test a smtp server, please feel free to use it at your own risks.</p>
      <p className="py-4">
        For your information, no data will be persistent or stored on our server.
      </p>
      <p>If you still don't feel confident, we advise you to use a test account.</p>
      <p>You can also change your password after your test(s)</p>
    </div>
  );
};

export default Disclaimer;
