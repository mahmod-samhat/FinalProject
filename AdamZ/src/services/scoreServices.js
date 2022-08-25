import hegedem from "../hegedem.json";
import httpService from "./httpServices";

export function getAllScores() {
  return httpService.get("/scores");
}
export function setScores(scores) {
  return httpService.post("/scores/setScores", scores);
}

export function generateTextGrade(grade) {
  const getTextGrade = (level) => {
    return {
      textScore: hegedem[level].textGrade,
      heged:
        hegedem[level].hegedem[
          Math.floor(Math.random() * hegedem[level].hegedem.length)
        ],
    };
  };
  switch (true) {
    case grade > 94:
      return getTextGrade("five");

    case grade > 84:
      return getTextGrade("four");

    case grade > 69:
      return getTextGrade("three");

    case grade > 54:
      return getTextGrade("two");

    case grade > 39:
      return getTextGrade("one");
  }
}

const scoreService = {
  generateTextGrade,
  setScores,
  getAllScores,
};
export default scoreService;
