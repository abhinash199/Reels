import React from "react";

const Text = ({children, theme, className}) => {
    return (
        <label style={{color: theme?.text_color}} className={className}>{children}</label>
    );
}

export  default Text;
