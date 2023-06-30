import React, {useState, useEffect} from "react";
import { MenuHeader, MenuBody, MenuItem} from "@/components/molecules/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/index";

export const Drawer = ({openHamburger, setOpenHamburger, menus, profile, theme, activeCode}) => {

    const { loggedIn } = useAuth();
    const [auth, setAuth] = useState(false);

    useEffect(() => setAuth(loggedIn), [loggedIn])

  const getMenus =() => {
    return menus.menus.list?.map((menu: any) => {
            return (
                <MenuItem menu={menu} profile={profile} key={menu._id} theme={theme} activeCode={activeCode} />
            )
        });
    }

    const showBalance = () => {
      if(auth) {
          return (
              <MenuBody theme={theme} loggedIn={loggedIn} profile={profile} />
          )
      }
    }

  return (
        <>
            <div className={openHamburger ?  "sidebar open" : 'sidebar'} id="sidebar-nav" style={{background: theme?.primary_color}}>
                <div className="sidebar-inner">
                    <FontAwesomeIcon className="sidebar-close" icon={faArrowLeft} onClick={() => setOpenHamburger(false)}  style={{color: theme?.text_color}}/>
                    <MenuHeader theme={theme} loggedIn={loggedIn} profile={profile} />
                    {showBalance()}
                    <div className="sidebar-nav">
                        {menus.loading ? <div>Loading.....</div> : getMenus() }
                    </div>
                    <center style={{ color: theme?.text_color }}>
                        {`${profile?.first_name} ${profile?.last_name}`} <br />
                        {`Last Seen: ${profile?.date_diff_for_human}`} <br />
                        Powered By: <a style={{ display: "inline", textDecoration: "underline" }} href="https://www.celebprime.com/" target="_blank" rel="noopener noreferrer">CelebPrime</a>
                    </center>
                </div>
            </div>
        </>
    );
}
