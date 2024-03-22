import { useEffect, useState } from "react";
import MoreOrLess from "./MoreOrLess";
import { Dispatch, SetStateAction } from "react";
import "./LocationNtime.css";
import useWindowDimensions from "../GetWindowDimensions";
import arrowUp from "../assets/desktop/icon-arrow-up.svg";
import "./MoreOrLess.css";

interface LocationNTimeProps {
  localTime: string | null;
  setLocalTime: Dispatch<SetStateAction<string>>;
  isRefresh: boolean;
  isDayTime: boolean;
  sendDataToParent: (data: boolean) => void;
}

function LocationNTime({
  localTime,
  setLocalTime,
  isRefresh,
  isDayTime,
  sendDataToParent,
}: LocationNTimeProps) {
  const [timeZone, setTimeZone] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position: {
      coords: { latitude: any; longitude: any };
    }) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getTimeZone(latitude, longitude);
      getCity(latitude, longitude);
    };

    const getTimeZone = (latitude: any, longitude: any) => {
      const date = new Date();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const localTime = date.toLocaleString("en-US", {
        timeZone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setTimeZone(timeZone);
      setLocalTime(localTime);
    };

    const getCity = async (latitude: any, longitude: any) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        const cityName =
          data.address.city || data.address.town || data.address.village;
        const countryCode = data.address.country_code;
        setCity(cityName);
        setCountry(countryCode);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };

    getUserLocation();
  }, [isRefresh]);

  //TimeZone detection function

  const timeZoneNameaaa = () => {
    const timme = new Date();
    const timmeZone = timme.toLocaleString("en-US", {
      timeZoneName: "short",
    })!;

    const lastWord = timmeZone.match(/[^,\s]+$/)?.[0]; // Type assertion for match result
    return lastWord ? lastWord.trim() : "Unknown";
  };

  const displayTimmeZone = timeZoneNameaaa();

  const { width, height } = useWindowDimensions();

  //////

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    sendDataToParent(!isClicked);
  };

  // More/Less button
  const arrow = isClicked ? (
    <img className="arrowUpImg" alt="arrowUp" src={arrowUp} />
  ) : (
    <img className="arrowDownImg" alt="arrowDown" src={arrowUp} />
  );

  return (
    <div className="locationContainer">
      <div className="forDesktopOnly">
        <div>
          <div className="timeNZone">
            {localTime && <p className="time"> {localTime}</p>}

            <div className="timeZone">{displayTimmeZone}</div>
          </div>
          <div className="countryCity">
            {city && (
              <p style={{ textTransform: "uppercase" }}>
                in {city}, {country}
              </p>
            )}
          </div>
        </div>

        <button
          className="moreLessButton"
          onClick={() => {
            handleClick();
          }}
        >
          {isClicked ? "Less" : "More"}
          {arrow}
        </button>
      </div>

      <MoreOrLess
        timeZone={timeZone}
        isDayTime={isDayTime}
        sendDataToParent={sendDataToParent}
        isClicked={isClicked}
      />
    </div>
  );
}

export default LocationNTime;
