import { FileDrop } from "react-file-drop";
import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Validator from "./Validator";
import Input from "./Components/Input";
import Option from "./Components/Option";
import Showcase from "./Showcase";

function App() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    image: "",
    category: "",
    cardName: "",
    creditNo: "",
    credityear: "",
    cvc: "",
    checked: false,
  });
  const [error, setError] = useState({});
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const Photo = ["Black", "Abstract", "Architecture", "Nature", "RGB"];
  const styles = {
    border: "1px solid white",
    maxWidth: 600,
    borderRadius: "10px",
    color: "white",
    padding: 20,
  };

  const buttonRef = () => {
    inputRef.current.click();
  };

  const handledChange = (file) => {
    setError((data) => ({ ...data, image: "" }));
    const File = file[0];

    if (
      File.type !== "image/jpeg" &&
      File.type !== "image/png" &&
      File.type !== "image/svg+xml"
    ) {
      setError((data) => ({
        ...data,
        image: "File should be only .png/.jpeg/.jpg/.svg format.",
      }));
      setDetails((data) => ({ ...data, image: "" }));
    } else if (File.size > 2097152) {
      setError((data) => ({
        ...data,
        image: "Please upload file less than 2MB.",
      }));
      setDetails((data) => ({ ...data, image: "" }));
    } else {
      for (var i = 0, f; (f = file[i]); i++) {
        var reader = new FileReader();

        reader.onload = function (e) {
          setDetails((data) => ({ ...data, image: e.target.result }));
        };
        reader.readAsDataURL(f);
      }
    }
  };

  const url = "https://www.universal-tutorial.com/api/";
  const urlContent = {
    method: "GET",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJqYXllc2guYWhlcndhbEBtaW5kaW52ZW50b3J5LmNvbSIsImFwaV90b2tlbiI6IkRxRzBvcjhPalhTWUVGN1NhTUp6QnF0ZW8tRm5lOEIweUFsMXV0ZnlPcDZSVGhMc0RvNnZIaGtoT2xadVEtcV9SQkEifSwiZXhwIjoxNjgyMDg0OTE0fQ.-fwQq2XbdeoF7yub3PUL-G9rq5NmUPRQZu-ZjzL3dBI",
      Accept: "application/json",
    },
  };

  const handleYear = (e) => {
    details.credityear === "" &&
      setDetails((data) => ({ ...data, credityear: "" }));

    if (details.credityear === "/") {
      setDetails((data) => ({
        ...data,
        credityear: "",
      }));
    } else if (details.credityear.length === 1) {
      setDetails((data) => ({
        ...data,
        credityear: e.target.value.slice(0, 2) + "/",
      }));
    } else {
      setDetails((data) => ({ ...data, credityear: e.target.value }));
    }
  };

  const countryData = () => {
    fetch(`${url}countries/`, urlContent)
      .then((response) => response.json())
      .then((data) => setCountry(data));
  };

  const stateData = (state) => {
    country.length > 0 &&
      fetch(`${url}states/${state}`, urlContent)
        .then((response) => response.json())
        .then((data) => setState(data));
  };

  const cityData = (citi) => {
    setCity([]);
    state.length > 0 &&
      fetch(`${url}cities/${citi}`, urlContent)
        .then((response) => response.json())
        .then((data) => setCity(data));
  };

  useEffect(() => {
    countryData();
    stateData();
    cityData();
  }, []);

  const check = [
    {
      css: "firstA",
      href: "/",
      title: "awards",
    },
    {
      css: "secondA",
      href: "/",
      title: "contact",
    },
    {
      css: "thirdA",
      href: "/",
      title: "our competions",
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const { errors, noErrors } = Validator(details);
    if (noErrors) {
      // console.log("true", details);
      Showcase(details);
      // navigate("/profile");
      navigate("/profile", { state: { data: details } });

    } else {
      // navigate("/profile");

      // navigate("/profile", { state: { data: details } });
      setError(errors);
    }
  };

  return (
    <div className="mainScreen">
      <div className="listView">
        <a className="mainImg font " href="/">
          awards
        </a>
        <div className="middleContent">
          {check.map((e, index) => {
            return (
              <Fragment key={index}>
                <a className={e.css} href={e.href}>
                  {e.title}
                </a>
              </Fragment>
            );
          })}
        </div>
        <a className="signin" href="/">
          SIGN IN
        </a>
      </div>
      <div className="secondScreen">
        <div className="firstHalf">
          <h3 className="head">Fill the Application </h3>
          <Input
            type="text"
            placeholder="Full Name"
            value={details.name}
            onChange={(e) => {
              setError((data) => ({ ...data, name: "" }));
              setDetails((data) => ({ ...data, name: e.target.value }));
            }}
          />
          <span className="errorM">{error.name}</span>
          <Input
            placeholder="Enter Email Address"
            type="email"
            value={details.email}
            onChange={(e) => {
              setError((data) => ({ ...data, email: "" }));
              setDetails((data) => ({ ...data, email: e.target.value }));
            }}
          />
          <span className="errorM">{error.email}</span>
          <Input
            placeholder="Phone Number"
            type="number"
            value={details.phone}
            onChange={(e) => {
              setError((data) => ({ ...data, phone: "" }));
              setDetails((data) => ({ ...data, phone: e.target.value }));
            }}
            onKeyPress={(e) => e.key === "e" && e.preventDefault()}
          />
          <span className="errorM">{error.phone}</span>
          <textarea
            placeholder="Street Address"
            className="AddressInput"
            type="address"
            value={details.address}
            onChange={(e) => {
              setError((data) => ({ ...data, address: "" }));
              setDetails((data) => ({ ...data, address: e.target.value }));
              setCity([]);
            }}
          />
          <span className="errorM">{error.address}</span>
          <div className="countryFlex">
            <div className="countrySelect">
              <select
                onChange={(e) => {
                  stateData(e.target.value);
                  setCity([]);
                  setState([]);
                  setError((data) => ({ ...data, country: "" }));
                  setDetails((data) => ({
                    ...data,
                    country: e.target.value,
                    city: "",
                    state: "",
                  }));
                }}
              >
                <option>Country</option>
                {country.map((e, index) => {
                  return <Option key={index} e={e.country_name} />;
                })}
              </select>
              <span className="errorM">{error.country}</span>
            </div>
            <div className="zipFlex">
              <input
                placeholder="Zip Code"
                className="zipCode"
                type="text"
                maxLength={6}
                value={details.zipCode}
                onChange={(e) => {
                  setError((data) => ({ ...data, zipCode: "" }));
                  setDetails((data) => ({ ...data, zipCode: e.target.value }));
                }}
              />
              <span className="errorM state">{error.zipCode}</span>
            </div>
          </div>
          <div className="cityFlex">
            <div className="CitySelect">
              <select
                onChange={(e) => {
                  cityData(e.target.value);
                  setError((data) => ({ ...data, state: "" }));
                  setDetails((data) => ({
                    ...data,
                    state: e.target.value,
                    city: "",
                  }));
                }}
              >
                <option>----State----</option>
                {state.map((e, key) => {
                  return <Option key={key} e={e.state_name} />;
                })}
              </select>
              <span className="errorM ">{error.state}</span>
            </div>

            <div className="CitySelect">
              <select
                className="stateSelect"
                onChange={(e) => {
                  setError((data) => ({ ...data, city: "" }));
                  setDetails((data) => ({ ...data, city: e.target.value }));
                }}
              >
                <option>--City--</option>
                {city.map((e, key) => {
                  return <Option key={key} e={e.city_name} />;
                })}
              </select>
              <span className="errorM state">{error.city}</span>
            </div>
          </div>
        </div>
        <div className="secondHalf">
          <label htmlFor="uploadPhoto" className="uploadPhoto">
            Upload your photo <span>?</span>
          </label>
          <input
            className="d-none"
            ref={inputRef}
            type="file"
            accept="image/*"
            id="input-file-upload"
            multiple={true}
            onChange={(e) => {
              setError((data) => ({ ...data, image: "" }));
              handledChange(e.target.files);
            }}
          />
          <div style={styles} onClick={(e) => buttonRef(e)}>
            <FileDrop onDrop={(files) => handledChange(files)}>
              Upload files
              <span>Drop Your Files</span>
            </FileDrop>
          </div>
          <span className="nameS">{details.image}</span>
          <span className="errorM">{error.image}</span>
          <div className="contestSelect">
            <select
              onChange={(e) => {
                setError((data) => ({ ...data, category: "" }));
                setDetails((data) => ({ ...data, category: e.target.value }));
              }}
            >
              <option>Photo Contest Category</option>
              {Photo.map((e, key) => {
                return <Option key={key} e={e} />;
              })}
            </select>
            <span className="errorM">{error.category}</span>
          </div>
          <p className="payment">Payment Option</p>
          <div className="cardValid">
            <Input
              placeholder="Name on Card*"
              type="text"
              value={details.cardName}
              onChange={(e) => {
                setError((data) => ({ ...data, cardName: "" }));
                setDetails((data) => ({ ...data, cardName: e.target.value }));
              }}
            />
            <span className="errorM">{error.cardName}</span>
          </div>
          <div>
            <input
              placeholder="Credit Card*"
              className="creditNumber"
              maxLength={16}
              type="text"
              onChange={(e) => {
                setError((data) => ({ ...data, creditNo: "" }));
                setDetails((data) => ({ ...data, creditNo: e.target.value }));
              }}
            />
            <input
              className="yearCard"
              placeholder="mm/yr"
              value={details.credityear}
              maxLength={7}
              onChange={(e) => {
                setError((data) => ({ ...data, creditNo: "" }));
                handleYear(e);
              }}
            />
            <input
              placeholder="cvc"
              maxLength={3}
              className="cvcCard"
              onChange={(e) => {
                setError((data) => ({ ...data, creditNo: "" }));
                setDetails((data) => ({ ...data, cvc: e.target.value }));
              }}
            />
            <span className="questionmarek">?</span>
            <img src="visa.png" alt="visa" className="visa" />
            <img src="master.png" alt="master" className="master" />
          </div>
          <span className="errorM">{error.creditNo}</span>
          <div className="checkBox">
            <input
              type="checkbox"
              onChange={(e) => {
                setError((data) => ({ ...data, checked: "" }));
                setDetails((data) => ({ ...data, checked: e.target.checked }));
              }}
            />{" "}
            I Agree
            <a href="/" className="terms">
              Terms and conditon{" "}
            </a>
          </div>
          <span className="errorM">{error.checked}</span>
          <div className="buttonManage">
            <button className="submitButton" onClick={(e) => submitHandler(e)}>
              Submit
            </button>
            <button className="cancelButton">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
