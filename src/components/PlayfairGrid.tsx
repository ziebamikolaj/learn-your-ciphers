import React from "react";

interface PlayfairGridProps {
  grid: string[][];
}

const PlayfairGrid: React.FC<PlayfairGridProps> = ({ grid }) => {
  return (
    <div className="font-mono text-center inline-block">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex + "_" + row[rowIndex]} className="flex">
          {row.map((letter, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10 border border-gray-300 flex items-center justify-center m-0.5 bg-white">
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayfairGrid;
