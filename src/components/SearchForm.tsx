import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface Props {
  onSearch: (params: any) => void; // Adjust the type as needed
  closeModal: () => void;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JS months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SearchForm: React.FC<Props> = ({ onSearch, closeModal }) => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkin: formatDate(new Date()),
    checkout: formatDate(new Date()),
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
  };

  const handleDateChange = (
    start: Date | string | null,
    end: Date | string | null
  ) => {
    setErrorMessages(false);

    const startDate = start instanceof Date ? formatDate(start) : start || "";
    const endDate = end instanceof Date ? formatDate(end) : end || "";

    setSearchParams({
      ...searchParams,
      checkin: startDate,
      checkout: endDate,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkFormInputRequire()) {
      setErrorMessages(true);
      return;
    }
    onSearch(searchParams);
    closeModal();
  };

  const checkFormInputRequire = () => {
    return Object.values(searchParams).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (value) {
        return true;
      }
      return true;
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

      <div className="relative flex gap-4  z-50 picker w-full flex-1">
        <div className="flex-1">
          <label>Dates for Check In and Check Out</label>
          <Datepicker
            inputClassName={
              "calendar-picker w-full rounded-md border-0 py-2.5 pl-3 pr-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
            }
            readOnly={true}
            useRange={false}
            primaryColor={"indigo"}
            value={{
              startDate: searchParams.checkin,
              endDate: searchParams.checkout,
            }}
            popoverDirection="down"
            onChange={(range) => {
              if (range) {
                handleDateChange(range.startDate, range.endDate);
              }
            }}
          />
        </div>
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
      </div>
      {/* Other filters here */}

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
