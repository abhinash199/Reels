import React, {useState} from "react";
import Icon from "@/components/atoms/Icon/Icon";
import SubTitle from "@/components/atoms/SubTitle/SubTitle";
import { Icons } from "@/constants/Icons";
import { useWallet } from "@/context/WalletContext";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import Routes from "../../constants/Routes";
import Link from 'next/link';
import {Helper} from "../../partials";
import { getEmailOtp, verifyEmailOTP } from "@/containers/profile/actions/update";
import {useAuth} from "../../context";
import {useRouter} from "next/router";

export const RechargePage = ({id, packages, theme, profile}) => {

    const { coins } = useWallet();
    const { loggedIn } = useAuth();

    const router  = useRouter();

    const [record, setRecord] = useState(null);
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [errorEmail, setErrorEmail] = useState({error: false, errorMessage: 'Please enter a valid email id.'});
    const [errorOTP, setErrorOTP] = useState({error: false, errorMessage: 'Please enter a valid OTP.'});

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "90%",
            padding: "0",
        },
    };

    // const requestOTPModal = () => {

    //     let emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if(!email.match(emailExp)){
    //         setErrorEmail({error: true, errorMessage: 'Please enter a valid email id.'});
    //     } else {
    //         setErrorEmail({error: false, errorMessage: ''});
    //         let payload = {
    //             identity:'email',
    //             email:email,
    //             activity:'verify'
    //         };
    //         getEmailOtp(id, payload).then(res => {
    //             if(res?.status_code === 200){
    //                 closeEmailModal();
    //                 openOTPModal();
    //                 setErrorEmail({error: true, errorMessage: 'OTP sent successfully.'});
    //             } else {
    //                 setErrorEmail({error: true, errorMessage: 'Failed sending OTP.'});
    //             }
    //         });
    //    }
    // }

    // const verifyEmail = () => {

    //     if(otp !== ''){
    //         let payload = {
    //             identity:'email',
    //             email: email,
    //             activity:'verify',
    //             otp: otp,
    //         };

    //         verifyEmailOTP(id,payload).then(response => {
    //             if(response) {
    //                 fetchUser().then(user => {
    //                     if(user) {
    //                         // let encodePayload = {
    //                         //     'first_name' : user?.first_name,
    //                         //     'last_name' : user?.last_name,
    //                         //     'avatar' : user?.avatar,
    //                         //     'id' : user?.id,
    //                         //     'email' : email,
    //                         //     'email_verified' : true,
    //                         //     'mobile' : user?.mobile,
    //                         //     'mobile_code' : user?.mobile_code,
    //                         //     'mobile_verified' : user?.mobile_verified,
    //                         // }
    //                         // let encodedData = Helper.encode(encodePayload, { expiresIn: "365 days" });
    //                         // Helper.setCookie('FNUID', encodedData, { expires: 365, path: "/" });
    //                         // setErrorOTP({error: true, errorMessage: 'Email verified successfully.'});
    //                         // closeOTPModal();
    //                         let rechargeURL = process.env.NEXT_PUBLIC_RECHARGE_URL;
    //                         let packageId = record?._id;
    //                         let redirect = 'https://www.celebprime.com/'+profile?.slug;
    //                         let encode = Buffer.from(redirect).toString('base64');
    //                         window.location.href = rechargeURL+'?uid='+user?.id+'&package_id='+packageId+'&referral='+encode+'&aid='+id;
    //                     }
    //                 });
    //             } else {
    //                 setErrorOTP({error: true, errorMessage: 'Please enter a valid OTP.'});
    //             }
    //         })
    //     } else {
    //         setErrorOTP({error: true, errorMessage: 'Please enter a valid OTP.'});
    //     }
    // }

    const [openEmailModal, closeEmailModal] = useModal(() => (
            <ReactModal isOpen style={customStyles} ariaHideApp={false}>
                <div className="modal">
                    <div>
                        <div

                            className="close"
                            onClick={(e) => {
                                closeEmailModal()
                            }}
                        >
                            X
                        </div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                     EMAIL VERIFICATION
                                </h4>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Enter you email ID below.
                                </p>
                                <div className={'form-group'}>
                                    <input placeholder="Enter email ID" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={'profile-text-area'} />
                                </div>
                                { errorEmail?.error ? <span className="danger" style={{color: theme?.secondary_color}}>{errorEmail?.errorMessage}</span> : ''}
                            </div>
                            <div className="modal-footer">
                                <div className={'recharge-email-verify'}>
                                    <button
                                        style={{backgroundColor: theme?.secondary_color, color: theme?.text_color}}
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            // requestOTPModal()
                                        }}
                                        data-dismiss="modal"
                                    >
                                        GET OTP
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {closeEmailModal(); setEmail('')}}
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>
    ), [errorEmail, theme, email]);

    // const [openOTPModal, closeOTPModal] = useModal(() => (
    //     <ReactModal isOpen style={customStyles} ariaHideApp={false}>
    //         <div className="modal">
    //             <div>
    //                 <div

    //                     className="close"
    //                     onClick={(e) => {
    //                         closeOTPModal()
    //                     }}
    //                 >
    //                     X
    //                 </div>
    //                 <div className="modal-content">
    //                     <div className="modal-header">
    //                         <h4 className="modal-title">
    //                             EMAIL VERIFICATION
    //                         </h4>
    //                     </div>
    //                     <div className="modal-body">
    //                         <p>
    //                             Enter you OTP below.
    //                         </p>
    //                         <div className={'form-group'}>
    //                             <input placeholder="Enter OTP" type="text" value={otp} onChange={(e) => setOTP(e.target.value)} className={'profile-text-area'} />
    //                         </div>
    //                         { errorOTP?.error ? <span className="danger" style={{color: theme?.secondary_color}}>{errorOTP?.errorMessage}</span> : ''}
    //                     </div>
    //                     <div className="modal-footer">
    //                         <div className={'recharge-email-verify'}>
    //                             <button
    //                                 style={{backgroundColor: theme?.secondary_color, color: theme?.text_color}}
    //                                 type="button"
    //                                 className="btn btn-primary"
    //                                 onClick={() => {
    //                                     // verifyEmail()
    //                                 }}
    //                                 data-dismiss="modal"
    //                             >
    //                                 VERIFY OTP
    //                             </button>
    //                             <button
    //                                 type="button"
    //                                 className="btn btn-secondary"
    //                                 onClick={() => {closeOTPModal(); setOTP('')}}
    //                             >
    //                                 CANCEL
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </ReactModal>
    // ), [errorOTP, theme, otp]);

    const [openModalCoins, closeModalCoins] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal">
                <div>
                    <div

                        className="close"
                        onClick={(e) => {
                            closeModalCoins()
                        }}
                    >
                        X
                    </div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                What are Fanocoins ?
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="fano-coins-popup">
                                <p>1. You can use your coins as you please to purchase content or gifts.</p>
                                <p>2. Coins can also get you XP points</p>
                                <p>3. XP points are loyalty points based on your likes, comments and purchase history.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), []);

    const fetchUser = async () => {
        return await Helper.decode(Helper.userToken());
    }

    const getPurchaseModal = (item) => {
        if(!loggedIn) {
            return router.push(Routes.login(profile?.slug));
        } 
        else {
        fetchUser().then(user => {
            // if(user?.email === '' || !user?.email_verified) {
            //     setEmail('');
            //     setOTP('');
            //     setErrorEmail({error: false, errorMessage: ''});
            //     setErrorOTP({error: false, errorMessage: ''});
            //     openEmailModal();
            // } else {
                let rechargeURL = process.env.NEXT_PUBLIC_RECHARGE_URL;
                let emailId = user?.email;
                let packageId = item?._id;
                let redirect = 'https://www.celebprime.com/'+profile?.slug;
                let encode = Buffer.from(redirect).toString('base64');
                // window.location.href = rechargeURL+'?email='+emailId+'&package_id='+packageId+'&referral='+encode;
                window.location.href = rechargeURL+'?uid='+user?.id+'&package_id='+packageId+'&referral='+encode+'&aid='+id;
            // }
        });
    }
    }

    const handlePackages = () => {
        return packages?.packages.map(item => {
           return (
               <div className="recharge-list" key={item?._id}>
                   <p style={{color: theme?.text_color}}>
                       <strong>{item?.coins} {item?.silver_coins ? '+ '+item?.silver_coins : '' }</strong> Fanocoins
                       {item?.offer ? <span style={{color: theme?.text_color}}>Buy now and <i>SAVE 10%</i></span> : '' }
                   </p>
                   <div className="rech-price yellow" onClick={() => { getPurchaseModal(item); setRecord(item) }}>
                       ₹{item?.price}/-
                   </div>
               </div>
           )
        });
    }

    return (
        <div className="recharge-wrap">
            <div className="recharge-header">
                <div className="acc-ballance">
                    <SubTitle>Account Balance</SubTitle>
                    <div className="status-point">
                        <Icon source={Icons.token}/>
                        {coins}
                    </div>
                    <div onClick={() => openModalCoins()}>What are Fanocoins?</div>
                </div>
            </div>
            {/*<div className="rech-offer">*/}
            {/*    <Icon source={Icons.stopWatch}/> <strong>50% off</strong> if you purchase before midnight!*/}
            {/*</div>*/}
            <hr className="re-hr"/>
            <div className="recharge-listing">
                {handlePackages()}
            </div>

            <div className="recharge-tc">
                <p style={{color: theme?.text_color}}>Coins not credited? <Link href="https://web.whatsapp.com/send?phone=918591656635" target="_blank"  style={{color: theme?.secondary_color}}>Enquire Now!</Link></p>
                <p className="tc" style={{color: theme?.text_color}}>For more details visit our <Link href={Routes.termsUse} target="_blank" style={{color: theme?.text_color}}>Terms</Link> and <Link href={Routes.privacyPolicy} target="_blank" style={{color: theme?.text_color}}>Privacy Policy</Link>.</p>
            </div>

        </div>
    );
}

