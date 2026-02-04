"use client";

import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "TV Shows", href: "#" },
  { label: "Movies", href: "#" },
  { label: "New & Popular", href: "#" },
  { label: "My List", href: "#" },
  { label: "Browse by Languages", href: "#" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-12 py-3",
        isScrolled ? "bg-background" : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
            STREAMFLIX
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center gap-1 text-sm text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Browse
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isMobileMenuOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-muted-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-foreground hover:text-muted-foreground transition-colors hidden sm:block">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">U</span>
            </div>
            <ChevronDown className="h-4 w-4 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
          <ul className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
