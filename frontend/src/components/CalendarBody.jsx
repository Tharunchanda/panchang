import { useState, useEffect, useMemo } from "react";

// Data for the animated header
const languages = [
  { name: "Sanskrit", word: "पञ्चाङ्गम्" },
  { name: "English", word: "Panchangam" },
  { name: "Hindi", word: "पञ्चाङ्ग" },
  { name: "Tamil", word: "பஞ்சாங்கம்" },
  { name: "Telugu", word: "పంచాంగం" },
  { name: "Kannada", word: "ಪಂಚಾಂಗ" },
  { name: "Bengali", word: "পঞ্জিকা" },
  { name: "Gujarati", word: "પંચાંગ" },
  { name: "Marathi", word: "पंचांग" },
];

// Component to handle the heading animation
function AnimatedHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date()); // State for the clock

  useEffect(() => {
    // Interval for language animation
    const languageIntervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 5000);

    // Interval for the real-time clock
    const timeIntervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear both intervals on component unmount
    return () => {
      clearInterval(languageIntervalId);
      clearInterval(timeIntervalId);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    // Adjusted height to accommodate the new clock
    <div className="text-center mb-6 pb-4 border-b-2 border-teal-800/50 h-32">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 drop-shadow-lg transition-all duration-300">
        ~ 🕉️ ~ {languages[currentIndex].word} ~ 🕉️ ~
      </h1>
      <p className="text-slate-600 mt-1 font-sans"><strong>An Authentic Hindu Calendar</strong></p>
      {/* Display the real-time clock */}
      <div className="text-lg text-teal-700 font-mono mt-2">
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}


// Main Calendar Component
function CalendarBody() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const days = useMemo(
    () => getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  );
  
  // Array for Indian weekday names (Vara)
  const indianWeekdays = [
    "Ravivara",    // Sunday
    "Somavara",    // Monday
    "Mangalavara", // Tuesday
    "Budhavara",   // Wednesday
    "Guruvara",    // Thursday
    "Shukravara",  // Friday
    "Shanivara"    // Saturday
  ];

  // --- Mock Panchangam Data ---
  const dummyPanchang = {
    // START: Added data for September 30th
    "2025-09-30": { // Data for today, September 30th, 2025
      tithi: "Navami upto 8:15 PM",
      paksha: "Shukla Paksha",
      festival: "Mahanavami",
      nakshatra: "Uttara Ashadha",
      yoga: "Atiganda",
      vikramSamvat: "2082",
      sakaSamvat: "1947",
      sunrise: "06:16 AM",
      sunset: "06:08 PM",
      rahuKalam: "03:08 PM - 04:38 PM",
    },
    // END: Added data
    "2025-10-19": {
      tithi: "Amavasya",
      paksha: "Krishna Paksha",
      festival: "Diwali",
      nakshatra: "Chitra",
      yoga: "Priti",
      vikramSamvat: "2082",
      sakaSamvat: "1947",
      sunrise: "06:25 AM",
      sunset: "05:58 PM",
      rahuKalam: "07:55 AM - 09:20 AM",
    },
    "2025-10-20": {
      tithi: "Pratipada",
      paksha: "Shukla Paksha",
      festival: "Govardhan Puja",
      nakshatra: "Swati",
      yoga: "Ayushman",
      vikramSamvat: "2082",
      sakaSamvat: "1947",
      sunrise: "06:26 AM",
      sunset: "05:57 PM",
      rahuKalam: "03:10 PM - 04:35 PM",
    },
    "2025-11-03": {
      tithi: "Kartik Purnima",
      paksha: "Shukla Paksha",
      festival: "Dev Diwali",
      nakshatra: "Krittika",
      yoga: "Shiva",
      vikramSamvat: "2082",
      sakaSamvat: "1947",
      sunrise: "06:35 AM",
      sunset: "05:39 PM",
      rahuKalam: "01:30 PM - 02:55 PM",
    },
  };

  const selectedPanchangData = dummyPanchang[selectedDate.toISOString().slice(0, 10)];

  // --- Navigation Handlers ---
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
  // Handlers for dropdown and input selection
  const handleMonthChange = (e) => {
    setCurrentDate(new Date(currentDate.getFullYear(), Number(e.target.value), 1));
  };
  const handleYearChange = (e) => {
    // Basic validation to prevent non-numeric or excessively long input
    const year = Number(e.target.value);
    if (year > 1000 && year < 3000) {
      setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 p-4 font-serif">
      <div className="max-w-6xl mx-auto p-4 border-4 border-teal-800 bg-white/70 rounded-lg shadow-2xl">
        <AnimatedHeader />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Left Column: Calendar Grid --- */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-4 p-2 bg-teal-50 rounded-lg border border-teal-200">
              <button onClick={handlePrevMonth} className="px-3 py-1 rounded-md hover:bg-teal-100 transition-colors text-xl font-bold text-teal-700">«</button>
              
              {/* Month and Year Selectors */}
              <div className="flex gap-2">
                <select 
                  value={currentDate.getMonth()}
                  onChange={handleMonthChange}
                  className="px-2 py-1 border border-teal-300 rounded-md bg-white text-teal-800 font-bold focus:ring-2 focus:ring-teal-500"
                >
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
                <input 
                  type="number"
                  value={currentDate.getFullYear()}
                  onChange={handleYearChange}
                  className="w-24 px-2 py-1 border border-teal-300 rounded-md bg-white text-teal-800 font-bold focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button onClick={handleNextMonth} className="px-3 py-1 rounded-md hover:bg-teal-100 transition-colors text-xl font-bold text-teal-700">»</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-bold text-center text-teal-800/80 pb-2"> {day} </div>
              ))}
              {Array(days[0]?.getDay() ?? 0).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
              {days.map((day) => {
                const dateStr = day.toISOString().slice(0, 10);
                const panchang = dummyPanchang[dateStr];
                const isSelected = selectedDate.toDateString() === day.toDateString();
                const isToday = today.toDateString() === day.toDateString();
                return (
                  <div
                    key={dateStr}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 rounded-lg text-center h-20 flex flex-col justify-center items-center cursor-pointer transition-all duration-200 ease-in-out border
                      ${isSelected ? "bg-teal-800 text-white shadow-lg scale-105 border-teal-900" : `bg-white shadow-sm hover:shadow-md border-stone-200`}
                      ${isToday && !isSelected ? 'border-2 border-amber-500' : ''}
                    `}
                  >
                    <p className={`text-2xl font-bold ${day.getDay() === 0 && !isSelected ? 'text-red-600' : 'text-slate-800'} ${isSelected ? 'text-white' : ''}`}>
                      {day.getDate()}
                    </p>
                    {panchang?.festival && <div className={`w-2 h-2 rounded-full mt-1 ${isSelected ? 'bg-amber-300' : 'bg-red-500'}`}></div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- Right Column: Panchang Details --- */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-teal-900 rounded-lg shadow-xl h-full text-stone-100 p-5">
              <div className="text-center pb-4 border-b-2 border-amber-400/50">
                <h2 className="text-3xl font-bold text-white">
                  {selectedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "long" })}
                </h2>
                {/* MODIFIED LINE: Displaying Indian weekday name */}
                <p className="font-semibold text-amber-300">{indianWeekdays[selectedDate.getDay()]}</p>
              </div>
              <div className="mt-4">
                {selectedPanchangData ? (
                  <div className="space-y-4">
                    {selectedPanchangData.festival &&
                      <div className="bg-amber-500 text-teal-900 text-center p-3 rounded-md shadow-lg">
                        <h3 className="font-bold text-xl">🪔 {selectedPanchangData.festival}</h3>
                      </div>
                    }
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 p-3 bg-teal-800/60 rounded-md">
                      <div className="font-bold text-amber-300">🌕 Tithi:</div> <div>{selectedPanchangData.tithi}</div>
                      <div className="font-bold text-amber-300 flex items-center gap-2">{selectedPanchangData.paksha === "Shukla Paksha" ? "🌙" : "🌘"} Paksha:</div> <div>{selectedPanchangData.paksha}</div>
                      <div className="font-bold text-amber-300">✨ Nakshatra:</div> <div>{selectedPanchangData.nakshatra}</div>
                      <div className="font-bold text-amber-300">🧘 Yoga:</div> <div>{selectedPanchangData.yoga}</div>
                    </div>
                    <div className="text-center text-xs text-amber-200/80">
                      🏺 Samvat {selectedPanchangData.vikramSamvat}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-teal-800/60 p-2 rounded-md">
                            <p className="font-bold text-amber-300 text-sm">🌅 Sunrise</p>
                            <p className="font-mono">{selectedPanchangData.sunrise}</p>
                        </div>
                        <div className="bg-teal-800/60 p-2 rounded-md">
                            <p className="font-bold text-amber-300 text-sm">🌇 Sunset</p>
                            <p className="font-mono">{selectedPanchangData.sunset}</p>
                        </div>
                    </div>
                    <div className="p-3 bg-red-200/20 border-t-2 border-red-300/40 rounded-b-lg text-center">
                      <h4 className="font-bold text-red-300">Rahu Kalam</h4>
                      <p className="text-red-100 text-lg font-mono">{selectedPanchangData.rahuKalam}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-teal-200/70 italic text-center py-16">No detailed panchangam data for this day.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get all days in a specific month and year
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