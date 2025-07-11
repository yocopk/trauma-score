import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import itFlag from "../assets/flags/it.svg";
import enFlag from "../assets/flags/en.svg";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "it", name: "Italiano", flag: itFlag },
    { code: "en", name: "English", flag: enFlag },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-2 left-2 z-20" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-200"
        >
          <Globe className="w-4 h-4" />
          <img
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            className="w-4 h-4 rounded-sm"
          />
          <span>{currentLanguage.name}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-purple-100 transition-colors duration-200 ${
                  lang.code === i18n.language
                    ? "bg-purple-200 text-purple-900"
                    : "text-gray-800"
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-4 h-4 rounded-sm"
                />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
