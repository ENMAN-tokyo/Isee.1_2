import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import "./Home.css"; // 必要に応じてスタイルシートをインポート
import ic_logo from "../image/ic_logo.png"

function Home() {
  const navigate = useNavigate(); // navigate関数を使う

  const handleLogin = () => {
    navigate("/questionnaire");
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={ic_logo} alt="Logo" className="logo" />
      </div>
      
      {/* ログインボタン */}
      <button className="consult-button" onClick={handleLogin}>
        はじめる
      </button>
    </div>
  );
}

export default Home;
