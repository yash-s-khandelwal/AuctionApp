import React, { useState } from "react";

const ImageGallery = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      {/* Main image */}
      <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
        <img
          src={images[index]}
          alt={`Product ${index + 1}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-20 h-20 rounded-lg overflow-hidden border ${i === index ? "ring-2 ring-blue-500" : "border-gray-200"}`}
          >
            <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
