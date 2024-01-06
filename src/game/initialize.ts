import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Vector,
} from "matter-js";
import MatterWrap from "matter-wrap";
import { Application, Graphics, Sprite, Texture } from "pixi.js";

import BG from "../assets/bg.png";

import "@pixi/gif";

import { createAllEmotes } from "./emotes/emoteManager";
import { gameStart } from "./gameController";
import loadPixiAssets from "./load/pixiLoader";
import { getAsset } from "./store/assetsStore";

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const engine = Engine.create({});

export const app = new Application({
  antialias: true,
  width: WIDTH,
  height: HEIGHT,
});

document.body.appendChild(app.view as unknown as Node);

const initialize = async () => {
  await loadPixiAssets();

  const RATIO = WIDTH / HEIGHT;
  const FLOORWIDTH = 50;

  Matter.use(MatterWrap);

  // Set the maximum velocity (adjust as needed)
  const maxVelocity = 20;

  // Listen for beforeUpdate event to limit the velocity
  Events.on(engine, "beforeUpdate", () => {
    engine.world.bodies.forEach((body) => {
      const speed = Vector.magnitude(body.velocity);

      if (speed > maxVelocity) {
        const scaleFactor = maxVelocity / speed;
        Body.setVelocity(body, Vector.mult(body.velocity, scaleFactor));
      }

      const angleSpeed = body.angularVelocity;

      if (angleSpeed > maxVelocity) {
        const scaleFactor = maxVelocity / angleSpeed;
        Body.setVelocity(body, Vector.mult(body.velocity, scaleFactor));
      }
    });
  });

  const bg = new Graphics();
  bg.beginFill(0x000000);
  bg.drawRect(0, 0, WIDTH, HEIGHT);
  bg.endFill();

  const bgTexture = new Sprite(getAsset(BG) as Texture);
  bgTexture.transform.position.set(0, 0);

  app.stage.addChild(bg, bgTexture);
  app.stage.eventMode = "dynamic";

  createAllEmotes();

  app.stage.on("pointerleave", () => {
    const ev = new Event("mouseup");
    mouseConstraint.mouse.element.dispatchEvent(ev);
  });

  app.ticker.add((delta) => {
    for (const body of engine.world.bodies) {
      const sprite = app.stage.getChildByName(body.label);
      if (!sprite) continue;

      sprite.rotation = body.angle;
      sprite.x = body.position.x;
      sprite.y = body.position.y;
    }

    Engine.update(engine, delta * (1000 / 60));
  });

  const mouse = Mouse.create(app.view as HTMLCanvasElement);
  const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });

  Composite.add(engine.world, [
    mouseConstraint,
    // walls
    Bodies.rectangle(WIDTH / 2, 0, HEIGHT, 1, { isStatic: true }),
    Bodies.rectangle(WIDTH, HEIGHT, WIDTH * 2, FLOORWIDTH, { isStatic: true }),
    Bodies.rectangle(WIDTH, HEIGHT / 2, 1, HEIGHT, { isStatic: true }),
    Bodies.rectangle(0, HEIGHT / 2, 1, HEIGHT, { isStatic: true }),
  ]);

  const windoResize = () => {
    const canvas = app.view as HTMLCanvasElement;
    const canvasRatio = canvas.clientWidth / canvas.clientHeight;
    let scaleX = 0,
      scaleY = 0,
      offsetX = 0,
      offsetY = 0;

    if (canvasRatio > RATIO) {
      // if canvas is too wide
      scaleX = RATIO / canvasRatio;
      scaleY = 1;
      offsetX = ((1 - scaleX) * WIDTH) / 2;
      offsetY = 0;
    } else {
      scaleX = 1;
      scaleY = canvasRatio / RATIO;
      offsetX = 0;
      offsetY = ((1 - scaleY) * HEIGHT) / 2;
    }

    app.stage.scale.set(scaleX, scaleY);
    app.stage.position.set(offsetX, offsetY);

    const mouse = mouseConstraint.mouse;

    Mouse.setOffset(mouse, {
      x: -app.stage.x / scaleX,
      y: -app.stage.y / scaleY,
    });
    Mouse.setScale(mouse, {
      x: 1 / scaleX,
      y: 1 / scaleY,
    });
  };

  window.onresize = windoResize;
  windoResize();

  gameStart();
};

initialize();
