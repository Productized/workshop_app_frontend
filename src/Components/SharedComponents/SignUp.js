import React, { useRef, useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

const SignUp = (props) => {
  const cryptedRoleId = props.match.params.id;
  let roleId = "";
  let maxWorkshops = "";

  switch (cryptedRoleId) {
    case "DFJLMdk123CDLEcjks":
      roleId = 1;
      break;
    case "dfqlQIF":
      roleId = 2;
      break;
    case `${process.env.REACT_APP_URL_MAXWORKSHOPS_1}`:
      roleId = 3;
      maxWorkshops = 1;
      break;
    case `${process.env.REACT_APP_URL_MAXWORKSHOPS_2}`:
      roleId = 3;
      maxWorkshops = 2;
      break;
    case `${process.env.REACT_APP_URL_MAXWORKSHOPS_3}`:
      roleId = 3;
      maxWorkshops = 3;
      break;
    case `${process.env.REACT_APP_URL_MAXWORKSHOPS_4}`:
      roleId = 3;
      maxWorkshops = 4;
      break;
    case `${process.env.REACT_APP_URL_MAXWORKSHOPS_5}`:
      roleId = 3;
      maxWorkshops = 5;
      break;
    default:
      roleId = 3;
      maxWorkshops = 0;
      break;
  }

  const { register, handleSubmit, reset, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const { setUserInformation, setAuth } = useContext(UserContext);


  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const toggleCheckbox = () => {
    setCheckboxCheck(!checkboxCheck);
  };

  const onSubmit = (data) => {
    const { password, repeatPassword } = data;
    if (password === repeatPassword) {
      const {
        firstname,
        lastname,
        company,
        country,
        email,
        role_id,
        max_workshops,
        registration_date,
      } = data;
      const formData = {
        firstname: firstname,
        lastname: lastname,
        company: company,
        country: country,
        email: email,
        role_id: role_id,
        max_workshops: max_workshops,
        registration_date: registration_date,
        password: password,
      };

      axios
        .post('/auth/signup', formData)
        .then(() => {
          axios
          .post('/auth/login', data)
          .then((response) => response.data)
          .then((user) => {
            setUserInformation(user);
          })
      .then(() => setAuth(true))
      })
    } else {
      setPasswordsMatch(false);
    }
  };

  var todayDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="signUp-page-container">
      <div className="signUp-container">
        <div className="signUp-img" />
        <div className="signUp-right-side-container">
          <h1>Create an Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="name">
              <div className="input-error">
                <input
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  ref={register({
                    required: true,
                  })}
                />
              {errors.firstname && <p>please add your firstname</p>}
              </div>
              <div className="input-error">
                <input
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  ref={register({ required: true })}
                />
                {errors.lastname && <p>please add your lastname</p>}
              </div>
            </div>
            <div className="comp-country">
              <input
                name="company"
                type="text"
                placeholder="Company"
                ref={register}
              />
              <div className="input-error">
                <input
                  name="country"
                  type="text"
                  placeholder="Country"
                  ref={register({ required: true })}
                />
              {errors.country && <p>please add your country</p>}
              </div>
            </div>
            <div className="input-error">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email Address"
                ref={register({ required: true })}
              />
            {errors.email && <p>please add your email</p>}
            </div>
            <div className="password">
              <div className="input-error">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref={register({
                    required: true,
                    minLength: { value: 8, message: "minimum 8 characters" },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="input-error">
                <input
                  name="repeatPassword"
                  type="password"
                  placeholder="Repeat Password"
                  ref={register({
                    required: true,
                  })}
                />
                {errors.repeatPassword && <p>please repeat your password</p>}
                {!passwordsMatch && <p>passwords don't match</p>}
              </div>
            </div>
            <input
              name="role_id"
              type="hidden"
              value={roleId}
              contentEditable={false}
              ref={register}
            />
            <input
              name="max_workshops"
              type="hidden"
              value={maxWorkshops}
              contentEditable={false}
              ref={register}
            />
            <input
              name="registration_date"
              type="hidden"
              value={todayDate}
              contentEditable={false}
              ref={register}
            />
            <div className="gdpr">
              <div className="gdpr-input">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="gdpr"
                  value={checkboxCheck}
                  onChange={toggleCheckbox}
                  ref={register({ required: true })}
                />
                <p>
                  I have read and accept the
                  <a href="https://productized.co/privacy-policy/">
                    Privacy Policy
                  </a>
                </p>
              </div>
              {errors.checkbox && (
                <p>You need to agree with the Privacy Policy</p>
              )}
            </div>
            <button type="submit">Register Account</button>
            <hr />
          </form>
          <p>
            Already have an account? <Link to="/login">login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;