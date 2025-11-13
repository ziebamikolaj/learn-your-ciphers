import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation("home");

  return (
    <div className="py-20 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-slate-400 pb-2">{t("hero.title")}</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link to="/caesar">{t("hero.buttons.caesar")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/vigenere">{t("hero.buttons.vigenere")}</Link>
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="sm">
            <Link to="/playfair">{t("hero.buttons.playfair")}</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/rail-fence">{t("hero.buttons.railfence")}</Link>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link to="/glossary">{t("hero.buttons.glossary")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
