import React from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import Button from "@/components/atoms/Button/Button";
import TextBox from "@/components/atoms/TextBox/TextBox";
import SubTitle from "@/components/atoms/SubTitle/SubTitle";



export const OneToOneCall = () => {
    return (
     
        <div className="ooc-modal" id="ooc-panel">
        {/* <button className="close-btn" onclick="oocModal()"></button> */}
        <Button className="close-btn"></Button>
        <form>
            {/* <h3>
                One to One Video Call
                <span>Create Video-Call Room for Artist to Join on spot.</span>
            </h3> */}
            <SubTitle>
            One to One Video Call
                <span>Create Video-Call Room for Artist to Join on spot.</span>
            </SubTitle>

            {/* <h3>Duration of Call</h3> */}
            <SubTitle>Duration of Call</SubTitle>
            <div className="ooc-time-btns">
                <label htmlFor="ooc-time">
                    {/* <input type="radio" name="ooc-time" /> */}
                    <TextBox type="radio" name="ooc-time" />
                    <span>5 mins</span>
                </label>
                <label htmlFor="ooc-time">
                    <input type="radio" name="ooc-time" />
                    <span>10 mins</span>
                </label>
                <label htmlFor="ooc-time">
                    {/* <input type="radio" name="ooc-time" /> */}
                    <TextBox type="radio" name="ooc-time" />
                    <span>20 mins</span>
                </label>
                <label htmlFor="ooc-time">
                    {/* <input type="radio" name="ooc-time" /> */}
                    <TextBox type="radio" name="ooc-time" />
                    <span>30 mins</span>
                </label>
                <label htmlFor="ooc-time">
                    {/* <input type="radio" name="ooc-time" /> */}
                    <TextBox type="radio" name="ooc-time" />
                    <span>120 mins</span>
                </label>
            </div>

            <h3>Video Call Room Theme</h3>
            <div className="ooc-session">
                <div className="ooc-session-set">
                    {/* <input type="radio" name="ooc-session" /> */}
                    <TextBox type="radio" name="ooc-session" />

                    <label htmlFor="ooc-session">Regular</label>    
                    <span></span>
                </div>
                <div className="ooc-session-set">
                    {/* <input type="radio" name="ooc-session"> */}
                    <TextBox type="radio" name="ooc-session" />

                    <label htmlFor="ooc-session">Special</label>
                    <span></span>
                </div>
            </div>

            <div className="ooc-theme">
                <div className="ooc-theme-set">
                    {/* <input type="radio" name="ooc-theme"> */}
                    <TextBox type="radio" name="ooc-theme" />

                    <label htmlFor="ooc-theme">
                        Bikini Theme
                        <span><img src="img/fanory-token.png" width="26"/> +5000</span>
                    </label>
                </div>
                <div className="ooc-theme-set">
                    {/* <input type="radio" name="ooc-theme"> */}
                    <TextBox type="radio" name="ooc-theme" />

                    <label htmlFor="ooc-theme">
                        Bikini Theme
                        <span><img src="img/fanory-token.png" width="26"/> +5000</span>
                    </label>
                </div>
                <div className="ooc-theme-set">
                    {/* <input type="radio" name="ooc-theme"> */}
                    <TextBox type="radio" name="ooc-theme" />

                    <label htmlFor="ooc-theme">
                        Bikini Theme
                        <span>
                            {/* <img src="img/fanory-token.png" width="26"/>  +5000*/}
                            <Icon source={Icons.token} width="26" /> +5000
                            </span>
                    </label>
                </div>
            </div>

            <p className="note">Note - Creating video call room doesn’t gurantee joining of artist in the room, your coins will deduct only when artist joins the room. You’ll be notified when artist accpets your video call room request. In Video call room refrain from using obscene, derogatory, insulting & offensive language. Non compliance to this will result in rejection of your request and coins will not be refunded.</p>

            <div className="ooc-bottom">
                <span>
                    {/* <img src="img/fanory-token.png" width="40" /> +5000 */}
                    <Icon source={Icons.token} width="40" /> +5000
                    </span>
                {/* <button className="btn btn-primary">Create</button> */}
                <Button className="btn btn-primary">Create</Button>
            </div>
        </form>
    </div>
   
        
    );
}





