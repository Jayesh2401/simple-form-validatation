import React from "react";
import { useLocation } from "react-router-dom";
function Showcase(details) {
  const location = useLocation();
  const data = location?.state?.data || {};
    console.log(data);
  return (
    <div className="profileScreen">
      <div className="prodileOutcome d-flex">
        <div className="col-md-6">
          <div className="profileLabel mt-3">
            Name :- <span>{data.name}</span>
          </div>
          <div className="profileLabel">
          Email :-
            {data.email}
          </div>
          <div className="profileLabel">
            Phone no :-
            {data.phone}
          </div>
          <div className="profileLabel">
            Address :-
            {data.address}
          </div>
          <div className="profileLabel">
            Zip-code :-
            {data.zipCode}
          </div>
          <div className="profileLabel">
            country :-
            {data.country}
          </div>
          <div className="profileLabel">
            State :-
            {data.state}
          </div>
          <div className="profileLabel">
            City :-
            {data.city}
          </div>
        </div>
        <div className="col-md-6">
          <div>jk</div>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
