import React,{useRef,useEffect}from "react";
import { BsChatSquareText } from "react-icons/bs";
import Icon from "@/components/atoms/Icon/Icon";
import {Icons} from "@/constants/Icons";
import styles from "../[creator]/Demo/demo.module.css"
function BottomAction({ IsOpen,setIsOpen }) {
  console.log(IsOpen,"action");



//   const ref = useRef(null);
//  // const { onClickOutside } = props;

//   useEffect(() => {
//     const handleClickOutside = (event) => {
    
//       console.log(ref.current.contains(event.target),"ref");
//       console.log(event.target);
//       console.log(ref.current,"curr");
      
//       if (ref.current && !ref.current.contains(event.target)) {
//         // onClickOutside && onClickOutside();
//         setIsOpen(!IsOpen)
//       }
//     };
//     document.addEventListener('click', handleClickOutside, true);
//     return () => {
//       document.removeEventListener('click', handleClickOutside, true);
//     };
//   }, []);

const catMenu = useRef<any>(null)
// useEffect(() => {

//   const closeOpenMenus = (e)=>{
//     console.log(catMenu.current,"current ref");
//     console.log(e.target,"target value");
//     console.log(catMenu.current.contains(e.target),"contain");
    
    
    
//     if(catMenu.current  && !catMenu.current.contains(e.target)){
//       setIsOpen(false);
//     }
//   }
//   document.addEventListener('mousedown',closeOpenMenus);
  

  
// }, [])


  return (

    <section  style={{height:"auto"}}>

   
    <div className={styles["bottom-action"]} ref={catMenu}>
      <div className={styles["bottom-separator"]} onClick={() => setIsOpen(!IsOpen)}>
        <span
          style={{ border: "3px solid #000", width: "50px", marginTop: "10px",borderRadius:"4px"}}
        ></span>
      </div>
      <div className={styles["creator-connect"]}  >Connect with Abhinash</div>
      <div className={styles["creator-action"]}>
        <div className={styles["book-vc"]}>
          <div style={{ display: "flex" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="23"
              viewBox="0 0 24 23"
              fill="none"
            >
              <path
                d="M22.9 7.95564C22.2246 7.61336 21.4133 7.6847 20.808 8.13963L18.975 9.50064C18.7151 6.94727 16.5666 5.00388 14 5.00064H13.915L9.79303 0.879625C9.23208 0.314734 8.46816 -0.00185951 7.67203 0.000624863H0.999984C0.447703 0.000624863 0 0.448375 0 1.00066C0 1.55294 0.447703 2.00064 0.999984 2.00064H7.67198C7.93706 2.00134 8.19112 2.10663 8.379 2.29366L11.086 5.00064H5.00002C2.23997 5.00397 0.00332812 7.24061 0 10.0007V18.0007C0.00332812 20.7607 2.23997 22.9974 5.00002 23.0006H14C16.5666 22.9974 18.7151 21.054 18.975 18.5006L20.805 19.8647C21.6886 20.5274 22.9423 20.3483 23.605 19.4647C23.8646 19.1185 24.005 18.6974 24.005 18.2647V9.74364C24.0076 8.98572 23.5791 8.2923 22.9 7.95564ZM17 18.0006C17 19.6575 15.6569 21.0006 14 21.0006H5.00002C3.34317 21.0006 2.00002 19.6575 2.00002 18.0006V10.0007C2.00002 8.34381 3.34317 7.00066 5.00002 7.00066H14C15.6569 7.00066 17 8.34381 17 10.0007V18.0006ZM22 18.2576L19 16.0217V11.9797L22 9.74369V18.2576Z"
                fill="black"
              />
            </svg>
            <span style={{ marginLeft: "12px" }}>Book VideoCall</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "12px" }}>14000</span>
            <Icon source ={Icons.smcoins} style={{width:"30px!important"}} />
          </div>
        </div>
        <div className={styles["creator-chat"]}>
          <div style={{ display: "flex" }}>
            <BsChatSquareText fontSize={22} fill="#000" />
            <span>Chat</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "12px" }}>90</span>
            <Icon source ={Icons.smcoins} style={{width:"30px!important"}} />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default BottomAction;
