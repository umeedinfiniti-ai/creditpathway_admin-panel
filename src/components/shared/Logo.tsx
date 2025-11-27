import React, { useState } from "react";

const Logo: React.FC<{ large?: boolean }> = ({ large = false }) => {
  const sizeClass = large ? "w-64 h-auto" : "w-36 h-auto";
  const [imageOk, setImageOk] = useState(true);

  // Prefer an image placed in the `public/` folder named `paramount-logo.png`.
  // If it fails to load, we gracefully fall back to the inline SVG.
  const imgSrc = "/paramount-logo.png";

  return (
    <div className={`flex items-center gap-4 ${sizeClass}`}>
      {imageOk ? (
        <img
          src={imgSrc}
          alt="Paramount logo"
          className="object-contain inline-block max-h-20 rounded"
          onError={() => setImageOk(false)}
        />
      ) : (
        <svg
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block"
          aria-hidden
        >
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#D4A317" />
              <stop offset="100%" stopColor="#FDE7A7" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="200" height="60" rx="8" fill="transparent" />

        </svg>
      )}

      <div className="flex flex-col">
        <span className="font-serif text-2xl text-gray-900 dark:text-gray-100">Paramount</span>
        <span className="text-xs text-gray-500 dark:text-gray-300">Credit Pathway</span>
      </div>
    </div>
  );
};

export default Logo;
