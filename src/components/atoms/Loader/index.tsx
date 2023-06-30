import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
    return (
        <div className={'loading-spinner copyright-text'}>
            <FiLoader fontSize={25} />
        </div>
    );
}

export  default Loader;
