import { useTranslation } from "react-i18next";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const { t } = useTranslation("home");

  return (
    <div className="space-y-12">
      <Hero />
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("features.interactive.title")}</CardTitle>
          </CardHeader>
          <CardContent>{t("features.interactive.description")}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("features.explanations.title")}</CardTitle>
          </CardHeader>
          <CardContent>{t("features.explanations.description")}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
