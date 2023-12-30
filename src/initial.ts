import * as Matter from "matter-js";
import { Application, Assets, Container, Sprite } from "pixi.js";

import "@pixi/gif";

// Matter.js
const engine = Matter.Engine.create({});
const box = Matter.Bodies.rectangle(150, 0, 50, 50); // x y w h
const ground = Matter.Bodies.rectangle(
  // x   y    w    h    options
  0,
  500,
  400,
  120,
  { isStatic: true },
);
const mouseConstraint = Matter.MouseConstraint.create(engine);

Matter.Composite.add(engine.world, [box, ground, mouseConstraint]);

const app = new Application({
  antialias: true,
  resizeTo: window,
});

document.body.appendChild(app.view as unknown as Node);
const camera = new Container();

const boxSprite = await Assets.load(
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-post/1668235903560.gif",
  (number) => {
    console.log("loaded", number);
  },
);

const groundSprite = Sprite.from("http://placekitten.com/400/120");
boxSprite.anchor.set(0.5, 0.5);
boxSprite.width = 50;
boxSprite.height = 50;
groundSprite.anchor.set(0.5, 0.5);

camera.addChild(groundSprite, boxSprite);

app.stage.addChild(camera);

app.ticker.add((delta) => {
  boxSprite.rotation = box.angle;
  boxSprite.x = box.position.x;
  boxSprite.y = box.position.y;
  groundSprite.x = ground.position.x;
  groundSprite.y = ground.position.y;

  // you can set 0 here and physics will be ok
  camera.x = app.screen.width / 2;
  camera.y = 0;
  Matter.Engine.update(engine, delta * (1000 / 60));
});
