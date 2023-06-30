import React, {useState} from "react";
import { userService } from "@/containers/report/services";
import Toast  from "@/components/atoms/Toast";
import {faCheckCircle, faTimes} from "@fortawesome/free-solid-svg-icons";

export const ReportHideMedia = ({theme, item})=>{

    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [comment, setComment] = useState("");
    const [displayMessage, setDisplayMessage] = useState({error:false, message:""});
    const data = ['Sexual Content','Violent or Repulsive Content','Hateful & Abusive Content', 'Harmful or Dangerous Acts', 'Child Abuse', 'Promotes Terrorism', 'Spam or Misleading', 'Infringes My Rights']
    const handleOptionsClick = () => {
        setShowOptions(!showOptions);
    };

    const handleReportContent = () => {
        setShowOptions(!showOptions);
        setShowModal(true);
        setSelectedOption("");
      };
    
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
      }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        let payload={
            artist_id: item?.artist_id,
            entity_id : item?._id,
            tags: selectedOption,
            comment: comment ? comment : null,
            product: 'celebyte',
            v: '1.0',
            platform:process.env.NEXT_PUBLIC_PLATFORM,
        }
        userService.reportContent(payload,item?.artist_id).then(
            item=> setDisplayMessage({ error: item?.error, message: item?.message })
        ).then(()=> setTimeout(setDisplayMessage, 3000, { message: '', error: false}))
        setShowModal(false);
        setSelectedOption("");
        setComment("");
    };
    // const handleHideContent = () => {
    // // Logic for hiding content
    // }; 
    return(
        <div className="options" style={{ marginLeft: "auto", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <button onClick={handleOptionsClick} style={{ border: "none", background: "none", fontSize: "20px", color: theme?.text_color }}>
                &#8942;
            </button>
            {showOptions && (
                <div className="options-menu" style={{background: theme?.primary_color, color: theme?.text_color}}>
                    <button onClick={handleReportContent}>Report content</button>
                    {/* <button onClick={handleHideContent}>Hide content</button> */}
                </div>
            )}
            {showModal && (
                <div className="modal-report">
                    <div className="modal-report-content">
                        <div className="modal-header-report">
                            <span>Report Content</span>
                            <button className="close-button-report" onClick={() => setShowModal(false)}>X</button>
                        </div>
                    <div className="separator-report"></div>
                    {data?.map((item, idx) => 
                        <div className="radio-options-report" key={idx}>
                            <label>
                                <input type="radio" name="reportOption" value={item} onChange={() => handleOptionSelect(item)} />
                                {item}
                            </label>
                        </div>
                    )}
                    {selectedOption && 
                        <div className="modal-footer-report">
                            <div className="separator-report"></div> 
                            <text style={{fontSize:"12px"}}> Enter your comment for the reported content </text>
                            <textarea placeholder="Type your comment..." onChange={handleCommentChange} />
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    }
                </div>
            </div>)}
            {
                displayMessage?.message &&
                    <Toast
                        icon={!displayMessage?.error  ? faCheckCircle : faTimes}
                        title={!displayMessage?.error ? "Success": "Error"}
                        description={displayMessage?.message}
                    />
            }
        </div>
    );
} 