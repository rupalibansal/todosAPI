import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage/HomePage";
import { CreateToDoPage } from "./pages/CreateToDoPage/CreateToDoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>My Todo App</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo/new" element={<CreateToDoPage />} />
          {/* <Route path="/todo/:id/edit" element={<EditToDoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
