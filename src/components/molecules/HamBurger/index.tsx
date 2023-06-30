import React from "react";
import Button from "@/components/atoms/Button/Button";
import { RiMenuFill } from "react-icons/ri";

const HamBurger = ({setOpenHamburger, theme, noFooter}) => {

    return (
        <Button className="side-menu-btn" onClick={() => setOpenHamburger(true)} style={{ visibility: noFooter ? 'hidden' : 'visible'}}>
            <RiMenuFill fontSize={24} color={theme.primary_color}/>
        </Button>
    );
}

export default HamBurger;
