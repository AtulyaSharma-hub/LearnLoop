import Navbar from "../components/Navbar";
import DoubtCard from "../components/DoubtCard";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

function DoubtFeed() {

  const [doubts, setDoubts] = useState([]);
  const [message, setMessage] = useState("");

  const refreshDoubts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/doubts"
      );

      setDoubts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    refreshDoubts();

  }, []);

  const handleDoubtCleared = () => {

    setMessage("Doubt Cleared Successfully!");

    refreshDoubts();

    setTimeout(() => {

      setMessage("");

    }, 3000);
  };

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-[#0B1020] text-white relative overflow-hidden px-6 py-10">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-blue-200 mb-6">
                Live Collaborative Learning Feed
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight">

                Active
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}Doubt Feed
                </span>

              </h1>

              <p className="text-gray-300 mt-6 text-lg max-w-2xl leading-relaxed">
                Help students solve academic doubts, collaborate in real-time,
                earn knowledge credits, and strengthen the learning ecosystem.
              </p>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 min-w-40">

                <h2 className="text-3xl font-bold text-blue-400">
                  {doubts.length}
                </h2>

                <p className="text-gray-400 mt-1 text-sm">
                  Active Doubts
                </p>

              </div>

              <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 min-w-40">

                <h2 className="text-3xl font-bold text-purple-400">
                  24/7
                </h2>

                <p className="text-gray-400 mt-1 text-sm">
                  Peer Collaboration
                </p>

              </div>

            </div>

          </div>

          {/* Success Message */}
          {message && (

            <div className="mt-8 bg-green-500/20 border border-green-400/20 text-green-200 p-5 rounded-2xl backdrop-blur-xl">

              {message}

            </div>

          )}

          {/* Feed Section */}
          <div className="mt-12">

            {doubts.length === 0 ? (

              <div className="bg-white/10 border border-white/10 backdrop-blur-xl p-12 rounded-3xl text-center">

                <div className="text-6xl mb-5">
                  🎉
                </div>

                <h2 className="text-3xl font-bold text-white">

                  No Active Doubts

                </h2>

                <p className="text-gray-400 mt-4 text-lg">

                  Amazing! All student doubts have been resolved successfully.

                </p>

              </div>

            ) : (

              <div className="grid gap-8">

                {doubts.map((doubt) => (

                  <div
                    key={doubt._id}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-2 hover:border-blue-400/20 transition-all duration-300"
                  >

                    <DoubtCard
                      _id={doubt._id}
                      title={doubt.title}
                      subject={doubt.subject}
                      urgency={doubt.urgency}
                      description={doubt.description}
                      refreshDoubts={handleDoubtCleared}
                    />

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default DoubtFeed;