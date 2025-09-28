import { useState } from "react";

function CalendarBody() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);

  const days = getDaysInMonth(year, month);

  const dummyPanchang = {
    "2025-09-01": { tithi: "Pratipada", festival: "Ganesh Chaturthi" },
    "2025-09-02": { tithi: "Dvitiya", festival: null },
    "2025-09-03": { tithi: "Tritiya", festival: "Navratri Begins" },
  };

  return (
    <>
      <h1 className="bg-orange-500 text-3xl font-bold text-blue-600 mb-6">Panchang Calendar</h1>
      {/* Month & Year Selection */}
      <div className="flex gap-4 mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[
            "January","February","March","April","May","June",
            "July","August","September","October","November","December",
          ].map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 bg-orange-500 p-4 rounded shadow">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-bold text-center">{d}</div>
        ))}
        {Array(days[0].getDay()).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = day.toISOString().slice(0, 10);
          const panchang = dummyPanchang[dateStr];
          return (
            <div
              key={dateStr}
              className={`border rounded p-2 text-center cursor-pointer hover:bg-red-900 ${
                selectedDate.toDateString() === day.toDateString()
                  ? "bg-red-900"
                  : ""
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <p className="font-bold">{day.getDate()}</p>
              {panchang?.festival && (
                <p className="text-sm text-red-500">{panchang.festival}</p>
              )}
            </div>
          );
        })}
      </div>
      {/* Selected Date Panchang */}
      <div className="mt-6 p-4 bg-red-800 rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">
          Panchang for {selectedDate.toDateString()}
        </h2>
        {dummyPanchang[selectedDate.toISOString().slice(0, 10)] ? (
          <>
            <p>Tithi: {dummyPanchang[selectedDate.toISOString().slice(0, 10)].tithi}</p>
            <p>
              Festival:{" "}
              {dummyPanchang[selectedDate.toISOString().slice(0, 10)].festival || "None"}
            </p>
          </>
        ) : (
          <p>No Panchang data for this date.</p>
        )}
      </div>
    </>
  );
}

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default CalendarBody;