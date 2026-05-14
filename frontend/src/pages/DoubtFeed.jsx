import Navbar from "../components/Navbar";
import DoubtCard from "../components/DoubtCard";
import { useEffect, useState } from "react";

function DoubtFeed() {

  const [doubts, setDoubts] = useState([]);

useEffect(() => {
  const storedDoubts =
    JSON.parse(localStorage.getItem("doubts")) || [];

  setDoubts(storedDoubts);
}, []);
const refreshDoubts = () => {

  const storedDoubts =
    JSON.parse(localStorage.getItem("doubts")) || [];

  setDoubts(storedDoubts);
};
useEffect(() => {

  refreshDoubts();

}, []);
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-bold text-blue-900">
              Doubt Feed
            </h1>

            <p className="text-gray-500 mt-2">
              Help students and earn Knowledge Credits
            </p>
          </div>

        </div>

        <div className="grid gap-8 mt-10">

          {doubts.map((doubt, index) => (
            <DoubtCard
              key={index}
              index={index}
              title={doubt.title}
              subject={doubt.subject}
              urgency={doubt.urgency}
              description={doubt.description}
              refreshDoubts={refreshDoubts}
            />
          ))}

        </div>

      </div>
    </>
  );
}

export default DoubtFeed;