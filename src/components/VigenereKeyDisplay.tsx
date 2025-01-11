import React from "react";
import { useTranslation } from "react-i18next";

interface KeyDisplayProps {
  plaintext: string;
  keyword: string;
}

export const KeyDisplay: React.FC<KeyDisplayProps> = ({ plaintext, keyword }) => {
  const { t } = useTranslation("vigenereCipher");

  if (!plaintext || !keyword) return null;

  const repeatedKey = keyword.repeat(Math.ceil(plaintext.length / keyword.length)).slice(0, plaintext.length);
  const chunks = repeatedKey.match(new RegExp(`.{1,${keyword.length}}`, "g")) || [];

  return (
    <div className="mb-4 p-4 border rounded-md bg-gray-50">
      <h3 className="font-bold mb-2">{t("keyRepetition")}</h3>
      <p className="mb-2">
        {t("keyRepetitionExplanation", {
          keyLength: keyword.length,
          textLength: plaintext.length,
        })}
      </p>
      <div className="flex flex-wrap">
        {chunks.map((chunk, index) => (
          <div key={`${chunk}-${index}`} className="flex mb-2 mr-2">
            {chunk.split("").map((char, charIndex) => (
              <div key={`${chunk}-${index}-${charIndex}`} className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white">
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
