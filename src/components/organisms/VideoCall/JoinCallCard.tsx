import React from "react";
import {AiOutlineCalendar, AiOutlineClockCircle} from "react-icons/ai";

interface JoinCallCardProps {
    calls: [],

}

const JoinCallCard: React.FC<JoinCallCardProps> = ({calls, joinVideoCall, acceptVideoCall, theme}) => {

    const convertTime = (data) => {
        let time = data.match(/\d{2}/g);
        if (time[0] === "12") time[0] = "00";
        if (data.indexOf("PM") > -1) time[0] = parseInt(time[0])+12;
        return time.join(":");
    }

    const handleJoinCall = (item) => {

      let serverTime = new Date(calls?.calls.server_time?.ist).getTime();
      let callTime = new Date(item?.date+' '+convertTime(item?.time) ).getTime() - 300000;
      if(serverTime >= callTime) {
        return (
                <button
                    className="btn btn-primary"
                    onClick={(e) => {
                        joinVideoCall(item);
                    }}
                    style={{backgroundColor: theme?.secondary_color, color: theme?.text_color}}
                >
                    JOIN NOW
                </button>
        )
      } else {
          return  <></>
      }
  }

    const handleAcceptCall = (item) => {
        return (
            <button
                className="btn btn-primary"
                onClick={(e) => {
                    acceptVideoCall(item);
                }}
                style={{backgroundColor: theme?.secondary_color, color: theme?.text_color}}
            >
               ACCEPT
            </button>
        )
    }

    const handleCompletedCall = () => {
    return (
        <button className="btn btn-primary" style={{backgroundColor: theme?.secondary_color, color: theme?.text_color}}>
          Completed
        </button>
    )
  }

    const getVideoCalls = () => {
    return calls?.calls?.list.map(item => {
      return (
          <div className="call-join-card" style={{border: '2px solid '+theme?.text_color}}>
            <div className="card-header">
              <div className="book-date">
                <span style={{color: theme?.text_color}}>Booking Date</span>
                <p style={{color: theme?.text_color}}>
                    <AiOutlineCalendar fontSize={16} /> {item?.date}
                </p>
              </div>
              <div className="book-time">
                <span style={{color: theme?.text_color}}>Time Slot:</span>
                <p style={{color: theme?.text_color}}>
                 <AiOutlineClockCircle fontSize={16} /> {item?.time_slot}
                </p>
              </div>
            </div>
            <div className="card-body">
              <p className="request-by">
                <span style={{color: theme?.text_color}}>Requested By:</span>
                <strong style={{color: theme?.text_color}}>{item?.customer?.name}</strong>
              </p>

              <div className="card-actions">
                  {item?.status === 'accepted' ? handleJoinCall(item) : ''}
                  {item?.status === 'rescheduled' ? handleAcceptCall(item) : ''}
                  {item?.status === 'completed' ? handleCompletedCall() : ''}
              </div>
            </div>
          </div>
          )
    });
  }

      return (
          <>
          {getVideoCalls()}
          </>
      );
};
export default JoinCallCard;
