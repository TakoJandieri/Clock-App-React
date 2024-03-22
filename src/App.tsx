import { useState, useEffect } from "react";
import "./App.css";
import LocationNTime from "./Components/LocationNTime";
import refresh from "./assets/desktop/icon-refresh.svg";
import sun from "./assets/desktop/icon-sun.svg";
import moon from "./assets/desktop/icon-moon.svg";
import useWindowDimensions from "./GetWindowDimensions";

function App() {
  const [localTime, setLocalTime] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const [isDayTime, setIsDayTime] = useState(true);
  const [isMoreOrLessClicked, setIsMoreOrLessClicked] = useState(false);

  const backPhoto = () => {
    const hours = Number(localTime.split(":")[0]);

    if (hours >= 18 && hours <= 23) {
      setIsDayTime(false);
    } else if (hours <= 6) {
      setIsDayTime(false);
    } else {
      setIsDayTime(true);
    }
  };

  useEffect(() => {
    backPhoto();
  }, [localTime]);

  const propFromChild = (data: boolean) => {
    setIsMoreOrLessClicked(data);
  };

  const { width, height } = useWindowDimensions();

  return (
    <div
      className={`App ${isDayTime ? "dayBackPhoto" : "nightBackPhoto"}`}
      style={{
        width,
        height,
        justifyContent: isMoreOrLessClicked ? "flex-end" : "space-between",
      }}
    >
      <div
        className={isMoreOrLessClicked ? "closeHeadContainer" : "headContainer"}
      >
        <div className="text">
          <div>
            “The science of operations, as derived from{"   "}
            mathematics more especially, is a science of itself, and has its own
            abstract truth and value.”
          </div>
          <div>
            <img
              onClick={() => {
                setIsRefresh(!isRefresh);
              }}
              style={{ width: 17 }}
              alt="refreshIcon"
              src={refresh}
            />
          </div>
        </div>

        <div className="authorP">
          <p>Ada Lovelace</p>
        </div>
      </div>

      <div className="footerContainer">
        <div className="innerFoot">
          {isDayTime ? (
            <>
              <img style={{ marginRight: "16px" }} alt="sun" src={sun} /> Good
              Morning
            </>
          ) : (
            <>
              <img style={{ marginRight: "16px" }} alt="moon" src={moon} />
              Good Evening
            </>
          )}
          <span
            style={{
              display: parseInt(width) > 700 ? "flex" : "none",
              marginLeft: "7px",
            }}
          >
            it's currently
          </span>
        </div>
        <LocationNTime
          localTime={localTime}
          setLocalTime={setLocalTime}
          isRefresh={isRefresh}
          isDayTime={isDayTime}
          sendDataToParent={propFromChild}
        />
      </div>
    </div>
  );
}

export default App;
