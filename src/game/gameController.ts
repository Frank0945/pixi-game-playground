import { Sprite, Texture } from "pixi.js";

import LookAgain from "../assets/look_again.png";
import { EMOTES } from "./emotes/emotes";
import { app, WIDTH } from "./initialize";
import { initialSensorListener } from "./sensor/sensorListener";
import { addSensors } from "./sensor/sensors";
import { nextSlide, showSlidesAgain } from "./slide/slide";
import { setAnswer } from "./store/answerStore";
import { getAsset } from "./store/assetsStore";

const AMOUNT = [3, 4, 5, 5, 6, 7, 7, 8, 9, 9, 9];
let progressIdx = 0;
const emoteList = EMOTES.sort(() => Math.random() - Math.random());

export const gameStart = async () => {
  alert(
    "[Due to time constraints, we're limited to this form of communication. I appreciate your understanding.]",
  );
  alert("Vedal: My channel's emotes are gone? Neuro, did you eat them all?");
  alert("Neuro: Erm, what? Sorry, I was just teasing you.");
  alert(
    "System: You need to drag the corresponding emotes back into their respective squares based on the brief impression shortly.",
  );
  alert("Tips: Remember the emotes that appear when the countdown complete.");
  // wait for 2 second
  await new Promise((resolve) => setTimeout(resolve, 2000));
  watchAgain();
  initialSensorListener();
  nextProgress();
};

let oldIdx = 0;

export const nextProgress = () => {
  if (progressIdx === AMOUNT.length) {
    alert("You found all emotes, Congrats!");
    return;
  }

  const amount = AMOUNT[progressIdx];
  addSensors(amount);
  const emotes = emoteList.slice(oldIdx, oldIdx + amount);
  nextSlide(emotes);
  setAnswer(emotes);
  console.log("ans(do not cheat): ", emotes);
  oldIdx += amount;
  progressIdx++;
};

const watchAgain = () => {
  const button = new Sprite(getAsset(LookAgain) as Texture);
  button.eventMode = "dynamic";
  button.width = 200;
  button.height = 100;
  // top-right
  button.position.set(WIDTH - button.width, 0);
  // add hover effect
  button.on("pointerover", () => {
    button.alpha = 0.7;
  });
  button.on("pointerout", () => {
    button.alpha = 1;
  });

  button.on("pointerdown", () => {
    showSlidesAgain();
  });

  app.stage.addChild(button);
};
