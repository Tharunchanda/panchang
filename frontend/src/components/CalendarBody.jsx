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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const languageIntervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 5000);

    const timeIntervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(languageIntervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  return (
    <div className="text-center mb-6 pb-4 border-b-2 border-teal-800/50 h-32">
      <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 drop-shadow-lg transition-all duration-300">
        ~ 🕉️ ~ {languages[currentIndex].word} ~ 🕉️ ~
      </h1>
      <p className="text-slate-600 mt-1 font-sans">
        <strong>An Authentic Hindu Calendar</strong>
      </p>
      <div className="text-lg text-teal-700 font-mono mt-2">
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

function CalendarBody() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [location, setLocation] = useState("");
  const [ayanamsa, setAyanamsa] = useState("Lahiri");
  const [language, setLanguage] = useState("English");

  // 🌎 Coordinates and search states
  const [coords, setCoords] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // NEW: Ask user for location preference
  const [askLocation, setAskLocation] = useState(true);

  // Auto-detect user location
  useEffect(() => {
    if (!askLocation) return;
    // Only run if user chooses "Use my location"
    if (askLocation === "auto" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              "Unknown Location";
            setLocation(`${city} (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          } catch (error) {
            setLocation("Unable to fetch city name");
          }
        },
        () => {
          setLocation("Location permission denied");
        }
      );
    }
  }, [askLocation]);

  // Debounced Location Search
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1&limit=5`
        );
        const results = await response.json();
        setSuggestions(results);
      } catch (error) {
        setSuggestions([]);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const days = useMemo(
    () => getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  );

  const indianWeekdays = [
    "Ravivara",
    "Somavara",
    "Mangalavara",
    "Budhavara",
    "Guruvara",
    "Shukravara",
    "Shanivara",
  ];

  // --- Mock Panchangam Data ---
  const dummyPanchang = {
    "2025-09-30": {
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
    "2025-10-15": {
      tithi: "Dashami until 10:35 AM, followed by Ekadashi",
      paksha: "Krishna Paksha (the waning phase of the moon)",
      festival: "No major festival is noted for this specific date, but the Ekadashi that follows this tithi will be Rama Ekadashi on October 17",
      nakshatra: "Ashlesha until 12:42 PM, then Magha",
      yoga: "Shubha Yoga",
      vikramSamvat: "2082, named Kalayukta",
      sakaSamvat: " 1947, named Vishvavasu",
      sunrise: " 6:22 AM",
      sunset: "5:49 PM",
      rahuKalam: "1:32 PM - 2:58 PM",
    },
  };

  const selectedPanchangData =
    dummyPanchang[selectedDate.toISOString().slice(0, 10)];

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const handleMonthChange = (e) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), Number(e.target.value), 1)
    );
  };

  const handleYearChange = (e) => {
    const year = Number(e.target.value);
    if (year > 1000 && year < 3000) {
      setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    }
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
  };

  // --- Ask user for location on first load ---
  if (askLocation === true) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-teal-700 text-center">
          <h2 className="text-2xl font-bold mb-4 text-teal-900">Choose Location</h2>
          <p className="mb-6 text-gray-700">
            Would you like to use your current location or enter a location manually?
          </p>
          <div className="flex gap-6 justify-center">
            <button
              className="bg-teal-700 text-white px-6 py-2 rounded font-semibold hover:bg-teal-800 transition"
              onClick={() => setAskLocation("auto")}
            >
              Use My Location
            </button>
            <button
              className="bg-amber-600 text-white px-6 py-2 rounded font-semibold hover:bg-amber-700 transition"
              onClick={() => setAskLocation("manual")}
            >
              Enter Location
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 p-4 font-serif">
      <div className="max-w-6xl mx-auto p-4 border-4 border-teal-800 bg-white/70 rounded-lg shadow-2xl">
        <AnimatedHeader />

        {/* Date, Location, Ayanamsa, Language */}
        <div className="flex flex-wrap gap-4 items-center mb-6 relative">
          <div>
            <label className="font-semibold mr-2">Date:</label>
            <input
              type="date"
              value={selectedDate.toISOString().slice(0, 10)}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
          </div>

          {/* 🌍 Location Search with Suggestions */}
          <div className="relative">
            <label className="font-semibold mr-2">Location:</label>
            <input
              type="text"
              value={isTyping ? query : location}
              placeholder="Enter city or place"
              onFocus={() => setIsTyping(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsTyping(true);
              }}
              className="border rounded px-2 py-1 w-64"
              autoComplete="off"
              disabled={askLocation === "auto"}
            />

            {/* Show dropdown of location suggestions */}
            {askLocation === "manual" && isTyping && suggestions.length > 0 && (
              <div
                className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-md mt-1 w-64 max-h-60 overflow-y-auto"
                style={{ top: "100%" }}
              >
                {suggestions.map((place) => {
                  const displayName = place.display_name.split(",")[0];
                  const coordsStr = `(${parseFloat(place.lat).toFixed(2)}, ${parseFloat(place.lon).toFixed(2)})`;
                  return (
                    <div
                      key={place.place_id}
                      className="px-3 py-2 hover:bg-teal-100 cursor-pointer text-sm"
                      onMouseDown={() => {
                        // Prevent blur before click registers
                        const name = `${displayName} ${coordsStr}`;
                        setLocation(name);
                        setCoords({
                          latitude: parseFloat(place.lat),
                          longitude: parseFloat(place.lon),
                        });
                        setQuery("");
                        setSuggestions([]);
                        setIsTyping(false);
                      }}
                    >
                      {displayName} <span className="text-gray-500 text-xs">{coordsStr}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="font-semibold mr-2">Ayanamsa:</label>
            <select
              value={ayanamsa}
              onChange={(e) => setAyanamsa(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Lahiri">Lahiri</option>
              <option value="Raman">Raman</option>
              <option value="Krishnamurti">Krishnamurti</option>
            </select>
          </div>

          <div>
            <label className="font-semibold mr-2">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
        </div>

        {/* ✅ Show selected values */}
        <div className="text-sm text-teal-800 mb-2">
          <span className="mr-4">
            📅 <b>Date:</b> {selectedDate.toLocaleDateString()}
          </span>
          <span className="mr-4">
            📍 <b>Location:</b> {location || "Not selected"}
          </span>
          {coords && (
            <span className="mr-4">
              🧭 <b>Coords:</b>{" "}
              {coords.latitude.toFixed(2)}, {coords.longitude.toFixed(2)}
            </span>
          )}
          <span>
            🌐 <b>Language:</b> {language}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Calendar Grid */}
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            today={today}
            dummyPanchang={dummyPanchang}
            setSelectedDate={setSelectedDate}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />

          {/* Right: Panchang Details */}
          <PanchangDetails
            selectedDate={selectedDate}
            indianWeekdays={indianWeekdays}
            selectedPanchangData={selectedPanchangData}
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components
function CalendarGrid({
  currentDate,
  selectedDate,
  today,
  dummyPanchang,
  setSelectedDate,
  handlePrevMonth,
  handleNextMonth,
  handleMonthChange,
  handleYearChange,
}) {
  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  return (
    <div className="flex-grow">
      <div className="flex justify-between items-center mb-4 p-2 bg-teal-50 rounded-lg border border-teal-200">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 rounded-md hover:bg-teal-100 transition-colors text-xl font-bold text-teal-700"
        >
          «
        </button>
        <div className="flex gap-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="px-2 py-1 border border-teal-300 rounded-md bg-white text-teal-800 font-bold focus:ring-2 focus:ring-teal-500"
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="w-24 px-2 py-1 border border-teal-300 rounded-md bg-white text-teal-800 font-bold focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 rounded-md hover:bg-teal-100 transition-colors text-xl font-bold text-teal-700"
        >
          »
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="font-bold text-center text-teal-800/80 pb-2"
          >
            {day}
          </div>
        ))}
        {Array(days[0]?.getDay() ?? 0)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
        {days.map((day) => {  
          const dateStr = day.toISOString().slice(0, 10);
          const panchang = dummyPanchang[dateStr];
          const isSelected =
            selectedDate.toDateString() === day.toDateString();
          const isToday = today.toDateString() === day.toDateString();
          return (
            <div
              key={dateStr}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded-lg text-center h-20 flex flex-col justify-center items-center cursor-pointer transition-all duration-200 ease-in-out border
                ${
                  isSelected
                    ? "bg-teal-800 text-white shadow-lg scale-105 border-teal-900"
                    : "bg-white shadow-sm hover:shadow-md border-stone-200"
                }
                ${isToday && !isSelected ? "border-2 border-amber-500" : ""}
              `}
            >
              <p
                className={`text-2xl font-bold ${
                  day.getDay() === 0 && !isSelected
                    ? "text-red-600"
                    : "text-slate-800"
                } ${isSelected ? "text-white" : ""}`}
              >
                {day.getDate()}
              </p>
              {panchang?.festival && (
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${
                    isSelected ? "bg-amber-300" : "bg-red-500"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PanchangDetails({
  selectedDate,
  indianWeekdays,
  selectedPanchangData,
}) {
  return (
    <div className="lg:w-96 flex-shrink-0">
      <div className="bg-teal-900 rounded-lg shadow-xl h-full text-stone-100 p-5">
        <div className="text-center pb-4 border-b-2 border-amber-400/50">
          <h2 className="text-3xl font-bold text-white">
            {selectedDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
            })}
          </h2>
          <p className="font-semibold text-amber-300">
            {indianWeekdays[selectedDate.getDay()]}
          </p>
        </div>
        <div className="mt-4">
          {selectedPanchangData ? (
            <div className="space-y-4">
              {selectedPanchangData.festival && (
                <div className="bg-amber-500 text-teal-900 text-center p-3 rounded-md shadow-lg">
                  <h3 className="font-bold text-xl">
                    🪔 {selectedPanchangData.festival}
                  </h3>
                </div>
              )}
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 p-3 bg-teal-800/60 rounded-md">
                <div className="font-bold text-amber-300">🌕 Tithi:</div>{" "}
                <div>{selectedPanchangData.tithi}</div>
                <div className="font-bold text-amber-300 flex items-center gap-2">
                  {selectedPanchangData.paksha === "Shukla Paksha"
                    ? "🌙"
                    : "🌘"}{" "}
                  Paksha:
                </div>{" "}
                <div>{selectedPanchangData.paksha}</div>
                <div className="font-bold text-amber-300">✨ Nakshatra:</div>{" "}
                <div>{selectedPanchangData.nakshatra}</div>
                <div className="font-bold text-amber-300">🧘 Yoga:</div>{" "}
                <div>{selectedPanchangData.yoga}</div>
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
                <p className="text-red-100 text-lg font-mono">
                  {selectedPanchangData.rahuKalam}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-teal-200/70 italic text-center py-16">
              No detailed panchangam data for this day.
            </p>
          )}
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
