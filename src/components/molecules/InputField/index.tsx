import React, {useState} from "react";
import TextBox from "@/components/atoms/TextBox/TextBox";
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";
import Countries from "@/constants/Countries";

const InputField = ({value, onChange, className, placeholder, type, theme, country, setCountry}) => {

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

  return (
    <>
        <div className="login-input" style={{border: "2px "+theme?.secondary_color+" solid", backgroundColor: theme?.primary_color}}>
            <label className="c-code" onClick={() => showCountries()} style={{color: theme?.text_color}}>{country}</label>
            <TextBox type={type} placeholder={placeholder} className={className} onChange={onChange} value={value} theme={theme} />
            <style jsx global>
                {`
                  ::placeholder {
                    color: ${theme?.text_color};
                    opacity: 1;
                    }
                
                    :-ms-input-placeholder {
                        color: ${theme?.text_color};
                    }
                    ::-ms-input-placeholder {
                        color: ${theme?.text_color};
                    }
                `}
            </style>
        </div>
    </>
  );
}


export default InputField;
