import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PlayfairGrid from "@/components/PlayfairGrid";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";

const PlayfairCipher: React.FC = () => {
  const { t } = useTranslation("playfairCipher");
  const [plaintext, setPlaintext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [encryptionSteps, setEncryptionSteps] = useState<string[]>([]);
  const [decryptionSteps, setDecryptionSteps] = useState<string[]>([]);
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);

  const generateGrid = useCallback((key: string) => {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Note: I and J are combined
    const uniqueChars = Array.from(new Set(key.toUpperCase().replace(/J/g, "I") + alphabet));
    const newGrid: string[][] = [];
    for (let i = 0; i < 5; i++) {
      newGrid.push(uniqueChars.slice(i * 5, (i + 1) * 5));
    }
    return newGrid;
  }, []);

  const encryptOrDecrypt = useCallback(
    (text: string, grid: string[][], decrypt: boolean) => {
      let result = "";
      const steps: string[] = [];
      const preparedText = text
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

      steps.push(t(decrypt ? "preparedCiphertext" : "preparedText", { text: preparedText }));

      for (let i = 0; i < preparedText.length; i += 2) {
        let pair = preparedText.slice(i, i + 2);
        if (pair.length === 1) pair += "X";
        if (!decrypt && pair[0] === pair[1]) pair = pair[0] + "X";

        steps.push(t("processingPair", { pair }));

        const [row1, col1] = findPosition(pair[0], grid);
        const [row2, col2] = findPosition(pair[1], grid);

        let processedPair = "";
        if (row1 === row2) {
          processedPair = decrypt ? grid[row1][(col1 - 1 + 5) % 5] + grid[row2][(col2 - 1 + 5) % 5] : grid[row1][(col1 + 1) % 5] + grid[row2][(col2 + 1) % 5];
          steps.push(t(decrypt ? "sameRowRuleDecrypt" : "sameRowRule", { pair, processedPair }));
        } else if (col1 === col2) {
          processedPair = decrypt ? grid[(row1 - 1 + 5) % 5][col1] + grid[(row2 - 1 + 5) % 5][col2] : grid[(row1 + 1) % 5][col1] + grid[(row2 + 1) % 5][col2];
          steps.push(t(decrypt ? "sameColumnRuleDecrypt" : "sameColumnRule", { pair, processedPair }));
        } else {
          processedPair = grid[row1][col2] + grid[row2][col1];
          steps.push(t("rectangleRule", { pair, processedPair }));
        }

        result += processedPair;
      }

      steps.push(t(decrypt ? "finalResultDecrypt" : "finalResultEncrypt", { result }));
      if (decrypt) {
        setDecryptionSteps(steps);
      } else {
        setEncryptionSteps(steps);
      }
      return result;
    },
    [t]
  );

  const findPosition = (char: string, grid: string[][]) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[i][j] === char) return [i, j];
      }
    }
    return [-1, -1];
  };

  useEffect(() => {
    if (keyword) {
      const newGrid = generateGrid(keyword);
      setGrid(newGrid);
      if (isDecrypting) {
        if (encryptedText) {
          const decrypted = encryptOrDecrypt(encryptedText, newGrid, true);
          setDecryptedText(decrypted);
        }
      } else {
        if (plaintext) {
          const encrypted = encryptOrDecrypt(plaintext, newGrid, false);
          setCiphertext(encrypted);
        }
      }
    } else {
      setGrid([]);
      setCiphertext("");
      setDecryptedText("");
      setEncryptionSteps([]);
      setDecryptionSteps([]);
    }
  }, [plaintext, encryptedText, keyword, generateGrid, encryptOrDecrypt, isDecrypting]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">{t("title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("whatIs")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("description")}</p>
          <p className="mt-4">{t("example")}</p>
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
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                  {t("keyword")}
                </label>
                <Input id="keyword" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder={t("keyword")} />
              </div>
              <div>
                <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700">
                  {t("plaintext")}
                </label>
                <Input id="plaintext" type="text" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} placeholder={t("plaintext")} />
              </div>
              <div>
                <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700">
                  {t("ciphertext")}
                </label>
                <Input id="ciphertext" type="text" value={ciphertext} readOnly />
              </div>
              {grid.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">{t("gridVisualization")}</h3>
                  <PlayfairGrid grid={grid} />
                </div>
              )}
              {encryptionSteps.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">{t("encryptionSteps")}</h3>
                  <ol className="list-decimal list-inside">
                    {encryptionSteps.map((step, index) => (
                      <li key={index + "_" + step} className="mb-2">
                        <span dangerouslySetInnerHTML={{ __html: step }} />
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </TabsContent>
            <TabsContent value="decrypt">
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                  {t("keyword")}
                </label>
                <Input id="keyword" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder={t("keyword")} />
              </div>
              <div>
                <label htmlFor="encryptedtext" className="block text-sm font-medium text-gray-700">
                  {t("encryptedtext")}
                </label>
                <Input id="encryptedtext" type="text" value={encryptedText} onChange={(e) => setEncryptedText(e.target.value)} placeholder={t("encryptedtext")} />
              </div>
              <div>
                <label htmlFor="decryptedtext" className="block text-sm font-medium text-gray-700">
                  {t("decryptedtext")}
                </label>
                <Input id="decryptedText" type="text" value={decryptedText} readOnly />
              </div>
              {grid.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">{t("gridVisualization")}</h3>
                  <PlayfairGrid grid={grid} />
                </div>
              )}
              {decryptionSteps.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">{t("decryptionSteps")}</h3>
                  <ol className="list-decimal list-inside">
                    {decryptionSteps.map((step, index) => (
                      <li key={index + "_" + step} className="mb-2">
                        <span dangerouslySetInnerHTML={{ __html: step }} />
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("historicalContext")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("history")}</p>
          <p className="mt-4">{t("modernUse")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayfairCipher;
