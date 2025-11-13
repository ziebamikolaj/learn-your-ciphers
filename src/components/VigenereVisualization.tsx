import React from "react";
import { useTranslation } from "react-i18next";
import VigenereSquare from "./VigenereSquare";
import { VisualizationStep } from "@/types/vigenereCipherVisualization";

interface VisualizationProps {
  visualization: VisualizationStep[];
  currentStepIndex: number;
  explanation: string;
  resultText: string;
  isDecrypting: boolean;
}

export const Visualization: React.FC<VisualizationProps> = ({ visualization, currentStepIndex, explanation, resultText, isDecrypting }) => {
  const { t } = useTranslation("vigenereCipher");
  const currentStep = visualization[currentStepIndex];

  const renderExplanation = () => {
    if (!explanation) return null;
    const boldedExplanation = explanation.replace(/(\w+):\s(\w)/g, (_, label, char) => `${label}: <strong>${char}</strong>`);
    return <p className="mb-2" dangerouslySetInnerHTML={{ __html: boldedExplanation }} />;
  };

  if (!currentStep) {
    return <div>{t("noVisualizationData")}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="border p-4 rounded-md">
        <h3 className="font-bold mb-2">{t("explanation")}</h3>
        {renderExplanation()}
        <div className="flex items-center space-x-4">
          <p className="font-bold">
            {t("step")} {currentStepIndex + 1}:
          </p>
          <p>
            {isDecrypting ? t("ciphertext") : t("plaintext")}: <span className="font-mono bg-blue-100 px-1">{currentStep.text}</span>
          </p>
          <p>
            {t("key")}: <span className="font-mono bg-green-100 px-1">{currentStep.key}</span>
          </p>
          <p>
            {isDecrypting ? t("plaintext") : t("ciphertext")}: <span className="font-mono bg-yellow-100 px-1">{currentStep.result}</span>
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-2/3">
          <VigenereSquare highlightedRow={currentStep.row} highlightedCol={currentStep.col} />
        </div>
        <div className="w-1/3 border p-4 rounded-md">
          <h3 className="font-bold mb-2">{isDecrypting ? t("decryptedText") : t("encryptedText")}</h3>
          <p className="font-mono">{resultText.slice(0, currentStepIndex + 1)}</p>
        </div>
      </div>
    </div>
  );
};
