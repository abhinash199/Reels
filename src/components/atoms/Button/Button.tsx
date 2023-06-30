
import React  from "react";

const Button = ({children, className, onClick, type, style}) => {

    return (
        <button className={className} onClick={onClick} type={type} style={style}>{children}</button>
    );
}

export default Button;

