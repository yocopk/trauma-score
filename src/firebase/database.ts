import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";
import type { QuizAnswer, QuizResult, LeaderboardEntry } from "../types/quiz";

export async function saveQuizResult(
  answers: QuizAnswer[],
  totalPoints: number,
  locale: string = "it",
  nickname?: string
): Promise<string> {
  try {
    const quizResult: Omit<QuizResult, "id"> = {
      answers,
      totalPoints,
      locale,
      completedAt: new Date(),
      ...(nickname && { nickname }),
    };

    const docRef = await addDoc(collection(db, "quiz-results"), quizResult);
    return docRef.id;
  } catch (error) {
    console.error("Error saving quiz result: ", error);
    throw error;
  }
}

export async function getAverageScore(): Promise<number | null> {
  try {
    const q = query(collection(db, "quiz-results"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // Nessun dato disponibile
    }

    let totalSum = 0;
    let count = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.totalPoints && typeof data.totalPoints === "number") {
        totalSum += data.totalPoints;
        count++;
      }
    });

    return count > 0 ? Math.round(totalSum / count) : null;
  } catch (error) {
    console.error("Error getting average score: ", error);
    throw error;
  }
}

export async function getTotalParticipants(): Promise<number> {
  try {
    const q = query(collection(db, "quiz-results"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting total participants: ", error);
    return 0;
  }
}

export async function getLeaderboard(
  limit_count: number = 10
): Promise<LeaderboardEntry[]> {
  try {
    // Prendi tutti i quiz-results e filtra solo quelli con nickname
    const q = query(collection(db, "quiz-results"));
    const querySnapshot = await getDocs(q);
    const leaderboard: LeaderboardEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Filtra solo i risultati che hanno un nickname
      if (data.nickname && typeof data.totalPoints === "number") {
        leaderboard.push({
          nickname: data.nickname,
          totalPoints: data.totalPoints,
          completedAt: data.completedAt.toDate(),
          locale: data.locale,
        });
      }
    });

    // Ordina per punteggio decrescente e prendi i primi limit_count
    return leaderboard
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit_count);
  } catch (error) {
    console.error("Error getting leaderboard: ", error);
    return [];
  }
}

export async function isNicknameAvailable(nickname: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, "quiz-results"),
      where("nickname", "==", nickname)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // true se non esiste, false se esiste già
  } catch (error) {
    console.error("Error checking nickname availability: ", error);
    return false; // In caso di errore, considera il nickname non disponibile
  }
}
