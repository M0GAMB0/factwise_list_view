import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import "../assets/styles/accordionStyle.css";
import deleteLogo from "../assets/images/delete.svg";
import editLogo from "../assets/images/edit.svg";

interface DataProps {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

interface Accordion1Props {
  data: DataProps;
  style?: React.CSSProperties;
}

const Accordion1: React.FC<Accordion1Props> = ({ data, style }) => {
  const [listData, setListData] = useState(data);

  const calculateAge = (dob1: string): number => {
    const birthDate = new Date(dob1);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };

  const { id, first, last, dob, gender, email, picture, country, description } =
    listData;
  return (
    <Accordion className="col-6" flush style={style}>
      <Accordion.Item eventKey={`${id}`}>
        <Accordion.Header>
          <img
            src={picture}
            alt="celebrity picture"
            style={{ borderRadius: "50%" }}
            height={55}
            width={55}
          />
          <span className="ms-4">
            {first} {last}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <div className="col-4">
              <div className="labelStyle">Age</div>
              <div>{calculateAge(dob)} Years</div>
            </div>
            <div className="col-4">
              <div className="labelStyle">Gender</div>
              <div className="text-capitalize">{gender}</div>
            </div>
            <div className="col-4">
              <div className="labelStyle">Country</div>
              <div>{country}</div>
            </div>
          </div>
          <div className="description mt-4">
            <p className="mb-2 labelStyle">Description</p>
            {description}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <div>
              <img src={deleteLogo} alt="deleteLogo" />
            </div>
            <div className="ms-4">
              <img src={editLogo} alt="editLogo" />
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Accordion1;
