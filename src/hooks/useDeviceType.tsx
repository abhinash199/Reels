import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

export function useDeviceType(): string {
  const [deviceType, setDeviceType] = useState<string>("");

  useEffect(() => {
    if (isMobile) {
      setDeviceType("mobile");
    } else if (isTablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  }, []);

  return deviceType;
}
