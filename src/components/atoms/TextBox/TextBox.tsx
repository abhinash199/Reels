import React  from "react";

const TextBox = ({type, placeholder, className, value, onChange, name, disabled, theme}) => {  
    return (
        <input type={type} placeholder={placeholder} className={className} value={value} onChange={onChange} name={name} disabled={disabled} style={{color: theme?.text_color,fontSize:"16px"}}  />
    );
}

export  default TextBox;



