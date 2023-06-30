import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout} from "@/components/organisms/Layouts";
import { ApplicationState } from "../../store/reducers";
import { useArtist } from "@/context/ArtistContext";
import {RechargePage} from "@/components/organisms/RechargePage"
import {transactionActions} from "@/containers/transactions/actions/recharge";
import Loader  from "@/components/atoms/Loader";

const Recharge = () => {

    const { id, profile, theme } = useArtist();
    const dispatch = useDispatch();

    const packages = useSelector((state: ApplicationState) => state.recharge);

    useEffect(() => {
        //if(id) {
            dispatch(transactionActions.recharge('5ea04b9b633890041137d062'));
        //}
    },[])

    return (
        <MainLayout title={'Recharge'}>
            {packages.loading ? <Loader /> :  <RechargePage packages={packages} theme={theme} id={id} profile={profile} /> }
        </MainLayout>
    );
}


export default Recharge;
