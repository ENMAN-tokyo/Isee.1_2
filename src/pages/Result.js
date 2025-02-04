import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Questionnaire.css";
import "./Result.css";
import home from "../image/home.png"

function Result({ submitToDify, answers }) {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const currentQuestionId = location.state?.currentQuestionId || 25; // 受け取ったcurrentQuestionIdを使用（デフォルト25）
  const [showMessage, setShowMessage] = useState(false); // メッセージ表示用の状態

  const handleSubmitToDify = async () => {
    setShowMessage(true); // メッセージを表示
    
    // Difyに送信
    await submitToDify(answers);
    navigate("/chat-screen"); // 最終画面へ遷移（任意の画面）
  };

  const handleGoBack = () => {
    if (currentQuestionId === 25) {
      navigate(`/question/25`); // 質問IDが25のページに戻る
    }
  };

  const handleGoHome = () => {
    navigate("/"); // ホームに戻る
  };

  return (
    <div className="result-page">    
      <button className="result-button" onClick={handleSubmitToDify}>
        結果をみる
      </button>

      {/* 赤字のメッセージを表示 */}
      {showMessage && (
        <p className="error-message">
          クリックされました。結果を表示するまで少しお待ちください。
        </p>
      )}

      <div className="result-message">
        ※ボタンは1回だけクリックしてください。
      </div>
    </div>
  );
}

export default Result;