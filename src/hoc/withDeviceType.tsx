import React from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';

const withDeviceType = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const deviceType = useDeviceType();
    
    if (deviceType === 'mobile' || deviceType === 'tablet') {
      return <WrappedComponent {...props} />;
    } else if(deviceType === '') {
      return;                                // handling the case when deviceType value is yet to be known that is '' you could either return; or return null;
    } else {
      return (
        <section className="error-page">
          <div className="container">
            You can only view the content on mobile or tablet devices.
          </div>
        </section>
      );
    }
  };
};

export default withDeviceType;
