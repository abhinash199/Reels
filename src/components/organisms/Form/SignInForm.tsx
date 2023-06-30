import React from "react";
import InputField from "@/components/molecules/InputField";

export const SignInForm = ({input, setInput, getOtp, error, theme, country, setCountry}) => {

    const handleInput = (event) => {
        const input = event.target.value;
        const parsedValue = parseInt(input);
        if ((isNaN(parsedValue) ? input : parsedValue) === '' || (typeof parsedValue === 'number' && input.length <= 10)) {
            setInput(input);
        }
    };

    return (
        <form onSubmit={getOtp}>
            <div className="login-input">
                <InputField placeholder="Enter your mobile number" type="number" className="ph-no" value={input} required onChange={(event) => handleInput(event)} theme={theme} setCountry={setCountry} country={country} />
            </div>
            {error.error ? <div className={'error'} style={{color: theme?.text_color}}>{error.errorMessage}</div> : <></> }
            <button className="btn btn-primary" type={'submit'} style={{background: theme?.secondary_color, color: theme?.primary_color}}>
                Next
            </button>
        </form>
    );
}
