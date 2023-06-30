import React from "react";
import {ProfilePic, ProfileStatus, ProfileInput} from "@/components/molecules/ProfileForm";

 export const EditProfilePage =({first_name, last_name, email, mobile, gender, dob, setDob, handleChange, handelFormSubmit, theme, avatar, setAvatar, profilePic, showError}) => {

    const getProfileStatus  = () => {
        let count = 0;
        if(first_name) {count = count + 1}
        if(last_name) {count = count + 1}
        if(email) {count = count + 1}
        if(mobile) {count = count + 1}
        if(gender) {count = count + 1}
        if(dob) {count = count + 1}
        if(avatar) {count = count + 1}
        let percentage = count/7*100;
        return Math.floor(percentage) + '%';
    }

    return (
         <>
             <div className="editProfileWrap">
                <ProfileStatus getProfileStatus={getProfileStatus} theme={theme} />
                <ProfilePic theme={theme} avatar={avatar} setAvatar={setAvatar} profilePic={profilePic} />
                <ProfileInput first_name={first_name} last_name={last_name} email={email} mobile={mobile} gender={gender} dob={dob} setDob={setDob} handleChange={handleChange} handelFormSubmit={handelFormSubmit} theme={theme} showError={showError} />
             </div>
         </>
   );
}







