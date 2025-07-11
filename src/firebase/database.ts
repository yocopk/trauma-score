import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "./config";
import type { QuizAnswer, QuizResult } from "../types/quiz";

export async function saveQuizResult(
  answers: QuizAnswer[],
  totalPoints: number,
  locale: string = "it"
): Promise<string> {
  try {
    const quizResult: Omit<QuizResult, "id"> = {
      answers,
      totalPoints,
      locale,
      completedAt: new Date(),
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
