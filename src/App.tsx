import { useState } from "react";
import "./App.css";
import Accordion1 from "./components/Accordion1";
import { Container } from "react-bootstrap";
import { celebrities } from "./constants/celebrities";

function App() {
  const [count, setCount] = useState(0);

  const datas = celebrities();

  return (
    <>
      <Container>
        <div className="d-flex flex-column align-items-center justify-content-center">
          {datas.map((data) => (
            <Accordion1
              key={data.id}
              data={data}
              style={{ marginTop: "20px" }}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
