import "./MoreOrLess.css";
import useWindowDimensions from "../GetWindowDimensions";

interface MoreOrLessProps {
  timeZone: string | null;
  isDayTime: boolean;
  sendDataToParent: (data: boolean) => void;
  isClicked: boolean;
}

function MoreOrLess({
  timeZone,
  isDayTime,
  sendDataToParent,
  isClicked,
}: MoreOrLessProps) {
  const currentDate: Date = new Date();

  // Calculate the day of the year
  const startOfYear: Date = new Date(currentDate.getFullYear(), 0, 0);
  const diff: number = currentDate.getTime() - startOfYear.getTime();
  const oneDay: number = 1000 * 60 * 60 * 24; // milliseconds in a day
  const dayOfYear: number = Math.floor(diff / oneDay);

  // Calculate the day of the week
  const showDayOfWeek = () => {
    const dayOfWeek: number = currentDate.getDay();
    if (dayOfWeek === 0) {
      return 7;
    } else {
      return dayOfWeek;
    }
  };

  //  Calculate the week of the Year
  const weekNumber: number = Math.ceil(dayOfYear / 7);

  const { width } = useWindowDimensions();

  return (
    <div className="moreLessContainer">
      <div
        className={`dropContainer ${
          isDayTime ? "dayDropContainer" : "nightDropContainer"
        }`}
        style={{ display: isClicked ? "flex" : "none" }}
      >
        <div>
          {timeZone && (
            <p>
              Current Zone:{" "}
              <br
                style={{ display: parseInt(width) > 700 ? "block" : "none" }}
              />
              <span>{timeZone}</span>{" "}
            </p>
          )}
          <p>
            Day Of the Year:{" "}
            <br style={{ display: parseInt(width) > 700 ? "block" : "none" }} />
            <span>{dayOfYear}</span>{" "}
          </p>
        </div>
        <div
          className="divideLine"
          style={{
            display: parseInt(width) > 1000 ? "block" : "none",
          }}
        ></div>
        <div>
          <p>
            Day of the Week:{" "}
            <br style={{ display: parseInt(width) > 700 ? "block" : "none" }} />
            <span> {showDayOfWeek()}</span>{" "}
          </p>
          <p>
            Week Number:{" "}
            <br style={{ display: parseInt(width) > 700 ? "block" : "none" }} />
            <span> {weekNumber}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoreOrLess;
