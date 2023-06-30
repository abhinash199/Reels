import React from "react";

import Icon from "@/components/atoms/Icon/Icon";






const SplashContainer = () => {
    return (
        <div className="landing-container">
        {/* <img src="img/land-pic.jpg" alt="Priya Shukla" title="Priya Shukla" /> */}

        <Icon source="/images/land-pic.jpg" alt="Priya Shukla" title="Priya Shukla"/>

        {/* <Icon source="icons/land-pic.jpg"/> */}
        <div className="landing-content">
            <h1>Priya Shukla</h1>
            <h2>THE OFFICIAL APP</h2>
        </div>
    </div>
    );
}

export default SplashContainer;