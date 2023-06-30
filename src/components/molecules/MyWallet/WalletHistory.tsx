import React, {useState} from "react";
import Icon from "@/components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import SubTitle from "@/components/atoms/SubTitle/SubTitle"
import Loader from "@/components/atoms/Loader";
import {FiLoader} from "react-icons/fi";
import CopyButton from "@/components/atoms/CopyButton/CopyButton";
import Button from "@/components/atoms/Button/Button";

export const WalletHistory = ({passbook, username, theme, setElement}) => {
    //display: display ? 'block' : 'none'
    const [display, setDisplay] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("all");

    const handleDescription = (item) => {
        switch (item?.entity) {
            case 'photo':
                return `Paid For Photo On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'video':
                return `Paid For Video On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'videocalls':
                return `Paid For Video Call Request On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'messages':
                return `Paid For Directline Request On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'live':
                return `Paid For Live Request On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'gifts':
                return `Paid For Gift On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'shoutouts':
                return `Paid For Shoutout Greeting Request On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            case 'products':
                return `Paid For Product On ${item?.artist?.first_name + ' '+ item?.artist?.last_name}`;
                break;
            default:
                return '';
        }
    }

    const handlePassbook = () => {
        return passbook[username as string]?.passbook.map((item, index:number) => {
            if (selectedOption !== "all" && item.txn_type !== selectedOption) {
                return null; // Skip the item if it doesn't match the selected option
              }
            return (
                <div className="mw-history-set" key={item._id+index}>
                    <div onClick={() => setDisplay(!display)}>
                        <h4 className="mw-date" style={{color: theme?.text_color}}>{item.created_at}</h4>
                        <p className="mw-get-msg" style={{color: theme?.text_color}}>
                            {handleDescription(item)}
                            <span className="mw-get-coin" style={{color: theme?.text_color}}>
                                <Icon source={Icons.token} width="20" />{item.coins}
                                <em className="angle">></em>
                            </span>
                        </p>
                    </div>
                    <span className="mw-msg-his" style={{color: theme?.text_color}}>
                            TxnID: {item._id} <CopyButton text={item._id} style={{color: theme?.text_color}} />
                            {/* <Icon source={Icons.copy} width="20" /> */}
                        </span>

                    <p className="mw-his-acc-info" style={{color: theme?.text_color}}>
                        <span className="mw-msg-his" style={{color: theme?.text_color}}>
                            Before Txn Coin Balance: {item.coins_before_txn}  <Icon source={Icons.token} width="20" />
                        </span>
                        <span className="mw-msg-his" style={{color: theme?.text_color}}>
                            After Txn Coin Balance: {item.coins_after_txn}  <Icon source={Icons.token} width="20" />
                        </span>
                    </p>
                </div>
            )
        });
    }

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
      };

    const handleOptionClick = (option:string) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
       <>
        <div className='history-wrap'>
            <SubTitle className="mw-history-heading" style={{color: theme?.text_color}}>History
                 <Button style={{background: theme?.text_color}} onClick={handleButtonClick}>
                   <Icon source={Icons.filter} width="24" />
                 </Button>
                 {isOpen && (
                    <div className="hw-dropdown">
                        <a href="#" onClick={() => handleOptionClick("added")}>Added</a>
                        <a href="#" onClick={() => handleOptionClick("paid")}>Spending</a>
                        <a href="#" onClick={() => handleOptionClick("received")}>Received</a>
                        <a href="#" onClick={() => handleOptionClick("all")}>All</a>
                    </div>
        )}
            </SubTitle>
        </div>
            <div className="mw-history">
                {handlePassbook()}
                <span ref={setElement}> <div className={'copyright-text'}>
            <FiLoader fontSize={25} />
        </div></span>
            </div>
       </>
    );
}





