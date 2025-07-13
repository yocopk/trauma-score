import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLeaderboard } from "../firebase/database";
import type { LeaderboardEntry } from "../types/quiz";
import { Trophy, Medal, Award, X } from "lucide-react";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardModal({
  isOpen,
  onClose,
}: LeaderboardModalProps) {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadLeaderboard();
    }
  }, [isOpen]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await getLeaderboard(10);
      setLeaderboard(data);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-purple-600 font-bold">
            {index + 1}
          </span>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            {t("leaderboard.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t("leaderboard.loading")}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-gray-600">{t("leaderboard.empty")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={`${entry.nickname}-${index}`}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-lg"
                    : index === 1
                    ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 shadow-md"
                    : index === 2
                    ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-md"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex-shrink-0">{getRankIcon(index)}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {entry.nickname}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(entry.completedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">
                    {entry.totalPoints}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t("leaderboard.points")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            {t("leaderboard.subtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
