import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Dashboard() {

  const [user, setUser] = useState(null);

  const [doubts, setDoubts] = useState([]);

  const fetchDoubts = async () => {

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

    const storedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    setUser(storedUser);

    fetchDoubts();

  }, []);

  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden relative px-6 py-10">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-blue-200 mb-6">
                LearnLoop Student Workspace
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight">

                Welcome Back,
                <br />

                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">

                  {user?.name || "Learner"}

                </span>

              </h1>

              <p className="text-gray-300 mt-6 text-lg max-w-2xl leading-relaxed">
                Continue collaborating, solving doubts, earning knowledge
                credits, and growing within the LearnLoop ecosystem.
              </p>

            </div>

            {/* Credits Card */}
            <div className="bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 min-w-70 shadow-2xl">

              <p className="text-gray-300 text-sm">
                Knowledge Credits
              </p>

              <h2 className="text-5xl font-black mt-3 text-white">

                {user?.credits || 0}

              </h2>

              <p className="text-blue-300 mt-4 text-sm">
                Earn more by helping peers solve doubts.
              </p>

            </div>

          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {/* Active Requests */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-6">
                📚
              </div>

              <h2 className="text-xl font-bold text-white">
                Active Requests
              </h2>

              <p className="text-5xl mt-5 font-black text-blue-400">
                {doubts.length}
              </p>

              <p className="text-gray-400 mt-4">
                Students currently seeking mentorship
              </p>

            </div>

            {/* Sessions */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl mb-6">
                🎓
              </div>

              <h2 className="text-xl font-bold text-white">
                Sessions Completed
              </h2>

              <p className="text-5xl mt-5 font-black text-purple-400">
                {user?.sessionsCompleted || 0}
              </p>

              <p className="text-gray-400 mt-4">
                Collaborative learning sessions completed
              </p>

            </div>

            {/* Reputation */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl mb-6">
                ⭐
              </div>

              <h2 className="text-xl font-bold text-white">
                Reputation Score
              </h2>

              <p className="text-5xl mt-5 font-black text-green-400">
                {user?.reputation || 5}
              </p>

              <p className="text-gray-400 mt-4">
                Community trust and mentoring impact
              </p>

            </div>

          </div>

          {/* Recent Doubts Section */}
          <div className="mt-14 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10">

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  Recent Help Requests
                </h2>

                <p className="text-gray-400 mt-3">
                  Live student doubts flowing through the ecosystem
                </p>

              </div>

              <div className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-400/20">
                Live Feed
              </div>

            </div>

            <div className="mt-10 space-y-5">

              {doubts.length === 0 ? (

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">

                  <div className="text-5xl mb-5">
                    🎉
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    No Doubts Available
                  </h3>

                  <p className="text-gray-400 mt-4">
                    The community has successfully resolved all active doubts.
                  </p>

                </div>

              ) : (

                doubts.map((doubt) => (

                  <div
                    key={doubt._id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-400/20 transition-all duration-300"
                  >

                    <div className="flex items-start justify-between gap-4 flex-wrap">

                      <div>

                        <h3 className="text-2xl font-bold text-blue-300">
                          {doubt.title}
                        </h3>

                        <p className="text-gray-400 mt-3">
                          Subject: {doubt.subject}
                        </p>

                      </div>

                      <div className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-400/20">
                        Active
                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;