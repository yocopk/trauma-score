import { useTranslation } from "react-i18next";
import { traumaData } from "../data/traumaData";
import type { Category } from "../data/traumaData";

export const useTraumaData = (): Category[] => {
  const { t } = useTranslation();

  return traumaData.map((category) => ({
    ...category,
    title: t(`categories.${category.id}`),
    items: category.items.map((item) => ({
      ...item,
      text: t(`traumaItems.${item.id}`),
    })),
  }));
};
