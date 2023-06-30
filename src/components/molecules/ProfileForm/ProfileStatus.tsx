import React from "react";

export const ProfileStatus = ({getProfileStatus, theme}) => {

       return (
        <>
        <div className="profile-status">
            <p style={{color: theme?.text_color}}>Percent Profile Completed</p>
            <div className="progress-bar">
                <div className="barfill" style={{width: getProfileStatus(), background: theme?.secondary_color}} />
            </div>
            <span className="percent-fig" style={{color: theme?.text_color}}>{getProfileStatus()}</span>
        </div>

        <p className="profile-info" style={{color: theme?.text_color}}>Complete your profile along with verifying your Email ID and number (If you aren't verified yet) And we credit coins straight into your account!</p>
         </>
   );

}




