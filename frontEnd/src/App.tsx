import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { CreateToDoPage } from "./pages/CreateToDoPage/CreateToDoPage";
import Footer from "./components/Footer/Footer";
import { EditToDoPage } from "./pages/EditToDoPage/EditToDoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo/new" element={<CreateToDoPage />} />
            <Route path="/todo/edit/:id" element={<EditToDoPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
