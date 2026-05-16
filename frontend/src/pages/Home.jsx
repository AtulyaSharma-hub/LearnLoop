import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden">
      <Navbar />

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left Content */}
        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-blue-200 mb-8">
            AI Powered Collaborative Learning Ecosystem
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">

            Learn Smarter.
            <br />

            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Teach Better.
            </span>

            <br />
            Grow Together.

          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl">
            LearnLoop transforms isolated studying into an interactive peer-to-peer
            ecosystem where students teach, collaborate, earn knowledge credits,
            and grow together through AI-enhanced learning experiences.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap gap-5">

            <Link to="/register">
              <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/20 font-semibold">
                Get Started
              </button>
            </Link>

            <Link to="/feed">
              <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 font-semibold">
                Explore Platform
              </button>
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-10">

            <div>
              <h2 className="text-4xl font-bold text-blue-400">500+</h2>
              <p className="text-gray-400 mt-1">Active Learners</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-purple-400">1200+</h2>
              <p className="text-gray-400 mt-1">Sessions Conducted</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-green-400">95%</h2>
              <p className="text-gray-400 mt-1">Satisfaction Rate</p>
            </div>

          </div>

        </div>

        {/* Right Side Visual */}
        <div className="relative flex items-center justify-center">

          {/* Main Glass Card */}
          <div className="w-85 md:w-105 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                Live Learning Session
              </h2>

              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                Live
              </span>
            </div>

            {/* Chat Mockup */}
            <div className="space-y-4">

              <div className="bg-blue-500/20 p-4 rounded-2xl">
                <p className="text-sm text-blue-100">
                  Can someone explain Dijkstra’s Algorithm?
                </p>
              </div>

              <div className="bg-purple-500/20 p-4 rounded-2xl ml-8">
                <p className="text-sm text-purple-100">
                  Sure! Think of it as finding the shortest safe path...
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-sm text-gray-300">
                  AI Suggestion: Visualize the graph step-by-step for easier understanding.
                </p>
              </div>

            </div>

          </div>

          {/* Floating Elements */}
          <div className="absolute -top-8 -left-8 bg-blue-500/20 border border-blue-400/20 backdrop-blur-xl px-5 py-3 rounded-2xl">
            <p className="text-sm text-blue-200">
              +15 Knowledge Credits Earned
            </p>
          </div>

          <div className="absolute -bottom-8 -right-8 bg-purple-500/20 border border-purple-400/20 backdrop-blur-xl px-5 py-3 rounded-2xl">
            <p className="text-sm text-purple-200">
              AI Mentor Connected
            </p>
          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Why Students Love LearnLoop
          </h2>

          <p className="mt-5 text-gray-400 text-lg max-w-3xl mx-auto">
            A collaborative ecosystem designed to make learning interactive,
            rewarding, and community-driven.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-6">
              ⚡
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Real-Time Doubt Solving
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Instantly connect with peer tutors and resolve academic doubts
              through interactive live learning sessions.
            </p>

          </div>

          <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl mb-6">
              🎓
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Knowledge Credit System
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Earn credits by teaching others and redeem them later to seek
              mentorship in topics you struggle with.
            </p>

          </div>

          <div className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl mb-6">
              🤝
            </div>

            <h3 className="text-2xl font-bold mb-4">
              AI + Human Collaboration
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Blend peer mentorship with intelligent AI guidance to create
              a smarter and more engaging learning experience.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;