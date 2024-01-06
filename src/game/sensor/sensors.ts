import { Bodies, Body, Composite } from "matter-js";
import { Container, Graphics } from "pixi.js";

import { EMOTE_SIZE } from "../emotes/emotes";
import { app, engine } from "../initialize";
import { Sensor, setSensorStore } from "../store/sensorStore";

const SPRITE_BORDER = 4;
const MARGIN = 90;

const bodies: Body[] = [];
const sprites: Container[] = [];

export const addSensors = (amount: number) => {
  const sensors: Sensor[] = [];

  for (let i = 0; i < amount; i++) {
    const x = 100 + (EMOTE_SIZE + MARGIN) * i,
      y = 100;
    const box = Bodies.rectangle(x, y, EMOTE_SIZE, EMOTE_SIZE, {
      isSensor: true,
      isStatic: true,
    });
    bodies.push(box);
    sensors.push({ x, y, width: EMOTE_SIZE, id: i });
  }
  setSensorStore(sensors);

  bodies.forEach((body) => {
    const container = new Container();

    const graphics = new Graphics();
    graphics.lineStyle(SPRITE_BORDER, 0xffffff, 0.5);
    graphics.drawRect(0, 0, EMOTE_SIZE, EMOTE_SIZE);

    container.width = EMOTE_SIZE;
    container.height = EMOTE_SIZE;
    container.position.set(body.position.x, body.position.y);
    container.pivot.set(EMOTE_SIZE / 2, EMOTE_SIZE / 2);

    container.addChild(graphics);

    sprites.push(container);
  });

  Composite.add(engine.world, bodies);
  app.stage.addChild(...sprites);
};

export const clearAllSensors = () => {
  // clear bodies and sprites
  Composite.remove(engine.world, bodies);
  app.stage.removeChild(...sprites);
  bodies.length = 0;
  sprites.length = 0;
};
