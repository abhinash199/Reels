import React, { useEffect, useState } from "react";
import { Header, TabBar } from "@/components/organisms/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/reducers";
import { menuActions } from "@/containers/menu/actions";
import { useArtist } from "@/context/ArtistContext";
import Icon from "@/components/atoms/Icon/Icon";
import { BsFillShareFill } from "react-icons/bs";
import { MdVideoCall } from "react-icons/md";
import { RWebShare } from "react-web-share";
import { Icons } from "@/constants/Icons";
import Button from "@/components/atoms/Button/Button";
export const MainLayout = ({
  title,
  children,
  customClass = "",
  activeCode = "",
  noFooter,
}) => {
  const menu = useSelector((state: ApplicationState) => state.menu);
  const dispatch = useDispatch();

  const { id, profile, theme } = useArtist();
  const ishome = typeof window !== "undefined" &&
      window.location.pathname.split("/").length === 2 &&
      window.location.pathname.split("/")[1]
      ? true
      : false; 
  const layout: string = theme.template ? theme.template : '';

  var temp1style = {
    height: "163px",
    backgroundColor: theme?.secondary_color,
  };

  const temp2style = {
    height: "96px",
    background:  profile?.photo?.cover !== undefined && theme?.secondary_color,
    // backgroundImage: `url(${
    //     profile.photo !== undefined ? profile.photo.cover : ""
    //   })`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
  };

  const defaultstyle = {
    height: "56px",
    backgroundColor: theme.secondary_color,
  };

  function SwitchCase() {
    switch (layout as any) {
      case "template-1":
        return (
            <Header
              id={id}
              title={title}
              menus={menu}
              theme={theme}
              profile={profile}
              activeCode={activeCode}
              noFooter={noFooter}
              showtemp={ishome}
              headerstyle={ishome ? temp1style : defaultstyle}
            />
        );

      case "template-2":
        return (
            <Header
              id={id}
              title={title}
              menus={menu}
              theme={theme}
              profile={profile}
              activeCode={activeCode}
              noFooter={noFooter}
              showtemp={ishome}
              headerstyle={ishome ? temp2style : defaultstyle}
            />
        );

      default:
        return (
            <Header
              id={id}
              title={title}
              menus={menu}
              theme={theme}
              profile={profile}
              activeCode={activeCode}
              noFooter={noFooter}
              showtemp={false}
              headerstyle={defaultstyle}
            />
        );
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(menuActions.fetchMenu(id));
    }
  }, [id]);

  return (
    <>
      <SwitchCase />
      <div
        className={layout !== "" && ishome && theme?.template === 'template-1' ? "temphomeScreen" : ishome && theme?.template === 'template-2' ? ' ': "homeScreen"}
      >
        <div
          className={"container " + customClass}
          style={{
            background: noFooter
              ? "#292929"
              : (layout === 'template-2' || layout === 'template-1') 
              ? theme?.primary_color
              : "#F5F5F5",
            //   paddingTop:"10px",
          }}
        >
          {ishome &&  layout === 'template-2' ? (
            <div className="artist-container">
              <div className="fix-item">
                <div className="artist-img">
                  <Icon source={profile.picture} alt={""} />
                </div>
                <div className="all-icon">
                  <div className="share-icon">
                    <RWebShare
                      data={{
                        url: window.location.href,
                        title: `${profile?.first_name} ${profile.last_name}`,
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <div>
                        <BsFillShareFill fontSize={22} color={"#8C8C8C"} />
                        {/* <span>{item?.stats?.shares}</span> */}
                      </div>
                    </RWebShare>
                  </div>

                  <div className="share-icon">
                    <a href = {`${window.location.origin}/${profile.slug}/direct-line`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 513 513"
                      fill="#8C8C8C" 
                    >
                      <path
                        d="M1.14893 276.5C0.944336 212.666 1.04663 148.833 1.04663 84.8967C1.04663 62.4936 18.5395 42.6478 41.045 39.6812C45.3415 39.0674 49.7403 38.6582 54.1391 38.6582C157.767 38.6582 261.496 38.6582 365.226 38.6582C388.039 38.6582 409.01 54.0028 412.692 78.1451C413.102 81.1117 413.613 84.1807 413.613 87.1473C413.715 150.163 413.715 213.178 413.613 276.193C413.613 297.778 396.734 317.215 375.865 320.591C372.08 321.204 368.193 321.613 364.306 321.613C296.482 321.716 168.406 321.716 100.582 321.613C96.6949 321.613 93.8306 322.636 91.3755 325.603C81.8618 336.958 72.2458 348.211 62.6298 359.464C55.1621 368.159 47.4898 376.65 39.9197 385.345C36.1347 389.744 32.8612 394.552 26.7233 396.495C13.7315 400.485 0.944336 391.585 0.944336 377.877C0.944336 360.896 0.944336 344.221 0.944336 327.547L1.14893 276.5ZM27.3371 356.599C27.8486 356.906 28.3601 357.315 28.8716 357.622C30.2015 355.883 31.5313 354.144 32.9635 352.507C38.9991 345.449 45.0346 338.493 50.9679 331.434C58.3333 322.739 65.6987 313.941 73.0642 305.246C78.486 298.903 84.3169 294.811 93.7283 294.914C164.007 295.323 294.743 295.016 365.022 295.323C376.581 295.323 387.425 284.582 387.425 273.022C387.118 211.95 387.118 150.776 387.425 89.7047C387.527 74.0532 377.195 65.1533 362.669 65.1533C259.144 65.2556 155.618 65.1533 52.1955 65.1533C51.1725 65.1533 50.1495 65.051 49.1265 65.1533C36.7485 66.1763 27.3371 75.1785 27.4394 87.5565C27.644 149.549 27.5417 211.439 27.5417 273.431L27.3371 356.599Z"
                        fill="#8C8C8C"
                      />
                      <path
                        d="M486.441 349.544C486.441 305.965 486.441 262.386 486.441 218.807C486.441 200.905 486.441 183.003 486.441 165.203C486.441 153.439 477.336 142.698 464.958 142.698C456.775 142.698 451.557 136.867 451.66 128.785C451.762 121.727 457.593 116.714 465.368 116.305C487.464 115.282 508.946 133.593 511.811 155.485C512.322 158.963 512.834 162.441 512.834 166.022C512.936 227.503 512.731 288.984 512.936 350.465L511.913 423.096C511.913 434.144 511.913 445.192 511.913 456.343C511.913 464.833 508.026 470.357 500.251 473.017C491.556 475.984 482.758 473.835 477.95 467.902C472.324 461.048 466.493 454.297 460.662 447.545C450.33 435.576 440.1 423.505 429.768 411.536C426.904 408.263 424.244 404.682 420.868 401.818C419.027 400.283 416.162 399.363 413.707 399.363C353.965 399.261 233.766 399.26 174.024 399.26C164.306 399.26 159.088 393.839 159.498 384.223C159.702 378.596 165.329 372.97 170.955 372.868C181.696 372.765 192.437 372.868 203.179 372.868C255.964 372.868 369.105 372.97 421.891 372.663C429.154 372.663 434.064 375.323 438.463 380.438C449.409 393.225 460.457 405.91 471.505 418.595C475.904 423.607 480.098 428.825 485.622 433.53C485.622 428.211 485.622 422.891 485.622 417.469L486.441 349.544Z"
                        fill="#8C8C8C"
                      />
                      <path
                        d="M210.248 226.485L246.052 245.308C250.553 247.661 255.77 243.876 254.952 238.863L248.098 199.069C247.791 197.125 248.405 195.08 249.837 193.647L278.787 165.413C282.47 161.833 280.424 155.695 275.412 154.979L235.413 149.148C233.367 148.841 231.73 147.613 230.81 145.772L212.908 109.559C210.657 104.955 204.11 104.955 201.86 109.559L184.06 145.772C183.139 147.613 181.4 148.841 179.456 149.148L139.458 154.979C134.445 155.695 132.399 161.935 136.082 165.413L165.032 193.647C166.465 195.08 167.181 197.125 166.771 199.069L159.918 238.863C159.099 243.876 164.316 247.661 168.817 245.308L204.622 226.485C206.361 225.564 208.509 225.564 210.248 226.485Z"
                        fill="#8C8C8C"
                      />
                    </svg>
                    </a>
                  
                  </div>
                  <div className="share-icon">
                  <a href = {`${window.location.origin}/${profile.slug}/video-call`}>
                    <MdVideoCall fontSize={22} color={"#8C8C8C"} />
                    </a>
                  </div>
                  <div className="share-icon" style={{width:"42px"}} >
                  <a href = {`${window.location.origin}/${profile.slug}/recharge`}>
                  <Icon source={Icons.bronze} title="bronze" />
                  </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 style = {{color: theme?.text_color}}>
                  {profile.first_name !== undefined &&
                  profile.last_name !== undefined
                    ? profile.first_name + " " + profile.last_name: ""}
                    <span style={{fontSize:"10px", marginLeft:'10px', fontStyle:'italic'}} > {profile?.date_diff_for_human && `Last Seen: ${profile?.date_diff_for_human}`}</span>
                </h3> 
                <p className="artist-des" style = {{color: theme?.text_color, margin: "0px" }}>
                  {profile?.about_us}
                </p>
              </div>
            </div>
          ) : (
             ""
          )}

          {children}
        </div>
      </div>
     
      {noFooter ? null : (
        <TabBar
          menus={menu}
          theme={theme}
          profile={profile}
          activeCode={activeCode}
        />
      )}
    </>
  );
};
