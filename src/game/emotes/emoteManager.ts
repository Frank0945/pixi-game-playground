import { Bodies, Body, Composite } from "matter-js";
import { Container, Graphics, Sprite } from "pixi.js";

import { app, engine, HEIGHT, WIDTH } from "../initialize";
import { getAsset, isTexture } from "../store/assetsStore";
import { EMOTE_SIZE, EMOTES } from "./emotes";

const SPRITE_BORDER = 4;

export const createAllEmotes = () => {
  const bodies: Body[] = [];

  let index = 0;
  for (const [, value] of Object.entries(EMOTES)) {
    // 6 * 12
    const x = 365 + (EMOTE_SIZE + 10) * (index % 12);
    const y = 300 + (EMOTE_SIZE + 10) * Math.floor(index / 12);

    const box = Bodies.rectangle(x, y, EMOTE_SIZE, EMOTE_SIZE, {
      restitution: 0.6,
      label: value.name,
      angle: Math.random() * 360,
      plugin: {
        wrap: {
          min: {
            x: EMOTE_SIZE - 10,
            y: EMOTE_SIZE - 10,
          },
          max: {
            x: WIDTH,
            y: HEIGHT,
          },
        },
      },
    });
    bodies.push(box);
    index++;
  }

  const sprites: Container[] = [];
  bodies.forEach((body) => {
    const emote = EMOTES.find((emote) => emote.name === body.label);

    if (!emote) return;

    const container = new Container();

    const asset = getAsset(emote.src);

    const sprite = isTexture(asset) ? new Sprite(asset) : asset;

    sprite.position.set(0, 0);
    sprite.width = EMOTE_SIZE - SPRITE_BORDER;
    sprite.height = EMOTE_SIZE - SPRITE_BORDER;
    const graphics = new Graphics();

    // randomn color
    const color = Math.floor(Math.random() * 16777215);

    graphics.lineStyle(SPRITE_BORDER, color, 0.6);
    graphics.drawRect(sprite.x, sprite.y, sprite.width, sprite.height);

    container.name = emote.name;
    container.width = EMOTE_SIZE;
    container.height = EMOTE_SIZE;
    container.position.set(body.position.x, body.position.y);
    container.pivot.set(sprite.width / 2, sprite.height / 2);

    container.addChild(graphics, sprite);

    sprites.push(container);
  });

  Composite.add(engine.world, bodies);
  app.stage.addChild(...sprites);
};
