import React,{useState} from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { BiLocationPlus } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import styles from "../[creator]/Demo/demo.module.css"
import BottomAction from "./BottomAction";
function ImageFooter({IsOpen,setIsOpen}) {
  const [isOpen, setisOpen] = useState(false);
  const [isMoreClicked, setisMoreClicked] = useState(false)

 
  const about = "Manish Maheshwari is an Indian technology entrepreneur and executive. His technology ventures have focused on building solutions that improve the lives of the masses in emerging markets. He is Co-Founder ofFanory, acreator monetization platfor"
  //const initialPosts = slice(about, 0, index);


  
  return (
    <>
    <div className={styles["videoFooter"]}>
      <div className={styles["videoFooter__text"]}>
       
        <div className={styles["profile-section"]}>
          <div className={styles["profile-main"]}>
            <div className={styles["profile-img-footer"]}>
              <img
                src={
                  "https://d2szg1fmkfepzj.cloudfront.net/p/artistprofile/thumb-1667034051.jpeg"
                }
                alt={""}
              />
            </div>
            <p className={styles["creator-name"]}>Creator Name</p>
            <p className={styles["visit-btn"]}>Visit Profile</p>
          </div>
          <div className={styles["profile-desc-new"]}>
            <p style={{ margin: "0px" }}>
              {about.split(" ").slice(0, 10).join(" ") + " "}
               {isMoreClicked ? about.split(" ").slice(10).join(" ") : ""} 
               <span onClick={() => setisMoreClicked(!isMoreClicked)}>
                {isMoreClicked ? "... less" : "... more"}
              </span> 
            </p>
            <span>view 10 comments</span>
          </div>
        </div>
      </div>

      <div className="videoFooter__actions">
       
        <div
          className={styles["my-icon"]}
          style={{ opacity: IsOpen ? "0.2" : "1" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ margin: "10px 0px" }}>
              <a href={`${window.location.origin}/shivangi-verma/video-call`}>
                <AiOutlineHeart fontSize={22} color={"#fff"} />
              </a>
              <p className={styles["views-count"]}>39.k</p>
            </div>

            <div style={{ margin: "10px 0px" }}>
              <a
                href={`${window.location.origin}/shivangi-verma/video-call`}
                style={{ margin: "10px 0px" }}
              >
                <BsShare fontSize={22} color={"#fff"} />
              </a>
              <p className={styles["views-count"]}>39.k</p>
            </div>

            <div style={{ margin: "10px 0px" }}>
              <a
                href={`${window.location.origin}/shivangi-verma/video-call`}
                style={{ margin: "10px 0px" }}
              >
                <FaRegCommentDots fontSize={22} color={"#fff"} />
              </a>
              <p className={styles["views-count"]}>39.k</p>
            </div>

            <div style={{ margin: "10px 0px" }}>
              <BiLocationPlus
                fontSize={22}
                color={"#fff"}
                onClick={() =>setIsOpen(!IsOpen)}
                style={{ margin: "10px 0px", cursor: "pointer" }}
              />

              <p className={styles["views-count"]}>39.k</p>
            </div>
          </div>
        </div>
      </div>
      {IsOpen ? <BottomAction  IsOpen = {IsOpen} setIsOpen = {setIsOpen}/>:""}
    </div>
      
      </>
  );
}

export default ImageFooter;
