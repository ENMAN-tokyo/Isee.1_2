import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Routerのnavigateをインポート
import questions from "../data/questions"; // 質問データをインポート
import ProgressBar from "./ProgressBar"; // 進捗バーをインポート
import "./Questionnaire.css"; // スタイルシートのインポート
import home from "../image/home.png"

function Questionnaire({ submitToDify, setAnswers, answers }) {
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // 現在の質問のID
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const currentQuestionIndex = questions.findIndex((q) => q.id === currentQuestionId);
  const progress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100); // 進捗バーの計算
  const currentQuestion = questions.find((q) => q.id === currentQuestionId); // 現在の質問を取得

  // 質問文を関数として扱う場合、answersを渡して表示内容を変更
  const questionText = typeof currentQuestion.question === "function" 
    ? currentQuestion.question(answers) 
    : currentQuestion.question;

  const handleOptionClick = async (option) => {
    setAnswers((prevAnswers) => {
      // 既存の回答を保持し、現在の質問の回答を追加
      const updatedAnswers = {
        ...prevAnswers, // 既存の回答を保持
        [`question_${currentQuestionId}`]: option.value, // 新しい質問の回答を追加
      };
  
      let nextQuestionId = option.next;

      // next が関数の場合は answers を渡して評価
      if (typeof option.next === "function") {
        nextQuestionId = option.next(updatedAnswers);
      }
      
      // 最終質問の場合、Difyに送信
      if (currentQuestionId === 25) {
        navigate("/result", { state: { currentQuestionId } }); // 最後の質問が終わったら結果画面に遷移
      } else if (nextQuestionId) {
        // 次の質問へ進む
        setCurrentQuestionId(nextQuestionId);
      }

      return updatedAnswers; // 新しい状態を返す
    });
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      // 前の質問に戻る
      setCurrentQuestionId(questions[currentQuestionIndex - 1].id);
    }
  };

  // ホーム画面に戻る処理
  const handleGoHome = () => {
    navigate("/"); // "/" はホーム画面のルート
  };

  if (!currentQuestion) {
    return <div>質問が見つかりません。</div>;
  }

  return (
    <div className="questionnaire-container">
      {/* 戻るボタン */}
      {currentQuestionIndex > 0 && (
        <button
          onClick={handleGoBack}
          className="back-button"
        >
          ←前に戻る
        </button>
      )}

      {/* ホームに戻るボタン */}
        <button
          onClick={handleGoHome}
          className="home-button"
        >
          <img src={home} alt="home-icon" className="home-icon" />ホームに戻る
        </button>

      {/* 進捗バー */}
      <ProgressBar progress={progress} className="progress-bar-container" />


      {/* 質問文 */}
      <h2 className="question-text">
        {questionText.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h2>

      {/* 選択肢のボタン */}
      <div className="option-buttons">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="option-button"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;
