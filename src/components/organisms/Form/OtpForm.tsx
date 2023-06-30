import React from "react";
import OtpInput from 'react-otp-input';
import Button from "@/components/atoms/Button/Button";

export const OtpForm = ({input, setInput, verifyOtp, error, mobileNumber, errorMobile, resendOtp, theme, mobileCode}) => {

    const handleInput = (event) => {
        setInput(event)
    };

    const handleMaskNumber = () => {
        if(mobileNumber) {
           return  mobileCode+'xxxxxxxx'+mobileNumber.slice(-2);
        }
    }

    return (
        <div>
            <form onSubmit={verifyOtp}>
                <p className="head-info" style={{color: theme?.secondary_color}}>OTP sent to your mobile number {handleMaskNumber()}, kindly enter it below</p>
                <div className="otp-inputs">
                   <OtpInput
                   numInputs={6}
                   inputStyle={'otp-input-box'}
                   separator={<span className={'otp-separator'} />}
                   value={input}
                   onChange={(event) => handleInput(event)}
                   isInputNum={true}
                   autofocus
                  />

                </div>
                {error.error ? <div className={'error'} style={{color: theme?.text_color}}>{error.errorMessage}</div> : <></> }
                <div className="resend-otp"  onClick={resendOtp} style={{color: theme?.secondary_color}}>Resend OTP</div>
                <button className="btn btn-primary" type={'submit'} style={{background: theme?.secondary_color, color: theme?.primary_color}} onClick={verifyOtp}>
                    Verify
                </button>
            </form>
            <style jsx global>
                {`
                    .otp-inputs input {
                        border-color: ${theme?.secondary_color};
                    }
                `}
            </style>
        </div>
    );
}


