import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<ImageUpload />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/result" element={<Result />} />
              <Route path="/error" element={<ErrorMessage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
