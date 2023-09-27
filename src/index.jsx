import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import "bootstrap/dist/css/bootstrap.min.css";


>>>>>>> Stashed changes
=======
import "bootstrap/dist/css/bootstrap.min.css";


>>>>>>> fd1a08dd06cd3887245f0f953e0d0f62190ce288

const MyFlixApplication = () => {
<<<<<<< HEAD
<<<<<<< Updated upstream
  return <MainView />;
=======
=======
>>>>>>> fd1a08dd06cd3887245f0f953e0d0f62190ce288
  return (
    <MainView />
  
  )
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> fd1a08dd06cd3887245f0f953e0d0f62190ce288
};


const container = document.querySelector("#root");
const root = createRoot(container);


root.render(<MyFlixApplication />);