import React from "react";
import Toast from "@/components/atoms/Toast"
import {faCheckCircle, faTimes} from "@fortawesome/free-solid-svg-icons";

export const ProfilePic = ({theme, avatar, setAvatar, profilePic}) => {

    const hiddenFileInput = React.useRef(null);
    const [error, setError] = React.useState("");

    function handleChange(e) {
        
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setAvatar(file);
            setError("Profile photo updated successfully");
            setTimeout(()=>setError(""), 3000);
        }   else {
            setError("Please select a valid image file.");
            setTimeout(()=>setError(""), 3000);
      }
    }

    const handleClick = event => {
        hiddenFileInput.current.value = ""; 
        hiddenFileInput.current.click();
    };

    return (
        <>
            <div className="form-group">
                <label style={{color: theme?.text_color}}>Add Profile Photo
                    <span className="info-tooltip" title="Tooltip text"></span>
                </label>
                <div className="edit-profile-pic valid">
                    <figure onClick={(e) => handleClick(e)}>
                        { avatar ? <img src={URL.createObjectURL(avatar)} alt="" title="" /> : <img src={profilePic} alt="" title=""  />}
                    </figure>
                    <span className="checked" onClick={(e) => handleClick(e)} />
                    <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{display: "none"}} accept="image/*" />
                    <h3 style={{color: theme?.text_color}}>Other Fans can't see you, but celebrity can!</h3>
                </div>
            </div>
            {error && <Toast
                icon={ error === "Profile photo updated successfully"? faCheckCircle : faTimes}
                position="bottom-right"
                title={ error === "Profile photo updated successfully" ? "Success" : "Error" }
                description={ error }
            />}
        </>
    );
}

