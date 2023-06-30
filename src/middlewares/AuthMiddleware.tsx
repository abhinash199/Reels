import React from "react";
import Router from "next/router";
import cookies from "next-cookies";

const checkUserAuthentication = (checkCookie) => {
    return {
        auth: !(
            checkCookie === undefined ||
            checkCookie === null ||
            checkCookie.length <= 0
        ),
    };
};

export default (WrappedComponent) => {

    const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
    hocComponent.getInitialProps = async (context) => {
        const authCookie = cookies(context).FNSID;
        const userAuth = checkUserAuthentication(authCookie);
        // Are you an authorized user or not?

        const login =  context?.query?.creator ? '/' + context?.query?.creator + '/login' : '/';

        if (!userAuth?.auth) {
            if (context.res) {
              context.res?.writeHead(302, {
                Location: login,
              });
              context.res?.end();
            } else {
              await Router.replace(login);
            }
        } else if (WrappedComponent.getInitialProps) {
            const wrappedProps = await WrappedComponent.getInitialProps({
                ...context,
                auth: userAuth,
            });
            return { ...wrappedProps, userAuth };
        }
        return { userAuth };
    };
    return hocComponent;
};
