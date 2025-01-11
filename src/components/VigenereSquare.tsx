import React from "react";

interface VigenereSquareProps {
  highlightedRow?: number;
  highlightedCol?: number;
  className?: string;
}

const VigenereSquare: React.FC<VigenereSquareProps> = ({ highlightedRow, highlightedCol, className }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className={`inline-block ${className}`}>
      <table className="border-collapse w-full">
        <tbody>
          <tr>
            <td className="w-6 h-6 text-xs text-center border font-bold"></td>
            {alphabet.split("").map((char, index) => (
              <td key={char} className="w-6 h-6 text-xs text-center border font-bold">
                {index}
              </td>
            ))}
          </tr>
          {alphabet.split("").map((_, rowIndex) => (
            <tr key={alphabet[rowIndex]}>
              <td className="w-6 h-6 text-xs text-center border font-bold">{rowIndex}</td>
              {alphabet.split("").map((_, colIndex) => {
                const char = String.fromCharCode(((rowIndex + colIndex) % 26) + 65);
                const isHighlighted = rowIndex === Math.round(highlightedRow ?? -1) && colIndex === Math.round(highlightedCol ?? -1);
                const isRowHighlighted = rowIndex === Math.round(highlightedRow ?? -1);
                const isColHighlighted = colIndex === Math.round(highlightedCol ?? -1);
                return (
                  <td key={`${rowIndex}_${colIndex}`} className={`w-6 h-6 text-xs text-center border ${isHighlighted ? "bg-yellow-300" : isRowHighlighted || isColHighlighted ? "bg-yellow-100" : ""}`}>
                    {char}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VigenereSquare;
