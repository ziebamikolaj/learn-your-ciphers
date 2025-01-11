import React from "react";

interface CaesarShiftProps {
  shift: number;
}

const CaesarShift: React.FC<CaesarShiftProps> = ({ shift }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift);

  return (
    <div className="font-mono text-center">
      <div className="flex justify-center space-x-1 mb-2">
        {alphabet.split("").map((letter, index) => (
          <div key={index + "-" + alphabet[index]} className="w-6 h-6 border border-gray-300 flex items-center justify-center">
            {letter}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-1">
        {shiftedAlphabet.split("").map((letter, index) => (
          <div key={index + "-" + alphabet[index]} className="w-6 h-6 border border-blue-300 flex items-center justify-center text-blue-600">
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaesarShift;
