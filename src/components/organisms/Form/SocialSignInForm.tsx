import React from "react";
import dynamic from 'next/dynamic';

const FBButton = dynamic(() => import("@/components/atoms/Button/FBButton"), {
    ssr: false
})
const GoogleButton = dynamic(() => import("@/components/atoms/Button/GoogleButton"), {
    ssr: false
})

export const SocialSignInForm = ({theme, profile, destination}) => {

    return (
        <>
            <h3 className="line-heading" style={{ borderColor: theme?.secondary_color, color: theme?.text_color}}><span>Other Platforms</span></h3>
            <style jsx global>
                {`
                  .line-heading::after, .line-heading::before {
                    border-bottom: ${'2px solid ' + theme?.text_color};
                    }
                `}
            </style>
            <div className="social-links">
                <FBButton profile={profile} destination={destination} />
                <GoogleButton profile={profile} destination={destination} />
            </div>
        </>
    );
}
