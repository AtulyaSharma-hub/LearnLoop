import { useEffect, useState } from "react";

function Dashboard() {

  const [user, setUser] = useState(null);
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {

    const storedUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    setUser(storedUser);

    const storedDoubts =
      JSON.parse(localStorage.getItem("doubts")) || [];

    setDoubts(storedDoubts);

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold text-blue-900">
            Student Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            {user ? `Welcome ${user.name}` : "Welcome to LearnLoop"}
          </p>
        </div>

        <div className="bg-blue-700 text-white px-6 py-3 rounded-xl">
          Knowledge Credits: {user?.credits || 0}
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-blue-800">
            Active Requests
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {doubts.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-purple-800">
            Sessions Completed
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {user?.sessionsCompleted || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-green-700">
            Reputation Score
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {user?.reputation || 5.0} ★
          </p>
        </div>

      </div>

      {/* Recent Doubts */}
      <div className="bg-white p-8 rounded-2xl shadow-md mt-10">

        <h2 className="text-2xl font-bold text-gray-800">
          Recent Help Requests
        </h2>

        <div className="mt-6 space-y-4">

          {doubts.length === 0 ? (

            <p className="text-gray-500">
              No doubts available yet.
            </p>

          ) : (

            doubts.map((doubt, index) => (

              <div
                key={index}
                className="border p-4 rounded-xl"
              >

                <h3 className="font-bold text-blue-700">
                  {doubt.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  Subject: {doubt.subject}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;