import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitch,
  faTwitter,
  faDiscord,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faCalendarAlt, faTimes, faUsers } from "@fortawesome/free-solid-svg-icons"

// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined;
  height: number | undefined;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [isMobile, setIsMobile] = useState<Boolean>(true);
  const windowSize: Size = useWindowSize();

  useEffect(() => {
    if (windowSize.width)
      setIsMobile(windowSize.width < 768);
  }, [windowSize]);

  return (
    <div className="navbar">
      <div className="content">
        <div className="title">
          <a href="/">
            <span className="logo"></span>
            <h1>AusSpeedruns</h1>
          </a>
        </div>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen.valueOf()}>
          { !isOpen ? (
          <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faTimes} />
          )}
          <span className="sr-only">Menu</span>
        </button>
        { isMobile ? (<div className="break"></div>
        ) : ''}

        <nav className={`main-menu ${isOpen ? 'menu-open' : 'menu-closed'}`} aria-label="Main menu">
          <ul>
            <li>
              <a href="http://schedule.ausspeedruns.com">
                { isMobile ? (<FontAwesomeIcon icon={faCalendarAlt} />) : '' }
                <span className="text">Schedule</span>
              </a>
            </li>
            {/* <li><a href="//incentives.ausspeedruns.com">Incentives</a></li> */}
            <li>
              <a href="#participate">
                { isMobile ? (<FontAwesomeIcon icon={faUsers} />) : '' }
                <span className="text">Get Involved</span>
              </a>
            </li>
            <li className="social">
              <a href="//www.twitch.tv/ausspeedruns">
                <FontAwesomeIcon icon={faTwitch} />
                <span className={`text ${isMobile ? '' : 'sr-only'}`}>Follow us on Twitch</span>
              </a>
            </li>
            <li className="social">
              <a href="//twitter.com/ausspeedruns">
                <FontAwesomeIcon icon={faTwitter} />
                <span className={`text ${isMobile ? '' : 'sr-only'}`}>Follow us on Twitter</span>
              </a>
            </li>
            <li className="social">
              <a href="//youtube.com/ausspeedruns">
                <FontAwesomeIcon icon={faYoutube} />
                <span className={`text ${isMobile ? '' : 'sr-only'}`}>Subscribe to AusSpeedruns on Youtube</span>
              </a>
            </li>
            <li className="social">
              <a href="http://discord.ausspeedruns.com/">
                <FontAwesomeIcon icon={faDiscord} />
                <span className={`text ${isMobile ? '' : 'sr-only'}`}>Join us on Discord</span>
              </a>
            </li>
            {/* <li><a className="button secondary" href="//fundraise.beyondblue.org.au/asm2021">Donate</a></li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

// Hook
function useWindowSize(): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default Navbar;
