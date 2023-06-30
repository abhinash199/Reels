import React  from "react";


const SubTitle = ({className, children, style}) => {
    return (
        // <input className={className} />
        <h3 className={className} style={style}>{children}</h3>

    );
}

export  default SubTitle;



