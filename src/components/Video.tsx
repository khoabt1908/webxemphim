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
    preload: "auto",
    playbackRates: [0.5, 1, 1.5, 2, 2.5],
    userActions: {
      hotkeys: true,
    },
    crossorigin:"anonymous",
    controlBar: {
      pictureInPictureToggle: false,
    },
    sources: [
      {
        src: stateFinalLink || "",
        type: "application/x-mpegURL",
      },
    ],
    tracks: [
      {
        default:true,   
        kind: "captions",
        srclang: "vi",
        label: "Tieng Viet",
        src: "https://cors-anywhere.herokuapp.com/https://phimnhua.net/wp-content/uploads/2021/07/Kung.Fu_.Panda_.2008.720p.BrRip_.x264.vtt",
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
                "https://vn04.quaivat.com/kung_fu_panda_2008/kfp_2008.m3u8"
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
