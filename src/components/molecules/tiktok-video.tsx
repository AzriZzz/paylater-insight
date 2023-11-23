import React from "react";

type ITikTok = {
  id: string;
}

const TikTokVideo = ({ id }: ITikTok) => {
  return (
    <div
     className="-mt-3"
      style={{
        left: 0,
        width: "100%",
        height: 570,
        position: "relative",
      }}
    >
      <iframe
        src={`https://www.tiktok.com/embed/7298326817939721473`}
        className="iframe"
        allowFullScreen
        scrolling="no"
        allow="encrypted-media;"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          border: 0,
        }}
      ></iframe>
    </div>
  );
};

export default TikTokVideo;
