import React from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">{children}</main>
      <footer className="bg-background/50 backdrop-blur-sm py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Learn Your Ciphers. All rights reserved.</p>
          <p className="mt-2">Decrypt the secrets of cryptography.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
