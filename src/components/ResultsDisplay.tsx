import React from "react";
import ResultCard from "./ResultCard";

interface Result {
  id: number;
  url: string;
  deeplink: string;
  position: number;
  name: string;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  city: string;
  neighborhood: string;
  images: string[];
  hostThumbnail: string;
  isSuperhost: boolean;
  rareFind: boolean;
  lat: number;
  lng: number;
  persons: number;
  reviewsCount: number;
  rating: number;
  type: string;
  userId: number;
  address: string;
  amenityIds: number[];
  previewAmenities: string[];
  cancelPolicy: string;
  price: {
    rate: number;
    currency: string;
    total: number;
    priceItems: { title: string; amount: number }[];
  };
}

interface ResultsDisplayProps {
  results: Result[];
  searchPerformed: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  searchPerformed,
}) => {
  if (!searchPerformed) {
    return null;
  }

  if (results.length === 0) {
    return <div className="text-center p-4">No results found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default ResultsDisplay;
