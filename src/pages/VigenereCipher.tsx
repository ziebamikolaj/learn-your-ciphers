import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Visualization } from "@/components/VigenereVisualization";
import { VisualizationStep } from "@/types/vigenereCipherVisualization";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const VigenereCipher: React.FC = () => {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const { t } = useTranslation("vigenereCipher");

  const processText = (text: string, keyword: string, isDecrypting: boolean): { resultText: string; visualization: VisualizationStep[] } => {
    const result: string[] = [];
    const visualization: VisualizationStep[] = [];
    let keyIndex = 0;

    for (const element of text) {
      const char = element.toUpperCase();
      if (char.match(/[A-Z]/)) {
        const keyChar = keyword[keyIndex % keyword.length].toUpperCase();
        const charCode = char.charCodeAt(0) - 65;
        const keyCode = keyChar.charCodeAt(0) - 65;
        let resultCode: number;

        if (isDecrypting) {
          resultCode = (charCode - keyCode + 26) % 26;
        } else {
          resultCode = (charCode + keyCode) % 26;
        }

        const resultChar = String.fromCharCode(resultCode + 65);
        result.push(resultChar);

        visualization.push({
          text: char,
          key: keyChar,
          result: resultChar,
          row: keyCode,
          col: charCode,
        });

        keyIndex++;
      } else {
        result.push(char);
        visualization.push({
          text: char,
          key: "",
          result: char,
          row: -1,
          col: -1,
        });
      }
    }

    return { resultText: result.join(""), visualization };
  };

  const { resultText, visualization } = useMemo(() => {
    if (text && keyword) {
      return processText(text, keyword, isDecrypting);
    } else {
      return { resultText: "", visualization: [] };
    }
  }, [text, keyword, isDecrypting]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleKeywordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const explanation = useMemo(() => {
    if (!visualization.length) return "";

    const currentVisualization = visualization[currentStep];
    if (currentVisualization.row === -1 || currentVisualization.col === -1) {
      return t("explanationNonAlpha");
    }

    return t(isDecrypting ? "explanationStepDecrypt" : "explanationStepEncrypt", {
      text: currentVisualization.text,
      key: currentVisualization.key,
      result: currentVisualization.result,
      row: currentVisualization.row,
      col: currentVisualization.col,
      keyIndex: currentStep % keyword.length,
    });
  }, [visualization, currentStep, keyword.length, t, isDecrypting]);

  const handleSliderChange = useCallback((newValue: number[]) => {
    setCurrentStep(Math.floor(newValue[0]));
    setIsPlaying(false);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleSpeedChange = useCallback((newValue: number[]) => {
    setPlaybackSpeed(newValue[0]);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          if (prevStep < visualization.length - 1) {
            return prevStep + 1;
          }
          setIsPlaying(false);
          return prevStep;
        });
      }, 1000 / playbackSpeed);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, playbackSpeed, visualization.length]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="text-xl text-muted-foreground">{t("quickDescription")}</p>

      <Card>
        <CardHeader>
          <CardTitle>{t("whatIs")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t("example")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("tryIt")}</CardTitle>
          <CardDescription>{t("tryItDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="encrypt" onValueChange={(value) => setIsDecrypting(value === "decrypt")}>
            <TabsList>
              <TabsTrigger value="encrypt">{t("encrypt")}</TabsTrigger>
              <TabsTrigger value="decrypt">{t("decrypt")}</TabsTrigger>
            </TabsList>
            <TabsContent value="encrypt">
              <div className="space-y-4">
                <div>
                  <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700">
                    {t("plaintext")}
                  </label>
                  <Input id="plaintext" type="text" value={text} onChange={handleTextChange} placeholder={t("enterPlaintext")} />
                </div>
                <div>
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                    {t("keyword")}
                  </label>
                  <Input id="keyword" type="text" value={keyword} onChange={handleKeywordChange} placeholder={t("enterKeyword")} />
                </div>
                <div>
                  <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700">
                    {t("ciphertext")}
                  </label>
                  <Input id="ciphertext" type="text" value={resultText} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="decrypt">
              <div className="space-y-4">
                <div>
                  <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700">
                    {t("ciphertext")}
                  </label>
                  <Input id="ciphertext" type="text" value={text} onChange={handleTextChange} placeholder={t("enterCiphertext")} />
                </div>
                <div>
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                    {t("keyword")}
                  </label>
                  <Input id="keyword" type="text" value={keyword} onChange={handleKeywordChange} placeholder={t("enterKeyword")} />
                </div>
                <div>
                  <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700">
                    {t("plaintext")}
                  </label>
                  <Input id="plaintext" type="text" value={resultText} readOnly />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <h3 className="font-bold mb-2">{t("visualization")}</h3>
            {visualization.length > 0 ? (
              <>
                <Visualization visualization={visualization} currentStepIndex={currentStep} explanation={explanation} resultText={resultText} isDecrypting={!!isDecrypting} />
                <div className="flex flex-wrap items-center space-y-6">
                  <div className="w-full flex place-items-center gap-4">
                    <Button onClick={handleTogglePlay}>{isPlaying ? t("pause") : t("play")}</Button>
                    <div className="flex-1 w-full">
                      <Slider min={0} max={visualization.length - 1} step={1} value={[currentStep]} onValueChange={handleSliderChange} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 w-full">
                    <label htmlFor="speed-slider" className="block text-sm font-medium text-gray-700">
                      {t("speed")}
                    </label>
                    <div className="flex-1">
                      <Slider id="speed-slider" min={0.5} max={2} step={0.1} value={[playbackSpeed]} onValueChange={handleSpeedChange} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>{t("enterTextAndKeyword")}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default VigenereCipher;
