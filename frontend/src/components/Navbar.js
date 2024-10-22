import React, { useState, useEffect } from "react";

const cityIcons = {
  Delhi: "🇮🇳",
  Mumbai: "🕌",
  Chennai: "🏖️",
  Bangalore: "🏛️",
  Hyderabad: "🕌",
  Kolkata: "🏰",
};

const Navbar = ({
  cities,
  selectedCity,
  onCitySelect,
  onEmailToggle,
  onEmailChange,
}) => {
  const [isEmailEnabled, setIsEmailEnabled] = useState(() => {
    const savedState = localStorage.getItem("isEmailEnabled");
    return savedState === "true";
  });

  const [recipientEmail, setRecipientEmail] = useState(() => {
    return localStorage.getItem("recipientEmail") || "";
  });

  useEffect(() => {
    localStorage.setItem("isEmailEnabled", isEmailEnabled);
    localStorage.setItem("recipientEmail", recipientEmail);
  }, [isEmailEnabled, recipientEmail]);

  const handleEmailToggle = () => {
    setIsEmailEnabled((prev) => {
      const newState = !prev;
      onEmailToggle(newState);
      return newState;
    });
  };

  const handleEmailChange = (email) => {
    setRecipientEmail(email);
    onEmailChange(email);
  };

  const handleUpdateEmail = () => {
    onEmailChange(recipientEmail);
  };

  return (
    <nav className="bg-white w-full p-4 shadow-md flex flex-col md:flex-row justify-between items-center">
      <ul className="flex justify-center space-x-4 md:space-x-8 flex-wrap">
        {cities.map((city) => (
          <li
            key={city}
            onClick={() => onCitySelect(city)}
            className={`cursor-pointer flex flex-col items-center transition duration-300 ease-in-out hover:scale-110 ${selectedCity === city ? "font-bold text-gray-800" : "text-black"}`}
          >
            <span className="text-2xl md:text-3xl text-black">{cityIcons[city]}</span>
            <span className="mt-1 text-sm md:text-base text-black">{city}</span>
          </li>
        ))}
      </ul>

      {/* Email Notification Section */}
      <div className="flex items-center flex-col mt-4 md:mt-0">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-black">Email Notifications:</span>
          <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${isEmailEnabled ? "bg-blue-500" : ""}`}
            onClick={handleEmailToggle}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition duration-300 ease-in-out ${isEmailEnabled ? "translate-x-6" : "translate-x-1"}`}
            ></div>
          </div>
        </div>
        {isEmailEnabled && (
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Recipient Email"
              value={recipientEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-48 md:w-60" // Adjust width as needed
            />
            <button
              onClick={handleUpdateEmail}
              className="ml-2 bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600 transition duration-300"
            >
              Set
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
