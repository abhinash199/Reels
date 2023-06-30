import React, {useEffect} from "react";
import { WalletPage} from "@/components/organisms/WalletPage";
import {transactionActions} from "@/containers/transactions/actions/wallet";
import {useArtist} from "../../context";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store/reducers";
import {useRouter} from "next/router";
import Loader  from "@/components/atoms/Loader";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Button from "@/components/atoms/Button/Button";
import Routes from "@/constants/Routes";

 const Wallet = () => {
    
     let router = useRouter();
     let username = router.query.creator;

     const [element, setElement] = React.useState(null);

     const { id, profile, theme } = useArtist();
     const dispatch = useDispatch();

     const passbook = useSelector((state: ApplicationState) => state.passbook);

     useEffect(() => {
         if (router.asPath !== router.route) {
             const currentElement = element;
             const currentObserver = new IntersectionObserver(
                 (entries) => {
                     const first = entries[0];
                     if (first.isIntersecting) {
                         if(id) {
                             dispatch(transactionActions.passbook(username, id));
                         }
                     }
                 },
                 { threshold: 0.5 }
             );

             if (currentElement) {
                 currentObserver.observe(currentElement);
             }

             return () => {
                 if (currentElement) {
                     currentObserver.unobserve(currentElement);
                 }
             };

         }
     }, [id, element]);

    return (
        <>
            <header style={{background: theme?.secondary_color}}>
                <Button className="side-menu-btn" onClick={() => router.push(Routes.home(profile?.slug))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>
                </Button>
                <h3 style={{color: theme?.primary_color}}>Wallet</h3>
                <div className="user-btn"> </div>
            </header>
            <div className='container wallet-container' style={{background: theme?.primary_color}}>
                {passbook.loading ? <Loader /> :  <WalletPage passbook={passbook} username={username} theme={theme} profile={profile} setElement={setElement} />}
            </div>
        </>
    );
}

export default AuthMiddleware(Wallet);
