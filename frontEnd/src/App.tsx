import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { CreateToDoPage } from "./pages/CreateToDoPage/CreateToDoPage";
import Footer from "./components/Footer/Footer"; // Adjust the import path as needed

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo/new" element={<CreateToDoPage />} />
            {/* <Route path="/todo/:id/edit" element={<EditToDoPage />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
