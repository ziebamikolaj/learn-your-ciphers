import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RailFenceCipher: React.FC = () => {
  const { t } = useTranslation("railFenceCipher");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [rails, setRails] = useState(3);
  const [visualization, setVisualization] = useState<string[][]>([]);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  useEffect(() => {
    if (mode === "encrypt") {
      encryptAndVisualize(text, rails);
    } else {
      decryptAndVisualize(text, rails);
    }
  }, [text, rails, mode]);

  const encryptAndVisualize = (text: string, railCount: number) => {
    const fence: string[][] = Array(railCount)
      .fill(null)
      .map(() => Array(text.length).fill(" "));
    let rail = 0;
    let direction = 1;

    for (let i = 0; i < text.length; i++) {
      fence[rail][i] = text[i];
      rail += direction;
      if (rail === 0 || rail === railCount - 1) direction *= -1;
    }

    setVisualization(fence);
    const encrypted = fence
      .map((row) => row.join(""))
      .join("")
      .replace(/ /g, "");
    setResult(encrypted);
  };

  const decryptAndVisualize = (text: string, railCount: number) => {
    const fence: string[][] = Array(railCount)
      .fill(null)
      .map(() => Array(text.length).fill(" "));
    let rail = 0;
    let direction = 1;

    // Mark the spots where characters should be placed
    for (let i = 0; i < text.length; i++) {
      fence[rail][i] = "*";
      rail += direction;
      if (rail === 0 || rail === railCount - 1) direction *= -1;
    }

    // Fill in the fence with the ciphertext
    let index = 0;
    for (let i = 0; i < railCount; i++) {
      for (let j = 0; j < text.length; j++) {
        if (fence[i][j] === "*" && index < text.length) {
          fence[i][j] = text[index++];
        }
      }
    }

    // Read off the plaintext
    let result = "";
    rail = 0;
    direction = 1;
    for (let i = 0; i < text.length; i++) {
      result += fence[rail][i];
      rail += direction;
      if (rail === 0 || rail === railCount - 1) direction *= -1;
    }

    setVisualization(fence);
    setResult(result);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <p className="text-xl text-muted-foreground">{t("quickDescription")}</p>

      <Card>
        <CardHeader>
          <CardTitle>{t("whatIsTitle")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t("example")}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("inputTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={mode} onValueChange={(value) => setMode(value as "encrypt" | "decrypt")}>
            <TabsList>
              <TabsTrigger value="encrypt">{t("encryptTab")}</TabsTrigger>
              <TabsTrigger value="decrypt">{t("decryptTab")}</TabsTrigger>
            </TabsList>
            <TabsContent value="encrypt">
              <div className="space-y-2">
                <Label htmlFor="plaintext">{t("plaintextLabel")}</Label>
                <Input id="plaintext" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("plaintextPlaceholder")} />
              </div>
            </TabsContent>
            <TabsContent value="decrypt">
              <div className="space-y-2">
                <Label htmlFor="ciphertext">{t("ciphertextLabel")}</Label>
                <Input id="ciphertext" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("ciphertextPlaceholder")} />
              </div>
            </TabsContent>
          </Tabs>
          <div className="space-y-2">
            <Label htmlFor="rails">{t("railsLabel")}</Label>
            <Slider id="rails" min={2} max={10} step={1} value={[rails]} onValueChange={(value) => setRails(value[0])} />
            <span>{rails}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="result">{mode === "encrypt" ? t("outputLabelEncrypt") : t("outputLabelDecrypt")}</Label>
            <Input id="result" value={result} readOnly />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("visualizationTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-sm overflow-x-auto whitespace-nowrap">
            {visualization.map((row, i) => (
              <div key={i + "_" + row[i]} className="flex">
                {row.map((char, j) => (
                  <span key={j + "_" + char} className={`w-6 h-6 flex items-center justify-center ${char !== " " ? "bg-primary text-primary-foreground" : ""}`}>
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("explanationTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("explanation")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("historyTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("historyContent")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RailFenceCipher;
