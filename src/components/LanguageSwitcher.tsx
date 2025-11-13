import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <Button variant={i18n.language === "en" ? "secondary" : "outline"} onClick={() => changeLanguage("en")}>
        EN
      </Button>
      <Button variant={i18n.language === "pl" ? "secondary" : "outline"} onClick={() => changeLanguage("pl")}>
        PL
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
