/*
  Obiettivo: TraumaScore app single player
  Stack: React + Vite, TailwindCSS, Mobile First
  Features:
    - Lista categorie con checkbox + punteggio
    - Navigazione step by step tra categorie
    - Punteggio totale al termine + frase ironica
    - UI mobile friendly (max 1 colonna, testo leggibile)
    - Possibile uso di useState per score tracking
    - Facoltativo: localStorage per persistenza selezioni
*/

import { useState } from "react";
import { traumaData } from "./data/traumaData";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  X,
  Share,
  RotateCcw,
} from "lucide-react";

const getScoreMessage = (score: number): string => {
  switch (true) {
    case score === 0:
      return "Wow, sei praticamente invincibile! Oppure hai mentito... 🤔";
    case score <= 10:
      return "Vita abbastanza tranquilla, complimenti! 🌈";
    case score <= 20:
      return "Tutto sommato potresti stare peggio! 😌";
    case score <= 30:
      return "Qualche botta ma niente di grave 💪";
    case score <= 40:
      return "Beh, almeno non sei l'unico con qualche problemino... 😅";
    case score <= 50:
      return "Inizia a farsi interessante la situazione 🤨";
    case score <= 60:
      return "Congratulazioni! Sei ufficialmente 'damaged' 🎉";
    case score <= 70:
      return "Il trauma è forte in questo... 🌪️";
    case score <= 80:
      return "A questo punto dovresti scrivere un libro sulla resilienza 📚";
    case score <= 90:
      return "Sei un sopravvissuto professionista 🏆";
    case score <= 100:
      return "Ok, forse è ora di chiamare un terapeuta... o cinque 🧠";
    case score <= 120:
      return "Plot armor activated! Come fai ad essere ancora qui? 🛡️";
    case score <= 150:
      return "Sei letteralmente un anime protagonist. Rispetto! 🔥";
    case score <= 200:
      return "A questo punto sei immortale per puro dispetto 😈";
    default:
      return "Hai sbloccato il trauma infinito. Achievement unlocked! 🏅✨";
  }
};

function App() {
  const [currentStep, setCurrentStep] = useState<
    "welcome" | "quiz" | "results"
  >("welcome");
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleItemToggle = (itemId: string, points: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
      setTotalScore((prev) => prev - points);
    } else {
      newSelected.add(itemId);
      setTotalScore((prev) => prev + points);
    }
    setSelectedItems(newSelected);
  };

  const handleNext = () => {
    if (currentCategoryIndex < traumaData.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
    } else {
      setCurrentStep("results");
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep("welcome");
    setCurrentCategoryIndex(0);
    setSelectedItems(new Set());
    setTotalScore(0);
  };

  const generateShareText = () => {
    let categoryText = "";

    traumaData.forEach((category) => {
      const categoryItems = category.items.filter((item) =>
        selectedItems.has(item.id)
      );
      if (categoryItems.length > 0) {
        categoryText += `\n${category.title}:\n`;
        categoryItems.forEach((item) => {
          categoryText += `• ${item.text} (+${item.points})\n`;
        });
      }
    });

    const shareText = `🎯 Il mio TraumaScore: ${totalScore}\n\n${getScoreMessage(
      totalScore
    )}\n\nLe mie risposte:${categoryText}\n\n#TraumaScore`;

    return shareText;
  };

  const handleShare = () => {
    console.log("handleShare called"); // Debug
    setShowShareModal(true);
    console.log("showShareModal set to true"); // Debug
  };

  const copyToClipboard = async () => {
    const shareText = generateShareText();
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Risultato copiato negli appunti! 📋");
      setShowShareModal(false);
    } catch {
      // Se la clipboard non funziona, mostra il testo in un prompt
      prompt("Copia questo testo per condividerlo:", shareText);
    }
  };

  const currentCategory = traumaData[currentCategoryIndex];

  if (currentStep === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
        {/* Sezione link social in alto */}
        <div className="absolute top-4 right-4 flex space-x-3">
          <a
            href="https://instagram.com/yocopk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200 transition-colors duration-200"
            title="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://github.com/yocopk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200 transition-colors duration-200"
            title="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/andrea-marchese-18a488285/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200 transition-colors duration-200"
            title="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        <div className="text-center max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            TraumaScore
          </h1>
          <p className="text-purple-200 text-lg mb-8 leading-relaxed">
            Scopri quanto sei "damaged" con questo quiz scientificamente
            discutibile
          </p>
          <button
            onClick={() => setCurrentStep("quiz")}
            className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Inizia il Test
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === "results") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-purple-900 mb-4">
                Il tuo Trauma Score
              </h2>
              <div className="text-6xl font-bold text-purple-600 mb-4">
                {totalScore}
              </div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {getScoreMessage(totalScore)}
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Share className="w-5 h-5" />
                  Condividi Risultato {showShareModal ? "(APERTA)" : ""}
                </button>
                <button
                  onClick={handleRestart}
                  className="w-full bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Ricomincia
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modale di condivisione - spostata qui per essere sempre visibile */}
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              // Chiudi la modale se clicchi sullo sfondo
              if (e.target === e.currentTarget) {
                setShowShareModal(false);
              }
            }}
          >
            <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl">
              {/* Header della modale */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Il tuo risultato
                  </h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Contenuto scrollabile */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
                    <Target className="w-8 h-8" />
                    {totalScore}
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    {getScoreMessage(totalScore)}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">
                    Le tue risposte:
                  </h4>

                  {traumaData.map((category) => {
                    const categoryItems = category.items.filter((item) =>
                      selectedItems.has(item.id)
                    );
                    if (categoryItems.length === 0) return null;

                    return (
                      <div
                        key={category.id}
                        className="border-l-4 border-purple-300 pl-4"
                      >
                        <h5 className="font-medium text-purple-800 mb-2">
                          {category.title}
                        </h5>
                        <ul className="space-y-1">
                          {categoryItems.map((item) => (
                            <li
                              key={item.id}
                              className="text-sm text-gray-700 flex justify-between"
                            >
                              <span>• {item.text}</span>
                              <span className="text-purple-600 font-medium">
                                +{item.points}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer con pulsanti */}
              <div className="p-6 border-t border-gray-200">
                <div className="space-y-3">
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    Copia Risultato
                  </button>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-400 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Chiudi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">TraumaScore</h1>
          <div className="flex justify-center items-center space-x-2 text-purple-200">
            <span className="text-sm">
              {currentCategoryIndex + 1} / {traumaData.length}
            </span>
            <div className="w-32 bg-purple-800 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentCategoryIndex + 1) / traumaData.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
          <div className="text-purple-200 text-sm mt-2">
            Score attuale: {totalScore}
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
            {currentCategory.title}
          </h2>

          <div className="space-y-4">
            {currentCategory.items.map((item) => (
              <label
                key={item.id}
                className="flex items-start space-x-3 cursor-pointer p-3 rounded-xl hover:bg-purple-50 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => handleItemToggle(item.id, item.points)}
                  className="mt-1 w-5 h-5 text-purple-600 border-2 border-purple-300 rounded focus:outline-none"
                />
                <div className="flex-1">
                  <span className="text-gray-800 leading-relaxed">
                    {item.text}
                  </span>
                  <span className="text-purple-600 font-semibold ml-2">
                    (+{item.points})
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-4 mt-8">
            {/* Pulsanti di navigazione */}
            <div className="flex space-x-3">
              {currentCategoryIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-500 text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Indietro
                </button>
              )}
              <button
                onClick={handleNext}
                className={`${
                  currentCategoryIndex > 0 ? "flex-1" : "w-full"
                } bg-purple-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2`}
              >
                {currentCategoryIndex < traumaData.length - 1 ? (
                  <>
                    Avanti
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Vedi Risultato
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
