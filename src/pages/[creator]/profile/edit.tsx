import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/organisms/Layouts";
import Toast from "@/components/atoms/Toast";
import { EditProfilePage } from "@/components/organisms/EditProfilePage";
import { updateProfile } from "@/containers/profile/actions/update";
import { profileActions } from "@/containers/profile/actions";
import { useArtist } from "../../../context";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/reducers";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import Loader from "@/components/atoms/Loader";
import { Helper } from "@/partials/index";

const EditProfile = () => {
  const { id, theme } = useArtist();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    gender: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [dob, setDob] = useState(new Date());

  const { first_name, last_name, email, mobile, gender } = inputs;

  const [errors, setErrors] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [update, setUpdated] = useState(false);
  const [toast, setToast] = useState(false);
  const [FirstnameError, setFirstnameError] = useState(false);
  const profile = useSelector((state: ApplicationState) => state.profile);
  const ele = <> Please enter mobile <br/> number</>
  useEffect(() => {
    if (id) {
      dispatch(profileActions.fetchProfile(id));
    }
  }, [id]);

  useEffect(() => {
    if (!profile.loading) {
      let { customer } = profile?.user;
      let formattedDob = customer?.dob ? new Date(customer?.dob) : dob;
      setDob(formattedDob);

      setInputs({
        first_name: customer?.first_name,
        last_name: customer?.last_name,
        email: customer?.email,
        mobile: customer?.mobile,
        gender: customer?.gender,
      });
      setProfilePic(customer?.picture);
    }
  }, [profile]);

  function handelFormSubmit(e) {
    setSubmitted(true);
    e.preventDefault();
    
  //check first name is empty or not 
    if (first_name === null || first_name.trim() === "") {
      setFirstnameError(true);
      setTimeout(() => {
        setFirstnameError(false)
      }, 3000);
      
    } else if (mobile === null || mobile.trim() === ""){
      setErrors(ele)
      setTimeout(
        ()=>{
          setErrors('')
        },
      3000);
    } else{
      let formattedDob = new Date(dob);

      let date =
        formattedDob.getFullYear() +
        "-" +
        ("0" + (formattedDob.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + formattedDob.getDate()).slice(-2);

      let payload = {
        first_name: first_name,
        last_name: last_name,
        email_id: email,
        mobile: mobile,
        gender: gender,
        dob: date,
        photo: avatar,
      };

      updateProfile(id, payload).then((response) => {
        let encodePayload = {
          first_name: response?.data?.customer?.first_name,
          last_name: response?.data?.customer?.last_name,
          avatar: response?.data?.customer?.photo?.thumb,
          id: response?.data?.customer?._id,
          email: response?.data?.customer?.email,
          email_verified: response?.data?.customer?.email_verified,
          mobile: response?.data?.customer?.mobile,
          mobile_code: response?.data?.customer?.mobile_code,
          mobile_verified: response?.data?.customer?.mobile_verified,
        };

        let encodedData = Helper.encode(encodePayload, {
          expiresIn: "365 days",
        });
        Helper.setCookie("FNUID", encodedData, { expires: 365, path: "/" });
        setToast(true);
        setTimeout(setToast, 3000, false);
      });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  return (
    <MainLayout title={"Edit Profile"}>
      {profile.loading ? (
        <Loader />
      ) : (
        <EditProfilePage
          first_name={first_name}
          last_name={last_name}
          email={email}
          mobile={mobile}
          gender={gender}
          dob={dob}
          setDob={setDob}
          handleChange={handleChange}
          handelFormSubmit={handelFormSubmit}
          theme={theme}
          avatar={avatar}
          setAvatar={setAvatar}
          profilePic={profilePic}
          showError={FirstnameError}
        />
      )}
      {toast ? (
        <Toast
          icon={faCheckCircle}
          position="bottom-right"
          title="Success"
          description="Profile updated successfully"
        />
      ) : (
        ""
      )}
      {errors ? (
        <Toast
          icon={faCheckCircle}
          position="bottom-right"
          title="Error"
          description={errors}
        />
      ) : (
        ""
      )}
    </MainLayout>
  );
};

export default AuthMiddleware(EditProfile);
