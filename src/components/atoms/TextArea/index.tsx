import React  from "react";

const TextArea = ({placeholder, className, value, onChange, name, disabled, rows}) => {
    return (
        <textarea placeholder={placeholder} className={className} value={value} onChange={onChange} name={name} disabled={disabled} rows={rows}/>
    );
}

export  default TextArea;



