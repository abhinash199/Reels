import React from "react";

const Icon = ({source, title = '', className = '', width='', height=''}) => {
    return (
        <img src={source} alt={title} title={title} className={className} width={width} height={height}/>
    );
}

export  default Icon;
