import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Video from "./components/Video";

function App() {
  const [count, setCount] = useState(0);

  const handlePlusCount = () => {
    let a = count;
    a++;
    setCount(a);
  };
  return (
    <>
      {count == 5 ? (
        <Video></Video>
      ) : (
        <LandingPage handleHide={handlePlusCount} />
      )}
    </>
  );
}

export default App;
