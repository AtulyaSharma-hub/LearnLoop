function DoubtCard({
  title,
  subject,
  urgency,
  description,
  index,
  refreshDoubts
}) {

  const handleHelp = () => {

    const currentUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!currentUser) {
      alert("Please login first");
      return;
    }

    currentUser.credits += 10;
    currentUser.sessionsCompleted += 1;

    currentUser.reputation =
      (
        parseFloat(currentUser.reputation || 5) + 0.1
      ).toFixed(1);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(currentUser)
    );

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) => {

      if (user.email === currentUser.email) {
        return currentUser;
      }

      return user;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert(
      "You helped the student and earned 10 credits!"
    );
  };

  const handleClear = () => {

    const doubts =
      JSON.parse(localStorage.getItem("doubts")) || [];

     const updatedDoubts =
    doubts.filter((_, i) => i !== index);

    localStorage.setItem(
      "doubts",
      JSON.stringify(updatedDoubts)
    );

    refreshDoubts();

    alert("Doubt Cleared Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold text-blue-800">
          {title}
        </h2>

        <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm">
          {urgency}
        </span>

      </div>

      <p className="text-gray-500 mt-2">
        Subject: {subject}
      </p>

      <p className="mt-4 text-gray-700">
        {description}
      </p>

      <div className="flex gap-4 mt-6">

        <button
          onClick={handleHelp}
          className="bg-blue-700 text-white px-5 py-2 rounded-xl hover:bg-blue-800"
        >
          Help Student
        </button>

        <button
          onClick={handleClear}
          className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
        >
          Clear Doubt
        </button>

      </div>

    </div>
  );
}

export default DoubtCard;