import Navbar from "../components/Navbar";
import { useState } from "react";
function AskDoubt() {
    const [title, setTitle] = useState("");
const [subject, setSubject] = useState("");
const [topic, setTopic] = useState("");
const [description, setDescription] = useState("");
   const handleSubmit = (e) => {

  e.preventDefault();

  if (!title || !subject || !topic || !description) {
    alert("Please fill all fields");
    return;
  }
   const newDoubt = {
  title,
  subject,
  topic,
  description,
  urgency: "Medium"
};

const existingDoubts =
  JSON.parse(localStorage.getItem("doubts")) || [];

existingDoubts.push(newDoubt);

localStorage.setItem(
  "doubts",
  JSON.stringify(existingDoubts)
);
  alert("Doubt Submitted Successfully!");
  setTitle("");
setSubject("");
setTopic("");
setDescription("");
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center py-12">

        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">

          <h1 className="text-4xl font-bold text-blue-800">
            Ask a Doubt
          </h1>

          <p className="text-gray-500 mt-2">
            Connect with peer tutors and get help instantly
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            <input
              type="text"
              placeholder="Question Title"
              className="w-full border p-3 rounded-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border p-3 rounded-xl"
              value={subject}
onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="text"
              placeholder="Topic"
              className="w-full border p-3 rounded-xl"
              value={topic}
onChange={(e) => setTopic(e.target.value)}
            />

            <select className="w-full border p-3 rounded-xl">

              <option>
                Preferred Language
              </option>

              <option>
                English
              </option>

              <option>
                Hindi
              </option>

            </select>

            <select className="w-full border p-3 rounded-xl">

              <option>
                Urgency Level
              </option>

              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>

            </select>

            <textarea
              rows="5"
              placeholder="Describe your doubt..."
              value={description}
onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-xl"
            ></textarea>

            <button className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800">

              Submit Request

            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AskDoubt;