import React, {useState} from "react";
import SubTitle from "@/components/atoms/SubTitle/SubTitle"
import TextBox from "@/components/atoms/TextBox/TextBox"
import Button from "@/components/atoms/Button/Button"
import Countries from "@/constants/Countries";
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";
import Toast from "@/components/atoms/Toast";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {purchaseGreeting} from "@/containers/transactions/actions/greeting";
import Routes from "@/constants/Routes";

export const DeliveryForm = ({item, theme, id, profile}) => {

    const [country, setCountry] = useState('+91');
    const [errors, setErrors] = useState({errorMessage: '', error: false});
    const [success, setSuccess] = useState({successMessage: '', success: false});

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

    const [inputs, setInputs] = useState({
        name: "",
        contact_number: "",
        email: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputs?.name === ''){
            setErrors({errorMessage: 'Please enter your name.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        } else if(inputs?.contact_number === '') {
            setErrors({errorMessage: 'Please enter your number.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});
        }  else if(inputs?.email === '') {
            setErrors({errorMessage: 'Please enter your email.', error: true});
            setTimeout(setErrors, 3000, {errorMessage: '', error: false});

        }  else {
            setErrors({errorMessage: '', error: false});
            let payload = {
                product_id: item?._id,
                artist_id: id,
                delivery_mobile  : country+inputs?.contact_number,
                delivery_name : inputs?.name,
                delivery_email : inputs?.email,
                delivery_place: 'home',
                delivery_pincode: 0,
                delivery_address: 'home',
                coins: item?.coins,
                v: '1.0',
                ip: "103.41.32.91",
                platform: process.env.NEXT_PUBLIC_PLATFORM,
            }

            console.log(payload);

           purchaseGreeting(id, payload).then(response => {
               if(response?.error_messages) {
                   setErrors({errorMessage: response?.error_messages[0], error: true});
                   setTimeout(setErrors, 3000, {errorMessage: '', error: false});
               } else {
                 setErrors({errorMessage: 'Booking done successfully', error: true});
                   setTimeout(setErrors, 3000, {errorMessage: '', error: false});
                  router.push(Routes.wardrobeOrders(profile?.slug));
               }
           });
        }
    }

    return (
      <>
        <form className="pd-form">
                <SubTitle>
                Deliver To:
                    <span>(Enter Correct Details For Communication)</span>
                </SubTitle>

                {/* <input type="text" placeholder="Name" /> */}
                <TextBox type="text" placeholder="Name" name={'name'} value={inputs?.name} onChange={(event) => handleChange(event)} />
                <div className="pd-phone">
                    <div className="fano-byte-contact">
                        <label className="c-code" onClick={() => showCountries()}>{country}</label>
                        <TextBox type={"number"} placeholder={"Phone Number"}  className="ph-no" onChange={(event) => handleChange(event)} theme={theme} name="contact_number" />
                    </div>
                </div>
                <TextBox type="text" placeholder="Email" name={'email'} value={inputs?.email} onChange={(event) => handleChange(event)} />
                <p>By clicking buy you agree to the
                <a href={Routes.termsUse} target="_blank" rel="noopener noreferrer" style={{color: theme?.text_color, textDecoration: "underline", marginLeft:"5px"}} >TnC</a>.
                </p>
                {/* <button className="btn btn-primary wd-100 d-block">BUY NOW</button> */}
                {item?.outofstock === 'no' ?  <Button className="btn btn-primary wd-100 d-block" style={{color:theme?.secondary_color}} onClick={(e) => handleSubmit(e)}>BUY NOW</Button> : <Button className="btn btn-primary wd-100 d-block" style={{color:theme?.secondary_color}} onClick={(e) => handleSubmit(e)}>BUY NOW</Button> }
            </form>
          {errors?.error ? (
              <Toast
                  icon={faCheckCircle}
                  position="bottom-right"
                  title="Success"
                  description={errors?.errorMessage}
              />
          ) : (
              ""
          )}
      </>
    );
}





