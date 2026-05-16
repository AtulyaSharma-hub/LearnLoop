import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

function AskDoubt() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("Medium");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !subject || !topic || !description) {

      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(

        "http://localhost:5000/api/doubts",

        {
          title,
          subject,
          topic,
          description,
          urgency,
          language
        }

      );

      console.log(response.data);

      alert("Doubt Submitted Successfully!");

      setTitle("");
      setSubject("");
      setTopic("");
      setDescription("");
      setUrgency("Medium");
      setLanguage("English");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to submit doubt"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden relative px-6 py-12">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-blue-200 mb-8">
              AI Assisted Collaborative Learning
            </div>

            <h1 className="text-6xl font-black leading-tight">

              Ask.
              <br />

              Learn.
              <br />

              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Collaborate.
              </span>

            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-xl">
              Post your academic doubts, connect with peer mentors,
              receive AI-guided learning support, and become part of
              a smarter collaborative ecosystem.
            </p>

            {/* Feature Cards */}
            <div className="mt-12 space-y-5">

              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-md">
                <p className="text-blue-200 text-sm">
                  ⚡ Real-time peer doubt solving
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-sm ml-10">
                <p className="text-purple-200 text-sm">
                  🤖 AI-powered learning assistance
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-md">
                <p className="text-green-200 text-sm">
                  🎓 Earn and exchange knowledge credits
                </p>
              </div>

            </div>

          </div>

          {/* Form Section */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10">

            <div>

              <h2 className="text-4xl font-bold text-white">
                Submit Doubt
              </h2>

              <p className="text-gray-300 mt-4">
                Reach out to the LearnLoop community for guidance
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              {/* Question Title */}
              <div>

                <label className="text-sm text-gray-300">
                  Question Title
                </label>

                <input
                  type="text"
                  placeholder="Enter question title"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-blue-400 transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

              </div>

              {/* Subject */}
              <div>

                <label className="text-sm text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Example: Data Structures"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-purple-400 transition"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

              </div>

              {/* Topic */}
              <div>

                <label className="text-sm text-gray-300">
                  Topic
                </label>

                <input
                  type="text"
                  placeholder="Example: Graph Algorithms"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-blue-400 transition"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />

              </div>

              {/* Selects */}
              <div className="grid md:grid-cols-2 gap-5">

                {/* Language */}
                <div>

                  <label className="text-sm text-gray-300">
                    Preferred Language
                  </label>

                  <select
                    className="mt-2 w-full bg-white/5 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-purple-400 transition"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >

                    <option className="bg-[#0B1020]">
                      English
                    </option>

                    <option className="bg-[#0B1020]">
                      Hindi
                    </option>

                  </select>

                </div>

                {/* Urgency */}
                <div>

                  <label className="text-sm text-gray-300">
                    Urgency Level
                  </label>

                  <select
                    className="mt-2 w-full bg-white/5 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-blue-400 transition"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                  >

                    <option className="bg-[#0B1020]">
                      High
                    </option>

                    <option className="bg-[#0B1020]">
                      Medium
                    </option>

                    <option className="bg-[#0B1020]">
                      Low
                    </option>

                  </select>

                </div>

              </div>

              {/* Description */}
              <div>

                <label className="text-sm text-gray-300">
                  Describe Your Doubt
                </label>

                <textarea
                  rows="6"
                  placeholder="Explain your doubt in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-purple-400 transition resize-none"
                ></textarea>

              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/20 font-semibold text-white"
              >

                {loading ? "Submitting..." : "Submit Request"}

              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default AskDoubt;