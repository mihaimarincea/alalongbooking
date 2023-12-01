import React from "react";

interface ResultCardProps {
  result: {
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
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-stretch transition-all duration-400 hover:scale-105 hover:cursor-pointer">
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        <img
          src={result.images[0]}
          alt={result.name}
          className="w-full h-48 object-cover rounded-md"
        />{" "}
      </a>
      <div className="flex flex-col text-s justify-stretch h-full ">
        <h4 className="text-lg font-bold mt-3 mb-1 h-full">{result.name}</h4>
        <p className="text-s mb-2">
          {result.city} {result.neighborhood && ` • ${result.neighborhood}`}
        </p>
        <p className="text-s">{result.type}</p>
        <p className="text-s">
          Bedrooms: {result.bedrooms} • Bathrooms: {result.bathrooms} • Beds:{" "}
          {result.beds}
        </p>
        <div className="flex flex-row align-middle justify-between">
          <p className=" text-l mt-4 text-s">
            {" "}
            <span className=" text-yellow-400">★</span> {result.rating} (
            {result.reviewsCount} reviews)
          </p>
          <p className="font-bold text-l mt-4">
            <span>${result.price.rate}/night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
