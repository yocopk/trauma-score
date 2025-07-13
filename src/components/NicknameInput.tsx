import { useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Check, Edit2, X } from "lucide-react";
import { containsBadWord } from "../utils/block-words";
import { isNicknameAvailable } from "../firebase/database";

interface NicknameInputProps {
  onNicknameSet: (nickname: string) => void;
}

export default function NicknameInput({ onNicknameSet }: NicknameInputProps) {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const validateNickname = async (text: string): Promise<string | null> => {
    const trimmed = text.trim();

    if (trimmed.length < 2) {
      return t("nickname.errors.tooShort");
    }

    if (trimmed.length > 12) {
      return t("nickname.errors.tooLong");
    }

    if (trimmed.includes(" ")) {
      return t("nickname.errors.noSpaces");
    }

    // Controlla se il nickname contiene solo numeri
    if (/^\d+$/.test(trimmed)) {
      return t("nickname.errors.onlyNumbers");
    }

    if (containsBadWord(trimmed)) {
      return t("nickname.errors.inappropriate");
    }

    // Controlla se il nickname è già in uso
    const isAvailable = await isNicknameAvailable(trimmed);
    if (!isAvailable) {
      return t("nickname.errors.taken");
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();

    setIsChecking(true);
    setError("");

    const validationError = await validateNickname(trimmedNickname);
    if (validationError) {
      setError(validationError);
      setIsChecking(false);
      return;
    }

    // Se arriva qui, il nickname è valido e disponibile
    setSavedNickname(trimmedNickname);
    onNicknameSet(trimmedNickname);
    setShowInput(false);
    setNickname("");
    setError("");
    setIsChecking(false);
  };

  const handleBlur = async () => {
    if (nickname.trim()) {
      await handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    // Rimuovi l'errore quando l'utente inizia a digitare
    if (error) {
      setError("");
    }
  };

  const handleEdit = () => {
    setNickname(savedNickname);
    setShowInput(true);
  };

  const handleRemove = () => {
    setSavedNickname("");
    onNicknameSet("");
    setShowInput(false);
    setNickname("");
  };

  // Se c'è un nickname salvato, mostra il feedback persistente
  if (savedNickname && !showInput) {
    return (
      <div className="mb-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm">{savedNickname}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleEdit}
                className="text-purple-200 hover:text-white transition-colors p-1 rounded"
                title={t("nickname.edit")}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRemove}
                className="text-purple-200 hover:text-red-300 transition-colors p-1 rounded"
                title={t("nickname.remove")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showInput) {
    return (
      <div className="mb-6">
        <div className="flex items-center text-purple-200 text-sm mb-3">
          <div className="flex-1 h-px bg-purple-300/30"></div>
          <span className="px-4">oppure</span>
          <div className="flex-1 h-px bg-purple-300/30"></div>
        </div>
        <button
          onClick={() => setShowInput(true)}
          className="w-full text-purple-200 hover:text-white px-4 py-2 text-sm underline underline-offset-2 hover:no-underline transition-all duration-200 flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4" />
          {t("nickname.button")}
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center text-purple-200 text-sm mb-3">
        <div className="flex-1 h-px bg-purple-300/30"></div>
        <span className="px-4">oppure</span>
        <div className="flex-1 h-px bg-purple-300/30"></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={nickname}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={t("nickname.placeholder")}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:border-transparent text-white placeholder-gray-500 ${
              error
                ? "border-red-400 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
            maxLength={12}
            minLength={2}
            autoFocus
            disabled={isChecking}
          />
          {isChecking && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
            </div>
          )}
        </div>
        {isChecking && (
          <p className="text-xs text-purple-200 text-center">
            {t("nickname.checking")}
          </p>
        )}
        {error && <p className="text-xs text-red-300 text-center">{error}</p>}
        <p className="text-xs text-purple-200 text-center">
          {t("nickname.hint")}
        </p>
      </form>
    </div>
  );
}
