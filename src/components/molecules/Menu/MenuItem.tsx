import React from "react";
import SVG from "react-inlinesvg";

export const MenuItem = ({menu, profile, theme, activeCode}) => {

    const getSlug = () => {
        if(menu?.code === 'home') {
            return '/'+profile?.slug;
        } else {
            if(menu?.slug === 'photos' || menu?.slug === 'videos') {
                return '/'+profile?.slug+'/'+menu?.slug;
            } else if(menu?.code === 'photos') {
                return '/'+profile?.slug+'/'+'photos/'+menu?.slug;
            } else if(menu?.code === 'videos') {
                return '/'+profile?.slug+'/'+'videos/'+menu?.slug;
            } else {
                return '/'+profile?.slug+'/'+menu?.slug;
            }
        }
    }

    const showActiveState = (menu) => {
        if(menu?.code === 'home' && activeCode == 'home') {
            return theme?.secondary_color;
        } else {
            if(activeCode == menu?.slug) {
                return theme?.secondary_color;
            } else {
                return theme?.text_color;
            }
        }
    }

    return (
        <a href={getSlug()} className="link" style={{color: showActiveState(menu)}}>
            <span>
                <SVG
                    src={menu?.web_icon}
                    width={30}
                    height={30}
                    color={showActiveState(menu)}
                />
            </span>
            {menu?.name}
        </a>
    );
}
