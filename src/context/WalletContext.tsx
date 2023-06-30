import React, {useEffect, useState, createContext, useContext} from "react";
import {Network} from '@/partials/index';
import { useArtist, useAuth } from "@/context/index";

interface WalletContextInterface {
    coins: number,
    updateCoins:(newCoins: number) => void;
}

export const WalletContext = createContext<WalletContextInterface | null>(null);

export const WalletProvider = ({ children }) => {

    const [wallet, setWallet] = useState({coins: 0,});

    const { id } = useArtist();
    const { loggedIn } = useAuth();

    useEffect( () => {
        if(id && loggedIn) {
            fetchWallet().then(r => '');
        }
    }, [id, loggedIn]);

    const fetchWallet = async () => {
        return  await Network.getWithLogin('customers/getcoinsxp', id)
            .then(response => {
                if(response?.data) {
                   let { coins } = response?.data;
                    setWallet({
                        coins: coins,
                    });
                }
            })
            .catch(error => {
                setWallet({coins: 0,});
            })
    }

    // Function to update coins value
    const updateCoins = (newCoins:number) => {
        
        setWallet(prevWallet => ({
            ...prevWallet,
            coins: newCoins,
        }));
    };

    const walletContextValue = {
        coins: wallet.coins,
        updateCoins: updateCoins, // Include the updateCoins function in the context value
    };

    return (
        <WalletContext.Provider value={walletContextValue}  >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    return useContext(WalletContext);
}
