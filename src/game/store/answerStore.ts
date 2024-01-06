import { Emotes } from "../emotes/emotes";

let answerStore: Emotes[];

export const getAnswer = () => {
  return answerStore;
};

export const setAnswer = (emotes: Emotes[]) => {
  answerStore = emotes;
};
