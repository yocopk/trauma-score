import { useTranslation } from "react-i18next";

export const useTraumaMessages = () => {
  const { t } = useTranslation();

  const getScoreMessage = (score: number): string => {
    let key: string;

    switch (true) {
      case score === 0:
        key = "scoreMessages.0";
        break;
      case score <= 10:
        key = "scoreMessages.1-10";
        break;
      case score <= 20:
        key = "scoreMessages.11-20";
        break;
      case score <= 30:
        key = "scoreMessages.21-30";
        break;
      case score <= 40:
        key = "scoreMessages.31-40";
        break;
      case score <= 50:
        key = "scoreMessages.41-50";
        break;
      case score <= 60:
        key = "scoreMessages.51-60";
        break;
      case score <= 70:
        key = "scoreMessages.61-70";
        break;
      case score <= 80:
        key = "scoreMessages.71-80";
        break;
      case score <= 90:
        key = "scoreMessages.81-90";
        break;
      case score <= 100:
        key = "scoreMessages.91-100";
        break;
      case score <= 110:
        key = "scoreMessages.101-110";
        break;
      case score <= 120:
        key = "scoreMessages.111-120";
        break;
      case score <= 130:
        key = "scoreMessages.121-130";
        break;
      case score <= 140:
        key = "scoreMessages.131-140";
        break;
      case score <= 150:
        key = "scoreMessages.141-150";
        break;
      case score <= 160:
        key = "scoreMessages.151-160";
        break;
      case score <= 170:
        key = "scoreMessages.161-170";
        break;
      case score <= 180:
        key = "scoreMessages.171-180";
        break;
      case score <= 190:
        key = "scoreMessages.181-190";
        break;
      case score <= 200:
        key = "scoreMessages.191-200";
        break;
      case score <= 220:
        key = "scoreMessages.201-220";
        break;
      case score <= 250:
        key = "scoreMessages.221-250";
        break;
      case score <= 300:
        key = "scoreMessages.251-300";
        break;
      default:
        key = "scoreMessages.300+";
    }

    return t(key);
  };

  const getParticipantsMessage = (count: number): string => {
    let key: string;

    switch (true) {
      case count === 0:
        key = "participantMessages.0";
        break;
      case count === 1:
        key = "participantMessages.1";
        break;
      case count <= 5:
        key = "participantMessages.2-5";
        break;
      case count <= 10:
        key = "participantMessages.6-10";
        break;
      case count <= 25:
        key = "participantMessages.11-25";
        break;
      case count <= 50:
        key = "participantMessages.26-50";
        break;
      case count <= 100:
        key = "participantMessages.51-100";
        break;
      case count <= 250:
        key = "participantMessages.101-250";
        break;
      case count <= 500:
        key = "participantMessages.251-500";
        break;
      case count <= 1000:
        key = "participantMessages.501-1000";
        break;
      default:
        key = "participantMessages.1000+";
    }

    return t(key, { count });
  };

  return {
    getScoreMessage,
    getParticipantsMessage,
  };
};
