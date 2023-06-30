import React, {useEffect} from "react";
import { MainLayout} from "@/components/organisms/Layouts";
import {Profile} from "@/components/organisms/Profile";
import { profileActions } from "@/containers/profile/actions";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import {useArtist} from "../../../context";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../../store/reducers";
import Loader  from "@/components/atoms/Loader";

 const MyProfile = () =>{

     const { id, profile, theme, android_app_link } = useArtist();
     const dispatch = useDispatch();

     const user = useSelector((state: ApplicationState) => state.profile);

     useEffect(() => {
         if(id) {
             dispatch(profileActions.fetchProfile(id));
         }
     },[id]);

    return (
        <MainLayout title={'My Profile'} customClass={'profile-container'}>
            {user.loading ? <Loader /> :  <Profile user={user?.user} theme={theme} profile={profile} android_app_link={android_app_link} /> }
        </MainLayout>
    );
}

export default AuthMiddleware(MyProfile);
