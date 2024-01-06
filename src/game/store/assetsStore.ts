import { AnimatedGIF } from "@pixi/gif";
import { Texture } from "pixi.js";

const assetsStore: { [key: string]: AnimatedGIF | Texture } = {};

const isTexture = (obj: unknown): obj is Texture => {
  return obj instanceof Texture;
};

const setAssetsStore = (obj: unknown) => {
  Object.assign(assetsStore, obj);
};

const getAsset = (name: string) => {
  const newStore = assetsStore[name];
  return newStore;
};

export { setAssetsStore, getAsset, isTexture };
