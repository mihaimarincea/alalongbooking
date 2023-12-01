import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsDisplay from "./components/ResultsDisplay";
import Skeleton from "./components/Skeleton";
import Logo from "./components/UI/Logo";
import Gallery from "./components/UI/Gallery";
import Sheet from "react-modal-sheet";
import { searchByLocation } from "./services/api";

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]); // results initialized as an empty array
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

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

  const resetSearch = () => {
    setSearchPerformed(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="max-w-screen-xl	mx-auto flex flex-col lg:flex-row md:flex-row md:gap-12 h-screen md:h-auto">
        <div className="w-full md:max-w-[400px] h-full md:sticky top-0 p-4">
          <div className="mt-5">
            <Logo resetSearch={resetSearch} />
          </div>
          <div className="mt-[50px]">
            <h1 className="text-4xl md:text-2xl lg:text-4xl">
              Your<span> excuisite long term place </span>to enjoy your next{" "}
              <span>adventure</span>
            </h1>
            <br />
            <p className="text-base md:text-md">
              Our curated unique destinations offer more than just a stay, they
              promise a lifestyle. Find your next long-term haven to relish
              life's journey. Your awesome adventure with 'À la longue' awaits!
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
              <p>Copywrite 2023 @ À la longue</p>{" "}
            </div>
            <div>
              {" "}
              <p>Affliate</p>
              <p>How to use</p>
              <p>List my place</p>{" "}
            </div>
          </div>
        </div>
        <div className="max-w-6xl w-full absolute md:relative bg-mainbg z-50 ">
          <div className="hidden md:block mt-5">
            {!searchPerformed && <Gallery />}
          </div>
          <div className="mt-12">
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
          {searchPerformed && (
            <>
              <div className="fixed md:hidden top-0 w-full">
                <div className="flex w-full justify-center p-2 h-full min-h-[50px] bg-white-to-transparent">
                  <Logo resetSearch={resetSearch} />
                </div>
              </div>
              <div className="fixed md:hidden bottom-8 mx:auto w-full">
                <div className="flex w-full justify-center p-2 h-full min-h-[70px]">
                  <button
                    onClick={toggleSheet}
                    className="md:hidden fixed text-white shadow-md bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-md px-5 py-3"
                  >
                    Refine Your Search
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="block md:hidden">
            <Sheet
              isOpen={isSheetOpen}
              onClose={toggleSheet}
              snapPoints={[650, 300]}
            >
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content className="px-5">
                  <SearchForm onSearch={handleSearch} />
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop onTap={toggleSheet} />
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
