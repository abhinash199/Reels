import React, {useEffect, useState} from "react";
import { MainLayout } from "@/components/organisms/Layouts";
import TextArea from "@/components/atoms/TextArea/index";
import Text from "@/components/atoms/Text/Text";
import Swiper from "react-id-swiper";
import Button from "@/components/atoms/Button/Button";
import {slotActions} from "@/containers/call/actions/slots";
import {bookCallActions} from "@/containers/call/actions/book";
import { useArtist, useWallet } from "@/context/index";
import Toast from "@/components/atoms/Toast";
import {faCheckCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Helper} from "../../../partials";
import Icon from "../../../components/atoms/Icon/Icon";
import { Icons } from "@/constants/Icons";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Routes from "../../../constants/Routes";
import {useRouter} from "next/router";
import {useModal} from "react-modal-hook";
import ReactModal from "react-modal";

interface VideoCallRequestsProps {}

const VideoCallBooking: React.FC<VideoCallRequestsProps> = () => {

    let router = useRouter();
    const { coins } = useWallet();
    const [record, setRecord] = useState([]);
    const [orders, setOrders] = useState(null);

  const [inputs, setInputs] = useState({
      schedule_date: "",
      duration: "",
      slot: "",
      message: "",
      language: "",
  });

  const [errors, setErrors] = useState({errorMessage: '', error: false});
  const [success, setSuccess] = useState({successMessage: '', success: false});

  const { id, profile, theme, videoCallPrice } = useArtist();

  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const fullYear = ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let today = new Date();
  const [month, setMonth] = useState(fullYear[today.getMonth()]);
  const [slots, setSlots] = useState([]);
  const [duration, setDuration] = useState([]);
  const [price, setPrice] = useState({price: 0, duration: 0});
  const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "90%",
        padding: "0",
        border: "none"
    },
};
  useEffect(() => {
      const handlePrice = async () => {
          if(inputs?.duration) {
              return videoCallPrice?.map((item, index) => {
                  if(item?.duration === inputs?.duration) {
                      if(item?.duration) {
                          setPrice({price: item?.coins, duration: inputs?.duration})
                      }
                  }
              });
          }
      };
      handlePrice().then(r => '');
  }, [inputs?.duration]);

  useEffect(() => {

      const todayISO = new Date().toISOString();
      const fullDate = todayISO.split('T')[0];

      setInputs((inputs) => ({ ...inputs, ['schedule_date']: fullDate }));

      if(id) {
          let payload = {
              artist_id : id,
              date : fullDate,
          }
          slotActions.getSlots(payload).then(response => { handleDuration(response, fullDate) });
      }
  }, [id]);

  let config = {
    containerClass:'swiper-container gal-listing',
        freeMode: true,
        slidesPerView: 6,

        navigation: {
      nextEl: '.sw_photos_arrows .swiper-button-next',
          prevEl: '.sw_photos_arrows .swiper-button-prev',
    },
  };

  const handleMonthChange = (item) => {
        setSlots([]);
        setDuration([]);
        setInputs((inputs) => ({ ...inputs, ['duration']: '' }));
        setInputs((inputs) => ({ ...inputs, ['slot']: '' }));
        setInputs((inputs) => ({ ...inputs, ['schedule_date']: item?.fullDate }));
        setMonth(item?.month);
        let payload = {
            artist_id : id,
            date :  item?.fullDate,
        }
       slotActions.getSlots(payload).then(response => {
           handleDuration(response, item?.fullDate);
        });
    }

  const handleItems = () => {
        let year = today.getFullYear();
        let month = today.getMonth();
        let dateToday = today.getDate();
        let days = [];

        for (let i = 0; i < 30; i++) {
            let day = new Date(year, month, dateToday + i);
            let dayISO = new Date(year, month, dateToday + i+1);
            const todayISO = dayISO.toISOString();
            const fullDate = todayISO.split('T')[0];

            days.push({
                fullDate: fullDate,
                month:  fullYear[day.getMonth()],
                day: weekday[day.getDay()],
                dayNum: day.getDate(),
                year : day.getUTCFullYear(),
            })
        }

      return days.map((item) => {
          let checked  = inputs?.schedule_date === item?.fullDate;
          return (
              <div className="swiper-slide">
                  <div className={(inputs?.schedule_date === item?.fullDate) ? 'banner-slide active' : 'banner-slide' } onClick={ e =>handleMonthChange(item)}>
                      <label><span>{item?.day}</span><input type={"radio"} name={"schedule_date"} checked={checked}  /> <Text>{item?.dayNum}</Text></label>
                  </div>
              </div>
          );
      });
  }

  const handleDuration = (slots, fullDate) => {
      if(slots?.data?.results) {
          return slots?.data?.results.map((item) => {
              if(fullDate === item?.date) {
                  setDuration(item?.durations);
              }
          });
      }
    }

  const handleDurationChange = (item) => {
        setSlots(item?.slots);
        setInputs((inputs) => ({ ...inputs, ['duration']: item?.duration }));
        setInputs((inputs) => ({ ...inputs, ['slot']: '' }));
  }

    const handleSlots = () => {
        if(slots.length >= 1) {
            return slots?.map((item, index) => {
                return (
                    <label style={{backgroundColor: (inputs.slot === item) ?  theme?.secondary_color : '', borderColor: (inputs.slot === item) ?  theme?.secondary_color : theme?.text_color, color: theme?.text_color}}><input type={"radio"} name={"slot"} onClick={ e => setInputs((inputs) => ({ ...inputs, ['slot']: item }))} />{item}</label>
                )
            });
        } else {
            return (  <Text theme={theme}>Select Duration of Call</Text> );
        }
    }

    const handleDurationSlots = () => {
        if(duration) {
            return duration.map((item, index) => {
                return (
                    <label style={{backgroundColor: (inputs.duration === item?.duration) ?  theme?.secondary_color : '', borderColor: (inputs.duration === item?.duration) ?  theme?.secondary_color : theme?.text_color, color: theme?.text_color}}><input type={"radio"} name={"duration"} onClick={ e => handleDurationChange(item)}  />{item?.duration}</label>
                )
            });
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    const fetchUser = async () => {
        return await Helper.decode(Helper.userToken());
    }
    
    const [openModal, closeModal] = useModal(() => (
        <ReactModal isOpen style={customStyles} ariaHideApp={false}>
            <div className="modal">
                <div className="unlockPopup">
                    <div className="popup">
                        <div className="close" onClick={(e) => {closeModal()}}>X</div>
                        <h3 style={{color:"red"}}>Don't have enought coins?</h3>
                        <strong>Wallet Balance: <Icon source={Icons.bronze} title="bronze" /> {coins}</strong>
                        <button className="unlockBtn"  onClick={() => router.push(Routes.recharge(profile?.slug))} style={{background: theme?.secondary_color}}>Pay</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    ), [record]); 

  const handleSubmit = () => {
      if(inputs?.schedule_date === ''){
          setErrors({errorMessage: 'Please select a date.', error: true});
          setTimeout(setErrors, 3000, {errorMessage: '', error: false});
      } else if(inputs.duration === '') {
          setErrors({errorMessage: 'Please enter a duration.', error: true});
          setTimeout(setErrors, 3000, {errorMessage: '', error: false});
      } else if(inputs.slot === '') {
          setErrors({errorMessage: 'Please enter a slot.', error: true});
          setTimeout(setErrors, 3000, {errorMessage: '', error: false});

      } else if(inputs.language === '') {
        setErrors({errorMessage: 'Please select the language.', error: true});
        setTimeout(setErrors, 3000, {errorMessage: '', error: false});

    }  else if(price?.price > coins){
        openModal();
      } else {
          setErrors({errorMessage: '', error: false});
          fetchUser().then(user => {
              let payload = {
                  artist_id: id,
                  mobile: user?.mobile,
                  mobile_code: user?.mobile_code,
                  email: user?.email,
                  duration: inputs?.duration,
                  date: inputs?.schedule_date,
                  time: inputs?.slot,
                  message: inputs?.message,
                  language: inputs?.language
              }
              bookCallActions.bookCall(id, payload).then(response => {
                  setErrors({errorMessage: 'Booking done successfully', error: true});               
                  setTimeout(()=>{
                    setErrors({errorMessage: '', error: false});
                    router.push(Routes.videoCallRequests(profile?.slug));
                  },2000);
              });
          });

      }
  }

  const handleCallPrice = () => {
      if(!inputs.duration) {
          return (
              <div className="vam">
                  <span className="mr-5 info-icon"><Icon source={Icons.infoCircle} title="infoCircle" /></span>
                  <span className="instructions" style={{color: theme?.text_color}}>Select duration to view cost</span>
              </div>
          )
      } else {
        if(price?.price !== 0) {
            return (
                <div className="vam">
                    <div className="instructions" style={{color: theme?.text_color}}>
                        <Icon source={Icons.bronze} title="bronze" width={'20px'} />{' ' + price?.price}
                    </div>
                    <div className="instructions" style={{color: theme?.text_color}}>
                       {inputs?.duration} min duration
                    </div>
                </div>
           )
        }
      }
  }

  return (
    <MainLayout title="Video Call Booking">
    <div className="vc-booking">
        <Text>{month}</Text>
      <Swiper {...config}>
        {handleItems()}
      </Swiper>

      <div className="form-group bt1 fullwd">
        <Text><h3 className="subheading" style={{color: theme?.text_color}}>Duration Of Call</h3></Text>
        <div className="pills">
          {handleDurationSlots()}
        </div>
      </div>

      <div className="form-group bt1 fullwd">
        <Text><h3 className="subheading" style={{color: theme?.text_color}}>Available Slots</h3></Text>
          <div className="pills">{handleSlots()}</div>
      </div>

      <div className="form-group">
        <Text><h3 className="subheading" style={{color: theme?.text_color}}>Write message</h3>
        </Text>
        <TextArea  className="profile-text-area" value={inputs?.message} onChange={handleChange} name="message" rows={6} />
      </div>

      <div className="form-group">
        <Text><h3 className="subheading" style={{color: theme?.text_color}}>Preferred Language</h3>
        </Text>
        <select className="profile-input" onChange={handleChange} value={inputs?.language} name="language">
          <option value="">Select Language</option>
          <option value="english">English</option>
        </select>
      </div>

      <div className="form-group instructions" style={{color: theme?.text_color}}>
        Note - While sending your requests refrain from using obscene, derogatory, insulting and offensive language. Non compliance to this will result in rejection of your request and coins will not be refunded.
      </div>
      <div className="form-group frow space-between">
            {handleCallPrice()}
        <div className="btn-wrap" onClick={(e) => handleSubmit()}>
            <Button className="btn btn-primary" type="submit" style={{backgroundColor: theme?.secondary_color, color: theme?.text_color}}>Continue</Button>
        </div>
      </div>
      <div className="form-group">{/*keep this for bottom space*/}</div>

        {errors?.error ? (
            <Toast
                icon={errors?.errorMessage === 'Booking done successfully' ? faCheckCircle:faTimes}
                position="bottom-right"
                title={errors?.errorMessage === 'Booking done successfully' ?"Success": "Error"}
                description={errors?.errorMessage}
            />
        ) : (
            ""
        )}

      <style jsx global>
              {`
                  .banner-slide {
                      color: ${theme?.text_color};
                  }
                  .banner-slide.active > label > label {
                      color: ${theme?.text_color};
                      background: ${theme?.secondary_color};
                  }
              `}
        </style>
    </div>
    </MainLayout>
  );
};

export default AuthMiddleware(VideoCallBooking);
