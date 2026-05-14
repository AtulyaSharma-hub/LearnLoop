import { useState } from "react";
import axios from "axios";

function AIAssistant() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!question) {
      alert("Please enter a question");
      return;
    }

    try {

      setLoading(true);

      const response =
        await axios.post(
          "http://localhost:5000/api/ai/ask-ai",
          {
            question
          }
        );

      setAnswer(response.data.answer);

    } catch (error) {

      alert("AI request failed");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-blue-900">
          AI Learning Assistant
        </h1>

        <p className="text-gray-500 mt-3">
          Ask any academic doubt instantly
        </p>

        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }

          placeholder="Ask your doubt here..."

          className="w-full border p-4 rounded-xl mt-8 h-40 outline-none"
        />

        <button
          onClick={askAI}

          className="bg-blue-700 text-white px-6 py-3 rounded-xl mt-6 hover:bg-blue-800"
        >

          {loading ? "Thinking..." : "Ask AI"}

        </button>

        {answer && (

          <div className="bg-gray-50 p-6 rounded-xl mt-8 border">

            <h2 className="text-2xl font-bold text-green-700">
              AI Response
            </h2>

            <p className="mt-4 text-gray-700 whitespace-pre-line">
              {answer}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIAssistant;