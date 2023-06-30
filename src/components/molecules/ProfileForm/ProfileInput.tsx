import React, { useEffect, useState } from "react";
import TextBox from "@/components/atoms/TextBox/TextBox";
import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/Button/Button";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Toast from "@/components/atoms/Toast/index";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";

export const ProfileInput = ({
  first_name,
  last_name,
  email,
  mobile,
  gender,
  dob,
  setDob,
  handleChange,
  handelFormSubmit,
  theme,
  showError,
}) => {
  return (
    <form onSubmit={handelFormSubmit}>
      <div className="form-group">
        <Text theme={theme}>
          First Name*
          <span className="info-tooltip" title="Field cannot be empty" />
        </Text>
        <TextBox
          type="text"
          className="profile-input"
          value={first_name}
          onChange={handleChange}
          name="first_name"
        />

        {showError ? (
          <Toast
            icon={faXmarkCircle}
            position="bottom-right"
            title="Error"
            description="FirstName cannot be empty"
          />
        ) : (
          ""
        )}
      </div>
      <div className="form-group">
        <Text theme={theme}>
          Last Name
          <span className="info-tooltip" title="Tooltip text" />
        </Text>
        <TextBox
          type="text"
          className="profile-input"
          value={last_name}
          onChange={handleChange}
          name="last_name"
        />
      </div>
      <div className="form-group">
        <Text theme={theme}>
          Email ID
          <span className="info-tooltip" title="Tooltip text" />
        </Text>
        <TextBox
          type="text"
          className="profile-input"
          value={email}
          onChange={handleChange}
          name="email"
          placeholder={"Email ID"}
          disabled={true}
        />
      </div>
      <div className="form-group">
        <Text theme={theme}>
          Mobile Number*
          <span className="info-tooltip" title="Tooltip text" />
        </Text>
        <TextBox
          type="text"
          className="profile-input"
          value={mobile}
          onChange={handleChange}
          disabled = {mobile ? 'true': 'false'}
          name="mobile"
        />
      </div>
      <div className="form-group">
        <Text theme={theme}>
          Date of Birth
          <span className="info-tooltip" title="Tooltip text" />
        </Text>

        <div className="dob-input">
          <DatePicker
            onChange={setDob}
            value={dob}
            maxDate={new Date()}
            name="dob"
            format={"dd-MM-yyyy"}
            clearIcon={null}
          />
        </div>
      </div>
      <div className="form-group">
        <Text theme={theme}>
          {" "}
          Gender
          <span className="info-tooltip" title="Tooltip text" />
        </Text>
        <select
          className="profile-input"
          onChange={handleChange}
          value={gender}
          name="gender"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="others">Others</option>
        </select>
      </div>
      {/*<div className="form-group earn">*/}
      {/*    <Text>Refer & Earn*/}
      {/*        <span className="info-tooltip" title="Tooltip text"></span>*/}

      {/*    </Text>*/}
      {/*    <TextBox type="text"  className="profile-input"  />*/}

      {/*    <span className="icon-whatsapp-line"></span>*/}
      {/*</div>*/}

      <div className="form-group">
        <Button
          className="btn btn-primary"
          type="submit"
          style={{ background: theme?.secondary_color }}
        >
          UPDATE
        </Button>
      </div>
    </form>
  );
};
