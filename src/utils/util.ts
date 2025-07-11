import { traumaData } from "../data/traumaData";

export const totalPoints = traumaData.reduce(
  (sum, category) =>
    sum + category.items.reduce((catSum, item) => catSum + item.points, 0),
  0
);
