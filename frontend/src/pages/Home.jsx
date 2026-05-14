import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100">
      <Navbar />
      {/* Hero Section */}
      <div className="text-center py-20 px-6">

        <h1 className="text-6xl font-bold text-blue-900">
          LearnLoop
        </h1>

        <p className="text-2xl mt-4 text-gray-700 font-medium">
          Learn. Teach. Grow Together.
        </p>

        <p className="max-w-4xl mx-auto mt-8 text-lg text-gray-600 leading-relaxed">
          LearnLoop is a peer-to-peer learning ecosystem where students
          can request help on specific topics and other verified students
          can teach them through interactive learning sessions.
        </p>

        <div className="mt-10 flex justify-center gap-6">

        <Link to="/register">

  <button className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800 transition">

    Get Started

  </button>

</Link>

<Link to="/feed">

  <button className="bg-white border border-blue-700 text-blue-700 px-8 py-3 rounded-xl hover:bg-blue-50 transition">

    Explore Platform

  </button>

</Link>

        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800">
            Real-Time Doubt Solving
          </h2>

          <p className="mt-4 text-gray-600">
            Connect with peer tutors instantly and solve academic doubts
            through interactive sessions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-purple-800">
            Knowledge Credits
          </h2>

          <p className="mt-4 text-gray-600">
            Earn credits by teaching others and use them later to seek help
            in subjects you struggle with.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-700">
            Collaborative Learning
          </h2>

          <p className="mt-4 text-gray-600">
            Transform isolated learning into a community-driven ecosystem
            powered by mentorship and mutual growth.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Home;