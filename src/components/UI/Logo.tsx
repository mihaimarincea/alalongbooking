import React from "react";

const Logo = ({ resetSearch }: { resetSearch?: () => void }) => {
  const handleSearch = () => {
    if (resetSearch) {
      resetSearch();
    }
  };
  return (
    <div onClick={handleSearch} className="hover:cursor-pointer">
      <img src="/images/alalongue_logo.svg" alt="A la longue Logo" />
    </div>
  );
};

export default Logo;
