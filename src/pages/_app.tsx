import React from 'react';
import '../assets/css/override.css';
import { Provider } from 'react-redux';
import { ModalProvider } from "react-modal-hook";
import { Store } from '../store';
import {AuthContext, ArtistProvider, WalletProvider} from '@/context/index';
import 'swiper/swiper.min.css';
import Cookies from "js-cookie";
import withDeviceType from "@/hoc/withDeviceType";

function App({ Component, pageProps }) {

    let cookie = Cookies.get("FNSID");
    let loggedIn = !(cookie === undefined || cookie === null || cookie === "");

    return (
        <Provider store={Store}>
            <ArtistProvider>
                <AuthContext.Provider value={{loggedIn}}>
                    <WalletProvider>
                        <ModalProvider>
                            <Component {...pageProps} />
                        </ModalProvider>
                    </WalletProvider>
                </AuthContext.Provider>
            </ArtistProvider>
        </Provider>
    );
}

export default withDeviceType(App);
