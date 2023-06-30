import React,{useEffect,useState} from "react";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { RWebShare } from "react-web-share";
import Routes from "@/constants/Routes";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

var arr:String[] = [];
 export const MediaFooter = ({item, theme, profile, storeLike, likes, loggedIn}) => {
     let router = useRouter();
     const [temparr, setTemparr] = useState([]);
 
  useEffect(() => {
    const cooks =  Cookies.get("likes");
      if(cooks){
        setTemparr(JSON.parse(cooks));
      }else{
        arr.length =0;
      }
  }, []);

     const handleLike =  () => {
        if (temparr.indexOf(item?._id) > -1) {
            return (
              <>
                <AiFillHeart fontSize={22} color={theme?.secondary_color} />
                <span>{loggedIn && item?.stats?.likes + 1}</span>
              </>
            );
          }

         if(Object.values(likes).indexOf(item?._id) > -1) {
            return (
                <>
                    <AiFillHeart fontSize={22} color={theme?.secondary_color} />
                    <span>{loggedIn && item?.stats?.likes + 1}</span>
                </>
            );
         }
         return  (
             <>
                 <AiOutlineHeart fontSize={22} />
                 <span>{item?.stats?.likes}</span>
             </>
         );
     }

     //function to store like on cookies
     const handleClick =(id)=>{
        if(temparr.length > 0){
            arr.push(`${id}`);
          const all = [...arr,...temparr];
            Cookies.set("likes", JSON.stringify(all), { expires: 2 });
        }else{
            arr.push(`${id}`);
            Cookies.set("likes", JSON.stringify(arr), { expires: 2 });
        }
      }
    return (
        <div className="post-footer">
        <div className="post-action" style={{color: theme?.text_color}} onClick={() => loggedIn && storeLike(item?._id) && handleClick(item?._id)}>
            {handleLike()}

        </div>
        <div className="post-action" style={{color: theme?.text_color}} onClick={() => router.push(Routes.comments(profile?.slug, item?._id))}>
            <HiOutlineChatBubbleOvalLeft fontSize={22} />
            <span>{item?.stats?.comments}</span>
        </div>      
            <div className="post-action" style={{color: theme?.text_color}}>
            <RWebShare
                data={{
                    text: item?.caption,
                    url: window.location.href,
                    title: item?.name,
                }}
                onClick={() => console.log("shared successfully!")}
            >
            <div>
                <AiOutlineShareAlt fontSize={22} />
                <span>{item?.stats?.shares}</span>
            </div>
            </RWebShare>
        </div>
    </div>
    );
}

