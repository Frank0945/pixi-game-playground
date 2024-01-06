import { Body, Bounds, Events } from "matter-js";
import { ColorMatrixFilter, Sprite, Texture } from "pixi.js";

import correct from "../../assets/correct.png";
import wrong from "../../assets/wrong.png";
import { nextProgress } from "../gameController";
import { app, engine, HEIGHT, WIDTH } from "../initialize";
import { getAnswer } from "../store/answerStore";
import { getAsset } from "../store/assetsStore";
import {
  getSensorStore,
  removeAllSensors,
  removeSensor,
} from "../store/sensorStore";
import { addSensors, clearAllSensors } from "./sensors";

const lockedBodies: Body[] = [];

export const initialSensorListener = () => {
  Events.on(engine, "afterUpdate", () => {
    for (const body of engine.world.bodies) {
      const sensors = getSensorStore();

      if (body.isStatic || body.label.includes("clap")) continue;

      const sensor = sensors.find((sensor) => {
        const halfSensorWidth = sensor.width / 2;
        const sensorBounds = {
          min: {
            x: sensor.x - halfSensorWidth - 50,
            y: sensor.y - halfSensorWidth - 50,
          },
          max: {
            x: sensor.x + halfSensorWidth - 50,
            y: sensor.y + halfSensorWidth - 50,
          },
        };
        return Bounds.overlaps(sensorBounds, body.bounds);
      });
      if (sensor) {
        console.log("label: ", body.label);
        lockedBodies[sensor.id] = body;
        removeSensor(sensor);
        body.isSensor = true;
        body.isStatic = true;
        Body.setAngularVelocity(body, 0);
        Body.setVelocity(body, { x: 0, y: 0 });
        Body.setAngle(body, 0);
        Body.setPosition(body, { x: sensor.x, y: sensor.y });

        // correction
        setTimeout(() => {
          Body.setPosition(body, { x: sensor.x, y: sensor.y });
        }, 500);

        if (sensors.length === 0) {
          checkCorrected();
        }
      }
    }
  });
};
export const resetSensors = () => {
  removeAllSensors();
  for (const body of lockedBodies) {
    body.isSensor = false;
    body.isStatic = false;
  }
  lockedBodies.length = 0;
};

export const correctedSensor = () => {
  for (const body of lockedBodies) {
    const child = app.stage.getChildByName(body.label);
    if (!child) continue;

    const colorMatrix = new ColorMatrixFilter();
    colorMatrix.brightness(0.4, true);
    child.filters = [colorMatrix];
    child.name += "clap";

    body.label += "clap";
    body.isSensor = false;
    body.isStatic = false;
  }
  lockedBodies.length = 0;
};

const checkCorrected = async () => {
  // wait for the 1 seconds
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let index = 0;
  const corrected = getAnswer();
  clearAllSensors();
  for (const body of lockedBodies) {
    if (corrected[index].name !== body.label) {
      // wrong answer
      showWrong();
      resetSensors();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addSensors(corrected.length);
      return;
    }
    index++;
  }

  // correct answer
  showCorrected();
  correctedSensor();
};

const showCorrected = () => {
  const sprite = new Sprite(getAsset(correct) as Texture);
  sprite.width = 400;
  sprite.height = 200;
  // center of the stage
  sprite.position.set(
    WIDTH / 2 - sprite.width / 2,
    HEIGHT / 2 - sprite.height / 2,
  );
  app.stage.addChild(sprite);
  setTimeout(() => {
    sprite.destroy();
    nextProgress();
  }, 3000);
};

const showWrong = () => {
  const sprite = new Sprite(getAsset(wrong) as Texture);
  sprite.width = 400;
  sprite.height = 200;
  // center of the stage
  sprite.position.set(
    WIDTH / 2 - sprite.width / 2,
    HEIGHT / 2 - sprite.height / 2,
  );
  app.stage.addChild(sprite);
  setTimeout(() => {
    sprite.destroy();
  }, 3000);
};
