import React, { useEffect, useState } from "react";
import HamBurger from "@/components/molecules/HamBurger";
import Profile from "@/components/molecules/Profile";
import { Drawer } from "./Drawer";
import { upcomingLiveActions } from "@/containers/live/actions/upcoming";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/reducers";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { PopupModal } from "../PopupModal";

export const Header = ({
  id,
  title,
  menus,
  profile,
  theme,
  activeCode,
  noFooter,
  showtemp,
  headerstyle
}) => {
  const [openHamburger, setOpenHamburger] = useState(false);

  const dispatch = useDispatch();

  const upcomingLive = useSelector(
    (state: ApplicationState) => state.upcomingLive
  );
  
  // add overlay when sidebar is open
  if (openHamburger) {
    document.body.classList.add("sidebar-open");
  } else {
    document.body.classList.remove("sidebar-open");
  }

  useEffect(() => {
    if (id) {
      dispatch(upcomingLiveActions.fetchUpcomingLive(id));
    }
  }, [id]);

  const handleLive = () => {
    if (!upcomingLive.loading) {
      if (upcomingLive?.events?.list[0]?.live_status) {
        let isLive = upcomingLive?.events?.list[0]?.live_status;
        if (isLive === "ongoing") {
          return <Profile profile={profile} theme={theme} />;
        }
      }
    }
    return (
    <div className="user-btn"> 
          <a href="https://www.celebprime.com/" target="_blank" rel="noopener noreferrer">
            <Image src='/images/celebprime-logo.png.jpeg' alt="CelebPrime Logo" width={30} height={30} />
          </a>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const handleLiveBtn = document.querySelector('.user-btn');
      const hamburgersign = document.querySelector('.side-menu-btn');

      if (theme?.template === 'template-2' && showtemp && !openHamburger) {
        const header = document.querySelector('header');
        const artist = document.querySelector('.artist-container');

        if (scrollTop > 0) {
          header.style.height = '56px';
          artist.style.zIndex = '2';
          handleLiveBtn.style.marginBottom = '0px';
        } else {
          header.style.height = '96px';
          artist.style.zIndex = '4';
          handleLiveBtn.style.marginBottom = '10px';
        }
      } else if (theme?.template === 'template-1' && showtemp && !openHamburger) {
        const header = document.querySelector('header');
        const homescreen = document.querySelector('.temphomeScreen');
        const swiper = document.querySelector('.swiper.banner-slider');
        const title = document.querySelector('.header-title');
        if (header && homescreen && swiper && title && handleLiveBtn && hamburgersign) {
          if (scrollTop > 0) {
            header.style.height = '56px';
            homescreen.style.marginTop = '0px';
            swiper.style.zIndex = '1';
            title.style.marginTop = '32px'; // Adjust the margin-top value as needed
            handleLiveBtn.style.marginBottom = '0px';
            hamburgersign.style.marginBottom = '0px';
          } else {
            header.style.height = '163px';
            homescreen.style.marginTop = '-87px';
            swiper.style.zIndex = '3';
            title.style.marginTop = '-15px'; // Adjust the margin-top value as needed
            handleLiveBtn.style.marginBottom = '50px';
            hamburgersign.style.marginBottom = '45px';
          }
        } 
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showtemp, openHamburger, theme]);

  return (
    <>
      <header style={noFooter ? {background: "#292929"} : headerstyle}>
      <HamBurger
            setOpenHamburger={setOpenHamburger}
            theme={theme}
            noFooter={noFooter}
            showtemp={showtemp}
          />
        <div
          className={showtemp ? "header-wrapper-temp" : "header-wrapper"}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h3
            style={{color: theme?.primary_color, width: "100%"}}
            className={showtemp ? "header-title" : noFooter ? `letter` : ''}
          >
            {showtemp && theme?.template === 'template-1' ? profile.first_name + " " + profile.last_name: showtemp && theme?.template === 'template-2' ? '' : theme?.template === '' ? title : ''} 
            {!showtemp && theme?.text_color && title } 
          </h3>
          {(title === 'directline'||title=== 'Video call ') && <center style={{ color: theme?.text_color,fontSize:"10px"}}>{profile?.date_diff_for_human && `Last Seen: ${profile?.date_diff_for_human}`}</center>}
        </div>
        {/* <span style={{ position: 'absolute', top: '1.2rem', right: '1.5rem' }}>
                {title === 'directline' && <FontAwesomeIcon icon={faVideo} size="xl" 
                onClick={openModal} 
                />}
            </span> */}
        {handleLive()}
      </header>
      <Drawer
        openHamburger={openHamburger}
        setOpenHamburger={setOpenHamburger}
        menus={menus}
        profile={profile}
        theme={theme}
        activeCode={activeCode}
      />
    </>
  );
};
