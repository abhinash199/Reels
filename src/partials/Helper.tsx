import Cookies from "js-cookie";
import jwt from  'jsonwebtoken';

export const Helper = {
    userToken: () => {
        return Cookies.get("FNUID");
    },
    encode: (data, params= {}) => {
       return  jwt.sign(data, process.env.NEXT_PUBLIC_SALT, params);
    },
    decode: (data) => {
        try {
            return jwt.verify(data, process.env.NEXT_PUBLIC_SALT);
        } catch(err) {
            // err
        }
    },
    setCookie: (key, data, params={}) => {
        return Cookies.set(key, data, params);
    },

    clearSiteCookie: (key) => {
        return Cookies.remove(key);
    },

    getTimeDifference: (timestamp: string) => {
        const currentDate = new Date();
        const visitedDate = new Date(timestamp);
    
        const timeDifference = currentDate.getTime() - visitedDate.getTime();
    
        // Calculate the time difference in various units
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    
        // Determine the appropriate time unit to display
        if (minutes < 60) {
          return minutes > 1 ? `${minutes} minutes ago` : "a minute ago";
        } else if (hours < 24) {
          return hours > 1 ? `${hours} hours ago` : "an hour ago";
        } else if (days < 7) {
          return days > 1 ? `${days} days ago` : "yesterday";
        } else if (weeks < 4) {
          return weeks > 1 ? `${weeks} weeks ago` : "a week ago";
        } else {
          return months > 1 ? `${months} months ago` : "a month ago";
        }
    },

   formatDuration: (duration: string | undefined | null): string => {
      if (!duration) return '';
    
      if (duration.includes(':')) {
        // If duration is in HH:MM:SS format
        const components = duration.split(':');
        return components.slice(-2).join(':'); // Show last two components (MM:SS)
      }
    
      // If duration is in seconds
      const seconds = parseInt(duration, 10);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    
}
