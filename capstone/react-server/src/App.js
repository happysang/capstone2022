import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ImageUpload from "./pages/ImageUpload";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import "./App.css";
import axios from "axios";

function App() {
  // 요청받은 정보를 담아줄 변수 선언
  const [testStr, setTestStr] = useState("");
  const [readall, setReadall] = useState("");

  // 변수 초기화
  function callback(str) {
    setTestStr(str);
  }

  function callback2(str) {
    setReadall(str);
  }

  //첫 번째 렌더링을 마친 후 실행
  useEffect(() => {
    axios({
      url: "home",
      method: "GET",
    }).then((res) => {
      callback(res.data);
    });
  }, []);

  useEffect(() => {
    axios({
      url: "readall",
      method: "GET",
    }).then((res) => {
      callback2(res.data[0].loginId);
    });
  }, []);

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </BrowserRouter>
      <div>
        {testStr}
        <p key={"key"}>{readall}</p>
      </div>
    </React.Fragment>
  );
}

export default App;
