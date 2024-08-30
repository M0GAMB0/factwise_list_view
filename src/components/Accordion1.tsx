import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import "../assets/styles/accordionStyle.css";
import deleteLogo from "../assets/images/delete.svg";
import editLogo from "../assets/images/edit.svg";
import cancelLogo from "../assets/images/cancel.svg";
import successLogo from "../assets/images/success.svg";
import AlertModal from "./AlertModal";

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

type SetCelebritiesData = React.Dispatch<React.SetStateAction<DataProps[]>>;

interface Accordion1Props {
  data: DataProps;
  style?: React.CSSProperties;
  onDelete: () => void;
}

const Accordion1: React.FC<Accordion1Props> = ({ data, style, onDelete }) => {
  const [listData, setListData] = useState(data);
  const [originalData, setOriginalData] = useState(data); // Store original data
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

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

  const calculateDOBFromAge = (age: number): string => {
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    const birthMonth = today.getMonth() + 1; // Months are zero-based in JS
    const birthDate = today.getDate();

    return `${birthYear}-${birthMonth.toString().padStart(2, "0")}-${birthDate
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setListData((prevData) => {
      if (name === "age") {
        const newDOB = calculateDOBFromAge(Number(value));
        return { ...prevData, dob: newDOB };
      }
      return { ...prevData, [name]: value };
    });
  };
  const onDeleteChange = () => {
    onDelete();
    setAlertShow(false);
  };

  const handleCancel = () => {
    setListData(originalData); // Restore the original data
    setIsEditMode(false); // Exit edit mode
  };

  const { id, first, last, dob, gender, email, picture, country, description } =
    listData;

  return (
    <>
      <Accordion className="col-12 col-md-6" flush style={style}>
        <Accordion.Item eventKey={`${id}`}>
          <Accordion.Header>
            <img
              src={picture}
              alt="celebrity picture"
              style={{ borderRadius: "50%" }}
              height={55}
              width={55}
            />
            <span className="ms-4 listName">
              {first} {last}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="col-4">
                <div className="labelStyle">Age</div>
                {isEditMode ? (
                  <Form.Control
                    type="number"
                    placeholder=""
                    name="age"
                    value={calculateAge(dob)}
                    onChange={handleChange}
                  />
                ) : (
                  <div>{calculateAge(dob)} Years</div>
                )}
              </div>
              <div className="col-4">
                <div className="labelStyle">Gender</div>
                {isEditMode ? (
                  <Form.Select
                    aria-label="Default select example"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="rather not to say">Rather Not to Say</option>
                  </Form.Select>
                ) : (
                  <div className="text-capitalize">{gender}</div>
                )}
              </div>
              <div className="col-4">
                <div className="labelStyle">Country</div>
                {isEditMode ? (
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="country"
                    value={country}
                    onChange={handleChange}
                  />
                ) : (
                  <div>{country}</div>
                )}
              </div>
            </div>
            <div className="description mt-4">
              <p className="mb-2 labelStyle">Description</p>
              {isEditMode ? (
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              ) : (
                description
              )}
            </div>
            <div className="d-flex justify-content-end mt-4">
              {isEditMode ? (
                <>
                  <div onClick={handleCancel}>
                    <img
                      src={cancelLogo}
                      alt="cancelLogo"
                      className="toolIcon"
                    />
                  </div>
                  <div className="ms-4" onClick={() => setIsEditMode(false)}>
                    <img
                      src={successLogo}
                      alt="successLogo"
                      className="toolIcon"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div onClick={() => setAlertShow(true)}>
                    <img
                      src={deleteLogo}
                      alt="deleteLogo"
                      className="toolIcon"
                    />
                  </div>
                  <div
                    className="ms-4"
                    onClick={() => {
                      setOriginalData(listData);
                      setIsEditMode(true);
                    }}
                  >
                    <img src={editLogo} alt="editLogo" className="toolIcon" />
                  </div>
                </>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <AlertModal
        visibility={alertShow}
        text="Are you sure you want to delete?"
        onClose={() => setAlertShow(false)}
        acceptFunction={onDeleteChange}
      />
    </>
  );
};

export default Accordion1;
