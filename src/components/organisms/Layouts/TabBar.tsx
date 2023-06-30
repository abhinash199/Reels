import React, { useEffect,useState} from "react";
import SVG from "react-inlinesvg";
import Icon from "@/components/atoms/Icon/Icon";
import Welcome_popup from "./Welcome_popup";
export const TabBar = ({ menus, profile, theme, activeCode }) => {
  const [newUser, setNewUser] = useState<any|null>({});

  const getSlug = (menu) => {
    if (menu?.code === "home") {
      return "/" + profile?.slug;
    } else {
      if (menu?.slug === "photos" || menu?.slug === "videos") {
        return "/" + profile?.slug + "/" + menu?.slug;
      } else if (menu?.code === "photos") {
        return "/" + profile?.slug + "/" + "photos/" + menu?.slug;
      } else if (menu?.code === "videos") {
        return "/" + profile?.slug + "/" + "videos/" + menu?.slug;
      }  else if (menu?.code === "directline") {
        return "/" + profile?.slug + "/" + menu?.slug;
      }  else if (menu?.code === "shoutout") {
        return "/" + profile?.slug + "/" + menu?.slug;
      } 
      else {
        return "/" + profile?.slug + "/" + menu?.slug;
      }
    }
  };

  const showActiveState = (menu) => {
    if (menu?.code === "home" && activeCode == "home") {
      return theme?.secondary_color;
    } else {
      if (activeCode == menu?.slug) {
        return theme?.secondary_color;
      } else {
        return theme?.text_color;
      }
    }
  };

  const getMenus = () => {
    return menus.menus.list?.map((menu: any, index) => {
        return (
          <div key={menu._id}>
            <a href={getSlug(menu)} style={{ color: showActiveState(menu), margin:"0 4vw", width:"13vw"}}>
              <span>
                <SVG
                  src={menu?.web_icon}
                  width={30}
                  height={30}
                  color={showActiveState(menu)}
                />
              </span>
              {menu?.name}
              {/*theme?.text_color*/}
            </a>
          </div>
        );   
    });
  };
 
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("new_user") || "null");
    if (user && user.new_user !== undefined) {
      setNewUser(user);
    }
  }, []);

  return (
    <>
      <footer style={{ background: theme?.primary_color ? theme?.primary_color : "white", overflowX: "scroll", whiteSpace: "nowrap" }}>
        {menus.loading ? <div>Loading.....</div> : getMenus()}
      </footer>
      {(!menus?.loading && newUser && (newUser?.rewardNameUpdate === false || newUser?.firstname === 'Superfan' || newUser?.firstname === "" )) ? (
        <Welcome_popup user={newUser} /> 
        ) : (
        " "
      )}
    </>
  );
};
//,overflow:"auto"