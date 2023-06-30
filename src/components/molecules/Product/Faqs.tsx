import React from "react";
import SubTitle from "@/components/atoms/SubTitle/SubTitle"



export const Faqs = () => {
    return (
     
      <>

          {/* <h3>FAQs:</h3> */}
          <SubTitle>FAQs:</SubTitle>
            <ul className="pd-faqs">
                <li>
                    {/* <h3>How will it get delivered ?</h3> */}
                    <SubTitle>How will it get delivered ?</SubTitle>
                    <p>Our team will be in touch with you over the mentioned email / phone for delivery address.</p>
                </li>
                <li>
                    {/* <h3>How secure is this ?</h3> */}
                    <SubTitle>How secure is this ?</SubTitle>
                    <p>100 percent secure. Our special creator only knows about it. We are committed for secrecy.</p>
                </li>
                <li>
                    {/* <h3>Is COD available ?</h3> */}
                    <SubTitle>Is COD available ?</SubTitle>
                    <p>Unfortunately due to Co-Vid 19 restrictions we are not accepting COD.</p>
                </li>
            </ul>
      </>
   
        
    );
}





