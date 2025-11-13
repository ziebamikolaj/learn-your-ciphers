import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LockIcon, Menu, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavItem {
  name: string;
  path: string;
  subItems?: NavItem[];
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    { name: t("navigation.home"), path: "/" },
    {
      name: t("navigation.ciphers"),
      path: "/ciphers",
      subItems: [
        { name: t("navigation.caesarCipher"), path: "/caesar" },
        { name: t("navigation.vigenereCipher"), path: "/vigenere" },
        { name: t("navigation.playfairCipher"), path: "/playfair" },
        { name: t("navigation.railFenceCipher"), path: "/rail-fence" },
      ],
    },
    { name: t("navigation.glossary"), path: "/glossary" },
  ];

  const NavLink: React.FC<{ item: NavItem; mobile?: boolean }> = ({ item, mobile = false }) => (
    <li>
      {item.subItems ? (
        <div className={`relative group ${mobile ? "mb-2" : ""}`}>
          <Button
            variant={location.pathname.startsWith(item.path) ? "secondary" : "ghost"}
            className="text-sm font-medium transition-colors"
            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
          >
            {item.name}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <ul className={`${mobile ? "mt-2 ml-4" : "absolute left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg"} ${!mobile && activeDropdown === item.name ? "block" : "hidden"}`}>
            {item.subItems.map((subItem) => (
              <li key={subItem.path}>
                <Button asChild variant={location.pathname === subItem.path ? "secondary" : "ghost"} className="text-sm font-medium transition-colors w-full justify-start">
                  <Link
                    to={subItem.path}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveDropdown(null);
                    }}
                  >
                    {subItem.name}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Button asChild variant={location.pathname === item.path ? "secondary" : "ghost"} className="text-sm font-medium transition-colors">
          <Link to={item.path} onClick={() => setIsOpen(false)}>
            {item.name}
          </Link>
        </Button>
      )}
    </li>
  );

  return (
    <nav className="bg-background/50 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <LockIcon className="h-6 w-6" />
            <span>Learn Your Ciphers</span>
          </Link>
          <ul className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </ul>
          <LanguageSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <ul className="space-y-4 mt-8">
                {navItems.map((item) => (
                  <NavLink key={item.path} item={item} mobile />
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
