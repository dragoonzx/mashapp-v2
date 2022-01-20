import React, { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface ITrackProps {
  stream: string;
  img: string;
  author: string;
  title: string;
}

const Track = ({ stream, img, author, title }: ITrackProps) => {
  const trackRef = useRef<any>();

  const [playing, setPlaying] = useState(false);

  const playTrack = () => {
    if (!trackRef) {
      return;
    }

    trackRef.current.audio.current.play();
    setPlaying(true);
  };

  const pauseTrack = () => {
    if (!trackRef) {
      return;
    }

    trackRef.current.audio.current.pause();
    setPlaying(false);
  };

  return (
    <div
      className="track rounded bg-gradient-to-r from-[#BF53E0] via-[#A431D2] to-[#794EF2] flex items-center p-4"
      style={{ width: "444px", height: "120px" }}
    >
      <div>
        <img src={img} className="h-20 rounded" alt="" />
      </div>
      <div className="flex-1 ml-2">
        <div className="flex justify-end text-white">
          <AudioPlayer ref={trackRef} src={stream} customControlsSection={[]} />
          <svg
            height="18px"
            viewBox="0 0 93 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="svg-audiusLogoHorizontal-28VzzlL"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="svg-audiusLogoHorizontal-1Ww7GnC"
                transform="translate(-35.000000, -16.000000)"
                fill="#fff"
              >
                <g
                  id="svg-audiusLogoHorizontal-1I4K5YZ"
                  transform="translate(32.000000, 16.000000)"
                >
                  <path
                    d="M88.5219554,14.9685213 L89.8349657,13.4196181 C90.6738291,14.0799535 91.6100512,14.4281858 92.5947697,14.4281858 C93.226896,14.4281858 93.5673119,14.2120826 93.5673119,13.8518761 L93.5673119,13.8278245 C93.5673119,13.4796439 93.2876734,13.2875923 92.1327469,13.0233858 C90.3213936,12.6151277 88.9232531,12.1108697 88.9232531,10.381889 L88.9232531,10.357889 C88.9232531,8.79696 90.1754861,7.66834065 92.217877,7.66834065 C93.6645139,7.66834065 94.7951922,8.0525471 95.7191334,8.78493419 L94.5399064,10.4298374 C93.7618726,9.88960516 92.9107806,9.60139871 92.1570996,9.60139871 C91.5856984,9.60139871 91.3059554,9.84160516 91.3059554,10.1417342 L91.3059554,10.1656826 C91.3059554,10.5499406 91.5977703,10.7180439 92.7771018,10.9822503 C94.7343625,11.402431 95.9501709,12.0267923 95.9501709,13.5996955 L95.9501709,13.6236955 C95.9501709,15.3407535 94.5763832,16.3612955 92.5096919,16.3612955 C91.0020686,16.3612955 89.5675035,15.8930116 88.5219554,14.9685213 Z M76.8785873,12.5311226 L76.8785873,7.81236129 L79.2735181,7.81236129 L79.2735181,12.4830194 C79.2735181,13.6957161 79.8935726,14.2720774 80.8419188,14.2720774 C81.790056,14.2720774 82.4101627,13.7197677 82.4101627,12.5430452 L82.4101627,7.81236129 L84.8051458,7.81236129 L84.8051458,12.4710452 C84.8051458,15.1846452 83.2368496,16.3733419 80.817566,16.3733419 C78.3982302,16.3733419 76.8785873,15.1605935 76.8785873,12.5311226 Z M69.9981622,16.2172387 L69.9981622,7.8123871 L72.3687926,7.8123871 L72.3687926,16.2172387 L69.9981622,16.2172387 Z M61.0279473,14.1520361 C62.4381596,14.1520361 63.3743817,13.3835716 63.3743817,12.0267716 L63.3743817,12.0027716 C63.3743817,10.658049 62.4381596,9.87761032 61.0279473,9.87761032 L60.0675292,9.87761032 L60.0675292,14.1520361 L61.0279473,14.1520361 Z M57.709023,7.81237161 L60.9915227,7.81237161 C64.030913,7.81237161 65.7936653,9.54135226 65.7936653,11.9667458 L65.7936653,11.9907974 C65.7936653,14.416191 64.0065603,16.2172232 60.942974,16.2172232 L57.709023,16.2172232 L57.709023,7.81237161 Z M45.2839682,12.5311226 L45.2839682,7.81236129 L47.6789513,7.81236129 L47.6789513,12.4830194 C47.6789513,13.6957161 48.2990058,14.2720774 49.2471952,14.2720774 C50.1954892,14.2720774 50.8155436,13.7197677 50.8155436,12.5430452 L50.8155436,7.81236129 L53.2105267,7.81236129 L53.2105267,12.4710452 C53.2105267,15.1846452 51.6421783,16.3733419 49.2228425,16.3733419 C46.8036634,16.3733419 45.2839682,15.1605935 45.2839682,12.5311226 Z M38.2407769,12.9033497 L37.292483,10.5139303 L36.3321171,12.9033497 L38.2407769,12.9033497 Z M36.1740856,7.75233032 L38.4474617,7.75233032 L42.0703251,16.2172077 L39.5416109,16.2172077 L38.9216087,14.7163561 L35.6391612,14.7163561 L35.0313354,16.2172077 L32.5512222,16.2172077 L36.1740856,7.75233032 Z M27.6589169,23.0107097 C27.9131575,23.446271 27.5946905,23.9903742 27.0855299,23.9900645 L20.46639,23.985729 L13.8603149,23.9814452 L8.5624945,23.9779355 C8.05343843,23.9775742 7.73565073,23.4331613 7.99046619,22.9979097 L10.54855,18.628671 C10.6668124,18.4266581 10.8852033,18.302271 11.1214667,18.3024258 L17.1330944,18.3064 C17.583777,18.3066581 17.8847895,17.8803871 17.7715963,17.4803355 C17.7569637,17.4284645 17.735642,17.3770581 17.7064814,17.3270452 L17.1970073,16.4541677 L14.4412272,11.732929 C14.2029779,11.3247226 13.6291728,11.2987097 13.3482278,11.6552516 C13.3294145,11.6792 13.3118554,11.7048 13.2958119,11.7322065 L12.889654,12.4259355 L10.2336366,16.9625032 C10.1153742,17.1644645 9.89693108,17.2888516 9.66071987,17.2886968 L4.55040523,17.2853419 C4.0412969,17.2849806 3.7235092,16.7405677 3.97832466,16.3053161 L6.68325661,11.6852387 L13.3034417,0.377832258 C13.5582572,-0.0574193548 14.1946164,-0.0570064516 14.448857,0.378554839 L17.9559665,6.38717419 L21.053887,11.6946323 L27.6589169,23.0107097 Z"
                    id="svg-audiusLogoHorizontal-3428fVv"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="flex items-center">
          {!playing ? (
            <button onClick={playTrack}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <button onClick={pauseTrack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <div className="flex flex-col text-xs ml-2">
            <span className="font-bold">{title}</span>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
