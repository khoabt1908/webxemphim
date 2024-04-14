import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { ListSubheader, TextField } from "@mui/material";

const CustomVideo = (props: any) => {
  const videoNode = useRef(null);
  const [player, setPlayer] = useState<Player | null>(null);
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
  }, [props.key]);

  useEffect(() => {
    if (player && props.sources[0].src !== "") {
      player.pause();
      player.src(props.sources[0].src);
      player.load();
      player.play();
    }
  }, [props]);

  return (
    <div style={{ height: "80vh", width: "80vw" }} data-vjs-player>
      <video ref={videoNode} className="video-js"></video>
    </div>
  );
};
export default function Video() {
  const [finalVttLink, setFinalVttLink] = useState<string | null>("");
  const [stateFinalLink, setStateFinalink] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0);

  const prevMessageRef = useRef<any>(null);
  const prevVttLinkRef = useRef<any>(null);

  // const getVttLinkAxios = async (url: string) => {
  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods":
  //           "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  //         "Access-Control-Allow-Headers":
  //           "X-Requested-With, content-type, Authorization",
  //       },
  //     });

  //     console.log(response.data);

  //     return "  ";
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const handleClick2 = () => {
    setStateFinalink(prevMessageRef?.current?.value);
    setFinalVttLink(prevVttLinkRef?.current?.value);
    setKey((prevKey) => prevKey + 1);
  };

  const CustomLits = () => {
    const [open, setOpen] = useState(false);
    const [listLink, setListLink] = useState([]);

    useEffect(() => {
      getListLink();
    }, []);

    const getListLink = async () => {
      const response = await fetch(import.meta.env.VITE_LIST_LINK, {
        method: "GET",
        headers: {
          Origin: "null",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setListLink(res);
    };

    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListSubheader
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >{`Phim load sẵn`}</ListSubheader>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {listLink.length > 0 &&
              listLink.map((item: any) => {
                return (
                  <ListItemButton
                    onClick={() => {
                      setFinalVttLink(item.vtt);
                      setStateFinalink(item.link);
                      setKey((prevKey) => prevKey + 1);
                    }}
                    key={item.link}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={item.phim} />
                  </ListItemButton>
                );
              })}
          </List>
        </Collapse>
      </List>
    );
  };
  const play = {
    key,
    fill: true,
    fluid: true,
    autoplay: false,
    controls: true,
    preload: "auto",
    playbackRates: [0.5, 1, 1.5, 2, 2.5],
    userActions: {
      hotkeys: true,
    },
    crossorigin: "anonymous",
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
        default: true,
        kind: "captions",
        srclang: "vi",
        label: "Tieng Viet",
        src: `https://thingproxy.freeboard.io/fetch/${finalVttLink}`,
        // src: getVttLinkAxios(finalVttLink),
      },
    ],
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        {/* <span>
          nếu có lỗi sub,vui lòng vào link sau vào lấy quyền{" "}
          <a
            href="https://cors-anywhere.herokuapp.com/corsdemo"
            target="_blank"
          >
            lấy quyền
          </a>
        </span> */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <TextField
            style={{ maxWidth: "100%", display: "flex" }}
            label="Link Phim"
            variant="outlined"
            type="text"
            id="message"
            name="message"
            ref={prevMessageRef}
          />
          <TextField
            style={{ maxWidth: "100%", display: "flex" }}
            label="Link Sub"
            variant="outlined"
            type="text"
            id="vttLink"
            name="vttLink"
            ref={prevVttLinkRef}
          />
          <button onClick={handleClick2}>Watch</button>
        </div>
        <CustomLits></CustomLits>
      </div>
      <div className="App">{stateFinalLink && <CustomVideo {...play} />}</div>
    </>
  );
}
