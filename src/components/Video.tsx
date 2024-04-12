import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
const CustomVideo = (props: any) => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (videoNode.current) {
      const _player = videojs(videoNode.current, props);
      setPlayer(_player);
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (player && props.sources[0].src !== "") {
      player.pause();
      player.src(props.sources[0].src);
      player.load();
      player.play();
    }
  }, [props.sources]);

  return (
    <div style={{ height: "80vh", width: "80vw" }} data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
    </div>
  );
};
export default function Video() {
  const [message, setMessage] = useState<string | null>("");
  const [stateFinalLink, setStateFinalink] = useState<string | null>(null);

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleClick2 = () => {
    setStateFinalink(message);
  };
  const play = {
    fill: true,
    fluid: true,
    autoplay: false,
    controls: true,
    preload: "metadata",
    sources: [
      {
        src: stateFinalLink || "",
        type: "application/x-mpegURL",
      },
    ],
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={message || ""}
          />
          <button onClick={handleClick2}>Watch</button>
        </div>
        <div>
          <button
            onClick={() =>
              setStateFinalink(
                "https://vn01.quaivat.com/the_medium_2021/tm_2021.m3u8"
              )
            }
          >
            Bà Đồng (2021) | The Medium
          </button>
        </div>
      </div>
      <div className="App">{stateFinalLink && <CustomVideo {...play} />}</div>
    </>
  );
}
