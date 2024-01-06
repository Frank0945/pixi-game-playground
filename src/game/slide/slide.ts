import { Graphics, Sprite } from "pixi.js";

import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import { Emotes } from "../emotes/emotes";
import { app, HEIGHT, WIDTH } from "../initialize";
import { getAnswer } from "../store/answerStore";
import { getAsset, isTexture } from "../store/assetsStore";

const slideSize = 200;

const countdown = [
  { name: "3", src: three },
  { name: "2", src: two },
  { name: "1", src: one },
];

const showSlide = (emotes: Emotes[]) => {
  let index = 0;
  let oldSprite: Sprite;

  const slides = countdown.concat(emotes);

  const bg = new Graphics();
  bg.beginFill(0x000000);
  bg.alpha = 0.7;
  bg.drawRect(0, 0, WIDTH, HEIGHT);
  bg.endFill();
  app.stage.addChild(bg);

  const interval = setInterval(() => {
    if (oldSprite) {
      oldSprite.destroy();
    }

    if (index === slides.length) {
      clearInterval(interval);
      bg.destroy();
      return;
    }

    const emote = slides[index];
    const asset = getAsset(emote.src);

    const sprite = isTexture(asset) ? new Sprite(asset) : asset.clone();

    sprite.width = slideSize;
    sprite.height = slideSize;

    // set center of stage
    sprite.x = WIDTH / 2 - sprite.width / 2;
    sprite.y = HEIGHT / 2 - sprite.height / 2;

    oldSprite = sprite;

    app.stage.addChild(sprite);
    index++;
  }, 1200);
};

export const nextSlide = (emotes: Emotes[]) => {
  showSlide(emotes);
};

export const showSlidesAgain = () => {
  showSlide(getAnswer());
};
