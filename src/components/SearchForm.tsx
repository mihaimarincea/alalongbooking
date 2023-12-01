import React, { useState } from "react";

interface Props {
  onSearch: (params: any) => void; // Adjust the type as needed
}

const SearchForm: React.FC<Props> = ({ onSearch }) => {
  const today = new Date();
  const inThirtyDays = new Date(today);
  inThirtyDays.setDate(inThirtyDays.getDate() + 30);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const [searchParams, setSearchParams] = useState({
    location: "",
    checkin: formatDate(today),
    checkout: formatDate(inThirtyDays),
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
    return Object.values(searchParams).every((value) => value.trim() !== "");
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
          className="block  w-full  rounded-md border-0 py-2.5 pl-3 pr-2  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
          name="location"
          value={searchParams.location}
          onChange={handleChange}
          placeholder="Search a prefered Country, City"
        />
      </div>
      <div className="flex flex-wrap flex-row xs:flex-col sm:flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1">
          <label>Date Arrival</label>
          <input
            type="date"
            className="block appearance-none w-full rounded-md border-0 py-2.5 pl-2.5 pr-2  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="checkin"
            value={searchParams.checkin}
            onChange={handleChange}
            placeholder="Today"
          />
        </div>
        <div className="flex-1">
          <label>Date CheckOut</label>
          <input
            type="date"
            className="block w-full appearance-none rounded-md border-0 py-2.5 pl-2.5 pr-2  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="checkout"
            value={searchParams.checkout}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Adults</label>
          <input
            type="number"
            className="block w-[50px] rounded-md border-0 py-2.5 pl-2.5 pr-2  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="adults"
            value={searchParams.adults}
            onChange={handleChange}
          />
        </div>
      </div>
      {errorMessage && (
        <span className=" text-red-500 text-xs">
          Please fill in all the fields
        </span>
      )}
      <div>
        <button
          type="submit"
          className="text-white md:text-l w-full mt-0 sm:mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center me-2 "
        >
          Find your next long stay
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
