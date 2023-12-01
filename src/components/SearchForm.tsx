import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  onSearch: (params: any) => void; // Adjust the type as needed
}

const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkin: "",
    checkout: "",
    adults: "1",
    children: "0",
    infants: "0",
    pets: "0",
    page: "1",
    currency: "USD",
  });

  const [errorMessage, setErrorMessages] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessages(false);
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    console.log("Form change:", { [e.target.name]: e.target.value });
  };

  const handleDateChange = (value: any) => {
    setErrorMessages(false);

    // Update this based on the actual value structure emitted by Datepicker
    let startDate =
      value instanceof Date ? value : value ? value[0] : new Date();
    let endDate =
      Array.isArray(value) && value.length > 1 ? value[1] : new Date();

    setSearchParams({ ...searchParams, checkin: startDate, checkout: endDate });
    console.log("Date change:", { startDate, endDate });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkFormInputRequire()) {
      setErrorMessages(true);
      return; // Exit the function if any field is empty
    }
    console.log("Submitting form with:", searchParams);
    onSearch(searchParams);
  };

  const checkFormInputRequire = () => {
    return Object.values(searchParams).every((value) => {
      if (value) return true;
      return value.trim() !== "";
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5 align-middle"
    >
      <div>
        <label>Location Search</label>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-2.5 pl-3 pr-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
          name="location"
          value={searchParams.location}
          onChange={handleChange}
          placeholder="Search a preferred Country, City"
        />
      </div>

      <Datepicker
        value={{
          startDate: searchParams.checkin,
          endDate: searchParams.checkout,
        }}
        onChange={handleDateChange}
      />

      <div>
        <label>Adults</label>
        <input
          type="number"
          className="block w-[50px] rounded-md border-0 py-2.5 pl-2.5 pr-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name="adults"
          value={searchParams.adults}
          onChange={handleChange}
        />
      </div>

      {/* Add other fields like children, infants, pets, etc., if needed */}

      {errorMessage && (
        <span className="text-red-500 text-xs">
          Please fill in all the fields
        </span>
      )}
      <div>
        <button
          type="submit"
          className="text-white md:text-l w-full mt-0 sm:mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center me-2"
        >
          Find your next long stay
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
