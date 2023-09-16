import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from 'react-bootstrap';


const MyFlixApplication = () => {
  return (
  <Container>
    <MainView />
  </Container>
  )
};


const container = document.querySelector("#root");
const root = createRoot(container);


root.render(<MyFlixApplication />);