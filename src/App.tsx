import { useState } from "react";
import "./App.css";
import Accordion1 from "./components/Accordion1";
import { Container } from "react-bootstrap";
import { celebrities } from "./constants/celebrities";
import searchIcon from "./assets/images/search.svg";

interface Celebrity {
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
function App() {
  const datas: Celebrity[] = celebrities();
  const [celebritiesData, setCelebritiesData] = useState<Celebrity[]>(datas);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleDelete = (id: number) => {
    const updatedData = celebritiesData.filter((data) => data.id !== id);
    setCelebritiesData(updatedData);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredCelebrities = celebritiesData.filter((celebrity) =>
    `${celebrity.first} ${celebrity.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Container>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="search-bar col-12 col-md-6">
            <img src={searchIcon} alt="Search icon" />
            <input
              type="text"
              placeholder="Search user"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {filteredCelebrities.map((data) => (
            <Accordion1
              key={data.id}
              data={data}
              style={{ marginTop: "20px" }}
              onDelete={() => handleDelete(data.id)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
