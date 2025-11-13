import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaesarShift from "@/components/CaesarShift";

const CaesarCipher: React.FC = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");
  const { t } = useTranslation("caesarCipher");

  const caesarCipher = (text: string, shift: number, encrypt: boolean): string => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          let shiftAmount = encrypt ? shift : 26 - shift;
          shiftAmount = (code - (isUpperCase ? 65 : 97) + shiftAmount) % 26;
          return String.fromCharCode(shiftAmount + (isUpperCase ? 65 : 97));
        }
        return char;
      })
      .join("");
  };

  useEffect(() => {
    setResult(caesarCipher(text, shift, true));
  }, [text, shift]);

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
          <Tabs defaultValue="encrypt">
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
                  <Input id="plaintext" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("plaintextPlaceholder")} />
                </div>
                <div>
                  <label htmlFor="shift" className="block text-sm font-medium text-gray-700">
                    {t("shift")}: {shift}
                  </label>
                  <Slider id="shift" min={0} max={25} step={1} value={[shift]} onValueChange={(value) => setShift(value[0])} />
                </div>
                <div>
                  <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700">
                    {t("ciphertext")}
                  </label>
                  <Input id="ciphertext" type="text" value={result} readOnly />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="decrypt">
              <div className="space-y-4">
                <div>
                  <label htmlFor="ciphertext" className="block text-sm font-medium text-gray-700">
                    {t("ciphertext")}
                  </label>
                  <Input id="ciphertext" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("ciphertextPlaceholder")} />
                </div>
                <div>
                  <label htmlFor="shift" className="block text-sm font-medium text-gray-700">
                    {t("shift")}: {shift}
                  </label>
                  <Slider id="shift" min={0} max={25} step={1} value={[shift]} onValueChange={(value) => setShift(value[0])} />
                </div>
                <div>
                  <label htmlFor="plaintext" className="block text-sm font-medium text-gray-700">
                    {t("plaintext")}
                  </label>
                  <Input id="plaintext" type="text" value={caesarCipher(text, shift, false)} readOnly />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">{t("shiftVisualization")}</h3>
            <CaesarShift shift={shift} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("howItWorks")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("encryptionExplanation")}</p>
          <p className="mt-2">{t("decryptionExplanation")}</p>
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

export default CaesarCipher;
