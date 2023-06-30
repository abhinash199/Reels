import React, {useEffect, useState} from "react";
import { MainLayout } from "@/components/organisms/Layouts";
import TextArea from "@/components/atoms/TextArea/index";
import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/Button/Button";
import {bookGreetingActions} from "@/containers/fanobyte/actions/book";
import { useArtist } from "@/context/index";
import Toast from "@/components/atoms/Toast";
import {faCheckCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Routes from "../../../constants/Routes";
import {useRouter} from "next/router";
import TextBox from "@/components/atoms/TextBox/TextBox";
import Countries from "@/constants/Countries";
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Icon from "@/components/atoms/Icon/Icon";
import {Icons} from "@/constants/Icons";

interface VideoCallRequestsProps {}

const FanoByteBooking: React.FC<VideoCallRequestsProps> = () => {

    let router = useRouter();
    const [inputs, setInputs] = useState({
        message: "",
        contact_number: "",
    });

    const [errors, setErrors] = useState({errorMessage: '', error: false});
    const [success, setSuccess] = useState({successMessage: '', success: false});

    const { id, profile, theme, fanoBytePrice } = useArtist();

    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
    const [country, setCountry] = useState('+91');
    const [pvt, setPvt] = useState(false);
    const [terms, setTerms] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        name === 'contact_number' ? (value.length <=10 && setInputs((inputs) => ({ ...inputs, [name]: value }))) :  setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = () => {
        if(inputs?.message === ''){
            setErrors({errorMessage: 'Please write your message.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        } else if(inputs?.message.length <= 19) {
            setErrors({errorMessage: 'Message should contain at least 20 characters.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        } else if(inputs?.contact_number === '') {
            setErrors({errorMessage: 'Please enter your mobile number.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        } else if(inputs?.contact_number.length !== 10) {
            setErrors({errorMessage: 'Mobile number should contain only 10 digits.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        }  else if(terms === false) {
            setErrors({errorMessage: 'Please agree to terms and conditions before proceedings.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        } 
         else {
            setErrors({errorMessage: '', error: false});
            let formattedDob = new Date(date);
            let rawDate = formattedDob.getFullYear()+'-'+("0" + (formattedDob.getMonth() + 1)).slice(-2)+'-'+("0" + (formattedDob.getDate())).slice(-2);
            let payload = {
                artist_id: id,
                from_mobile : inputs?.contact_number,
                schedule_at : rawDate,
                message: inputs?.message,
                from_mobile_code: country,
                make_private : pvt
            }

            bookGreetingActions.bookGreeting(id, payload).then(response => {
                setErrors({errorMessage: 'Booking done successfully', error: true});
                router.push(Routes.fanoByteRequests(profile?.slug));
            });
        }
    }

    const showCountries = () => {
        openModal();
    }

    const displayCountries = () => {
        return Countries.map(item => {
            return (
                <li onClick={() => [setCountry(item?.dial_code), closeModal()]}>
                    <span>{item?.name}</span>
                    <span>{item?.dial_code}</span>
                </li>
            )
        });
    }
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "90%",
            padding: "0",
            transform: "translate(-50%, -50%)",
            height: '70vh',

        },
    };

    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false} id={'login-code'}>
            <div className="modal">
                <div>
                    <div
                        className="close"
                        onClick={(e) => {
                            closeModal()
                        }}
                    >
                        X
                    </div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Select Countries
                            </h4>
                        </div>
                        <div className="modal-body">
                            <ul>
                                {displayCountries()}
                            </ul>
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), []);

    return (
        <MainLayout title="Request For Greeting">
            <div className="vc-booking fanobyte">
                <div className="form-group">
                    <Text><h3 className="subheading" style={{color: theme?.text_color}}>Write message</h3>
                    </Text>
                    <TextArea  className="profile-text-area" value={inputs?.message} onChange={handleChange} name="message" rows={6} placeholder={'Ex: I Want You To Wish Me On My Birthday!'}/>
                </div>

                <div className="form-group" style={{color: theme?.text_color}}>
                    <Text><h3 className="subheading" style={{color: theme?.text_color}}>Date</h3></Text>
                    <DatePicker onChange={setDate} value={date} minDate={new Date(new Date().setDate(new Date().getDate() + 7))} name="dob" format={"dd-MM-yyyy"} clearIcon={null} />
                    <div className="notes" style={{color: theme?.text_color}}>Mention 7-8 days earlier</div>
                </div>

                <div className="form-group">
                    <Text><h3 className="subheading" style={{color: theme?.text_color}}>Contact Number</h3></Text>
                    <div className="fano-byte-contact" style={{border: "2px "+theme?.secondary_color+" solid"}}>
                        <label className="c-code" onClick={() => showCountries()}>{country}</label>
                        <TextBox type={"number"} value={inputs?.contact_number} placeholder={"Enter phone number"}  className="ph-no" onChange={(event) => handleChange(event)} theme={theme?.text_color} name="contact_number" />
                    </div>
                </div>

                    <div className="btn-wrap" onClick={(e) => handleSubmit()}>
                        <Button className="btn btn-primary" type="submit" style={{backgroundColor: theme?.secondary_color, color: theme?.text_color, width: '100%'}}>
                            <span className="request-button">REQUEST NOW @ {fanoBytePrice}</span>
                            <span className="request-button"><Icon source={Icons.token} width="25"/></span>
                        </Button>
                    </div>

                <div className="form-group frow space-between checks">
                    <label className="tnc">
                        <input type="checkbox" name="tnc" value={terms} style={{borderColor: theme?.secondary_color}} onChange={(event) => setTerms(!terms)} />
                        {/* <span style={{color: theme?.text_color}} onClick={()=>router.push(Routes.termsUse)}>Terms &amp; Conditions</span> */}
                        <a href={Routes.termsUse} target="_blank" rel="noopener noreferrer" style={{color: theme?.text_color, textDecoration: "underline", marginLeft:"10px"}} >Terms &amp; Conditions</a>
                    </label>
                    <label className="pvt">
                        <input type="checkbox" name="private" value={pvt} onChange={(event) => setPvt(!pvt)} style={{borderColor: theme?.secondary_color}} />
                        <span style={{color: theme?.text_color}}>Make it Private</span>
                    </label>
                </div>

                <div className="form-group instructions" style={{color: theme?.text_color}}>
                    Note - While sending your requests refrain from using obscene, derogatory, insulting and offensive language. Non compliance to this will result in rejection of your request and coins will not be refunded.
                </div>
                <div className="form-group">{/*keep this for bottom space*/}</div>

                {errors?.error ? (
                    <Toast
                        icon={errors?.errorMessage === 'Booking done successfully' ? faCheckCircle:faTimes}
                        position="bottom-right"
                        title={errors?.errorMessage === 'Booking done successfully' ?"Success": "Error"}
                        description={errors?.errorMessage}
                    />
                ) : (
                    ""
                )}
            </div>
        </MainLayout>
    );
};

export default AuthMiddleware(FanoByteBooking);
