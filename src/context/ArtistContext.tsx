import React, {useEffect, useState, createContext, useContext} from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {Network} from '@/partials/index';

interface ArtistContextInterface {
    id: string,
    profile: {
        slug: string;
    },
    theme: {},
    videoCallIntro: string,
    android_app_link: string,
    videoCallPrice: [],
    directLinePrice: string,
    fanoByteIntro: string,
    fanoBytePrice: string,
}

export const ArtistContext = createContext<ArtistContextInterface | null>({
    id: 'string',
    profile: {
        slug: 'string',
    },
    theme: {},
    videoCallIntro: 'string',
    android_app_link: 'string',
    videoCallPrice: [],
    directLinePrice: 'string',
    fanoByteIntro: 'string',
    fanoBytePrice: 'string',
});

export const ArtistProvider = ({ children }) => {

    let router = useRouter();
    let username = router.query.creator;

    const [artist, setArtist] = useState({
        id: '',
        profile: {},
        theme: {},
        videoCallIntro: '',
        android_app_link: '',
        videoCallPrice: [],
        directLinePrice: 0,
        fanoByteIntro: '',
        fanoBytePrice: 0,
    });

    useEffect( () => {
        if (router.asPath !== router.route) {
            fetchArtist().then(r => '');
        }
    }, [router]);

    const fetchArtist = async () => {
        let artistSlug = Cookies.get('FNAID');
       if(artistSlug !== username || artist.id === '') {
           return  await Network.get('customers/artistconfigbyslug?artist='+username)
               .then(response => {
                   if(response?.data) {
                       let { artistconfig } = response?.data;
                       setArtist({
                           id: artistconfig?.artist_id,
                           profile: artistconfig?.artist,
                           theme: artistconfig?.theme,
                           videoCallIntro: artistconfig?.private_video_call?.intro_video,
                           videoCallPrice: artistconfig?.private_video_call?.ratecard,
                           android_app_link: artistconfig?.android_app_download_link,
                           directLinePrice:  artistconfig?.direct_line?.coins,
                           fanoByteIntro : artistconfig?.shoutout?.how_to_video,
                           fanoBytePrice : artistconfig?.shoutout?.greeting_coins,
                       });
                       Cookies.set("FNAID",artistconfig?.artist?.slug, { expires: 180, path: "/" });
                   }

               })
               .catch(error => {
                   setArtist({
                       id: '',
                       profile: {},
                       theme: {},
                       videoCallIntro: '',
                       android_app_link: '',
                       videoCallPrice: [],
                       directLinePrice: 0,
                       fanoByteIntro: '',
                       fanoBytePrice: 0,
                   });
               })
       }
    }

    return (
        <ArtistContext.Provider value={artist}>
            {children}
        </ArtistContext.Provider>
    );
}

export function useArtist() {
    return useContext(ArtistContext);
}
