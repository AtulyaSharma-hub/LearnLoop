import { useState } from "react";
import axios from "axios";

function DoubtCard({

  _id,
  title,
  subject,
  urgency,
  description,

  refreshDoubts

}) {
  
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpType, setHelpType] = useState("");
  const [textHelp, setTextHelp] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const removeDoubt = async () => {

    try {

      await axios.delete(

        `http://localhost:5000/api/doubts/${_id}`

      );

      refreshDoubts();

    } catch (error) {

      console.log(error);

      alert("Failed to remove doubt");
    }
  };

  // Prevent client-side stat mutation — backend is authoritative.
  const handleHelp = async () => {
    await removeDoubt();
  };

  const submitHelp = async () => {
    if (!helpType) {
      alert("Please choose a mentorship method.");
      return;
    }

    if (helpType === "text" && !textHelp.trim()) {
      alert("Please add your explanation text.");
      return;
    }

    if ((helpType === "image" || helpType === "video") && !selectedFile) {
      alert("Please upload a file for this mentorship method.");
      return;
    }

    const currentUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );

    if (!currentUser) {
      alert("Please login first");
      return;
    }

    let creditGain = 0;
    let methodLabel = "";

    if (helpType === "text") {
      creditGain = 2;
      methodLabel = "Text Help";
    } else if (helpType === "image") {
      creditGain = 5;
      methodLabel = "Image Help";
    } else if (helpType === "video") {
      creditGain = 10;
      methodLabel = "Video Help";
    }

    const formData = new FormData();
    formData.append("helpType", helpType);
    formData.append("textHelp", textHelp);
    formData.append("mentorId", currentUser.id || currentUser._id);
    formData.append("mentorName", currentUser.name || "");
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/help/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const updatedUser = response.data.updatedUser;
      if (updatedUser) {
        const storedUser = {
          ...currentUser,
          credits: updatedUser.credits || currentUser.credits,
          sessionsCompleted:
            updatedUser.sessionsCompleted || currentUser.sessionsCompleted,
          reputation: parseFloat(
            (updatedUser.reputation || currentUser.reputation).toFixed
              ? (updatedUser.reputation || currentUser.reputation).toFixed(1)
              : Number(updatedUser.reputation || currentUser.reputation).toFixed(1)
          )
        };
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      }

      // Server has already updated the mentor's stats; remove doubt and show confirmation.
      await removeDoubt();
      alert(`You helped the student with ${methodLabel} and earned ${creditGain} credits!`);
      setShowHelpModal(false);
      setHelpType("");
      setTextHelp("");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to submit help. Please try again."
      );
    }
  };

  const handleClear = async () => {

    alert("Doubt Cleared!");

    await removeDoubt();
  };

  /* Urgency Styling */
  const urgencyColor = {

    High: "bg-red-500/20 text-red-300 border-red-400/20",
    Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-400/20",
    Low: "bg-green-500/20 text-green-300 border-green-400/20"

  };

  return (

    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:border-blue-400/20 hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

        <div>

          <div className="flex items-center gap-3 flex-wrap">

            <h2 className="text-3xl font-bold text-white leading-tight">

              {title}

            </h2>

            <span
              className={`px-4 py-1 rounded-full text-sm border ${urgencyColor[urgency] || urgencyColor["Medium"]}`}
            >

              {urgency} Priority

            </span>

          </div>

          <div className="mt-4 flex flex-wrap gap-3">

            <div className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-400/20">
              📘 {subject}
            </div>

            <div className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-400/20">
              🤝 Peer Collaboration
            </div>

          </div>

        </div>

        {/* Status */}
        <div className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-400/20 h-fit">
          Active Request
        </div>

      </div>

      {/* Description */}
      <div className="mt-8">

        <p className="text-gray-300 leading-relaxed text-lg">

          {description}

        </p>

      </div>

      {/* AI Suggestion Box */}
      <div className="mt-8 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-5">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            🤖
          </div>

          <h3 className="font-bold text-white">
            AI Learning Insight
          </h3>

        </div>

        <p className="text-gray-300 leading-relaxed">
          This doubt may benefit from a visual explanation,
          collaborative mentoring session, or recorded walkthrough.
        </p>

      </div>

      {/* Future Video Section */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h3 className="text-lg font-bold text-white">
              Video Mentorship Support
            </h3>

            <p className="text-gray-400 mt-2 text-sm">
              Upload walkthroughs or explanation videos to help students better understand concepts.
            </p>

          </div>

          <button className="px-5 py-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/20 hover:bg-purple-500/30 transition">

            Upload Video

          </button>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-wrap gap-4">

        <button

          onClick={() => setShowHelpModal(true)}

          className="px-6 py-3 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-blue-500/20 font-semibold text-white"

        >

          Help Student 

        </button>

        <button

          onClick={handleClear}

          className="px-6 py-3 rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-all duration-300"

        >

          Mark as Resolved

        </button>

      </div>

      {showHelpModal && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="glass-card p-8 w-full max-w-2xl">

            <h2 className="text-3xl font-bold text-white">
              Choose Mentorship Method
            </h2>

            <p className="text-gray-400 mt-3">
              Help the student using different teaching formats.
            </p>

            {/* OPTIONS */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">

              <button
                onClick={() => setHelpType("text")}
                className={`p-5 rounded-2xl border ${
                  helpType === "text"
                    ? "border-blue-400 bg-blue-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                ✍ Text Help
                <p className="text-sm text-gray-400 mt-2">
                  +2 Credits
                </p>
              </button>

              <button
                onClick={() => setHelpType("image")}
                className={`p-5 rounded-2xl border ${
                  helpType === "image"
                    ? "border-purple-400 bg-purple-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                🖼 Image Help
                <p className="text-sm text-gray-400 mt-2">
                  +5 Credits
                </p>
              </button>

              <button
                onClick={() => setHelpType("video")}
                className={`p-5 rounded-2xl border ${
                  helpType === "video"
                    ? "border-green-400 bg-green-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                🎥 Video Help
                <p className="text-sm text-gray-400 mt-2">
                  +10 Credits
                </p>
              </button>

            </div>

            {/* TEXT HELP */}
            {helpType === "text" && (

              <textarea
                rows="5"
                placeholder="Explain the concept..."
                value={textHelp}
                onChange={(e) => setTextHelp(e.target.value)}
                className="input-field mt-8"
              />

            )}

            {/* IMAGE / VIDEO */}
            {(helpType === "image" || helpType === "video") && (

              <input
                type="file"
                accept={
                  helpType === "image"
                    ? "image/*"
                    : "video/*"
                }
                onChange={(e) =>
                  setSelectedFile(e.target.files[0])
                }
                className="mt-8 text-white"
              />

            )}

            {/* ACTIONS */}
            <div className="flex gap-4 mt-10">

              <button
                onClick={submitHelp}
                className="primary-button px-6 py-3"
              >
                Submit Help
              </button>

              <button
                onClick={() => setShowHelpModal(false)}
                className="px-6 py-3 rounded-2xl border border-white/10 text-gray-300"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default DoubtCard;