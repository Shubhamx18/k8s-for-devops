import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  ["Audio Description", "Help Center", "Gift Cards", "Media Center"],
  ["Investor Relations", "Jobs", "Terms of Use", "Privacy"],
  ["Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us"],
];

export function Footer() {
  return (
    <footer className="px-4 md:px-12 py-12 mt-8">
      <div className="max-w-5xl mx-auto">
        {/* Social Icons */}
        <div className="flex items-center gap-6 mb-6">
          <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {footerLinks.flat().map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Service Code Button */}
        <button className="px-3 py-1 border border-muted-foreground text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground">
          © 2026 StreamFlix, Inc.
        </p>
      </div>
    </footer>
  );
}
