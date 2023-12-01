import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsDisplay from "./components/ResultsDisplay";
import Skeleton from "./components/Skeleton";
import Logo from "./components/UI/Logo";
import Gallery from "./components/UI/Gallery";
import { searchByLocation } from "./services/api";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]); // results initialized as an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (params: any) => {
    setSearchPerformed(true);
    setIsLoading(true);
    try {
      const response = await searchByLocation(params);
      if (Array.isArray(response)) {
        setResults(response);
      } else {
        setResults([]); // Set to empty array if response is not an array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="max-w-screen-xl	mx-auto flex flex-col lg:flex-row md:flex-row md:gap-12 h-screen md:h-auto">
        <div className="md:max-w-sm h-full md:sticky top-0 p-4">
          <div className="mt-[35px]">
            <Logo />
          </div>
          <div className="mt-[70px]">
            <h1 className="text-3xl md:text-3xl lg:text-5xl">
              Where <span>adventure</span> meets <span>serenity</span>
            </h1>
            <br />
            <p className="text-base md:text-md">
              Our curated unique destinations offer more than just a stay, they
              promise a lifestyle. Find your next long-term haven to relish
              life's journey. Your awesome adventure with 'à la longue' awaits!
            </p>
            <p className="text-base md:text-md"></p>
          </div>
          <div className="mt-3">
            <SearchForm onSearch={handleSearch} />
          </div>
          <div className="mt-[70px] opacity-70 text-sm flex flex-row gap-4 justify-between">
            <div>
              {" "}
              <p>Contact us</p>
              <p>Terms and conditions</p>
              <p>Privacy Policy</p>
              <p>General Data Protection</p>
              <br />
              <p>Copywrite 2023 @ à la longue</p>{" "}
            </div>
            <div>
              {" "}
              <p>Affliate</p>
              <p>How to use</p>
              <p>List my place</p>{" "}
            </div>
          </div>
        </div>
        <div className="max-w-6xl w-full">
          <div className="hidden md:block mt-5">
            {!searchPerformed && <Gallery />}
          </div>
          <div className="mt-8">
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              </>
            ) : (
              <ResultsDisplay
                results={results}
                searchPerformed={searchPerformed}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
