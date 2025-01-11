import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Glossary: React.FC = () => {
  const { t } = useTranslation("glossary");
  const [searchTerm, setSearchTerm] = useState("");

  const terms = useMemo(
    () => [
      "cipher",
      "plaintext",
      "ciphertext",
      "encryption",
      "decryption",
      "key",
      "cryptography",
      "cryptanalysis",
      "substitutionCipher",
      "transpositionCipher",
      "caesarCipher",
      "vigenereCipher",
      "playfairCipher",
      "symmetricEncryption",
      "asymmetricEncryption",
      "publicKey",
      "privateKey",
      "algorithm",
      "cryptosystem",
      "steganography",
    ],
    []
  );

  const filteredTerms = useMemo(() => {
    const lowercaseSearch = searchTerm.toLowerCase();
    return terms.filter((term) => t(`terms.${term}.term`).toLowerCase().includes(lowercaseSearch) || t(`terms.${term}.definition`).toLowerCase().includes(lowercaseSearch));
  }, [terms, searchTerm, t]);

  const jumpToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pt-16">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2">{t("title")}</h1>
      <p className="text-xl text-muted-foreground">{t("description")}</p>
      <Input type="search" placeholder={t("searchPlaceholder")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-6" />
      <div className="flex flex-wrap gap-2 mb-6">
        {terms.map((term, index) => (
          <Button key={term} variant="outline" size="sm" onClick={() => jumpToSection(`term-${index}`)}>
            {t(`terms.${term}.term`)}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{t("glossaryTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-6">
            {filteredTerms.map((term, index) => (
              <div key={term} id={`term-${index}`} className="border-b border-gray-200 pb-4 last:border-b-0">
                <dt className="text-lg font-semibold mb-2 text-primary">{t(`terms.${term}.term`)}</dt>
                <dd className="text-gray-700">{t(`terms.${term}.definition`)}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      {filteredTerms.length === 0 && <p className="text-center text-gray-500">{t("noResults")}</p>}
    </div>
  );
};

export default Glossary;
