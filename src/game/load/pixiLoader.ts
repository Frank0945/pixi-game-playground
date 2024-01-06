import { Assets } from "pixi.js";

import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import BG from "../../assets/bg.png";
import correct from "../../assets/correct.png";
import LookAgain from "../../assets/look_again.png";
import wrong from "../../assets/wrong.png";
import { EMOTES_ASSETS } from "../emotes/emotes";
import { setAssetsStore } from "../store/assetsStore";

const assetList = [BG, one, two, three, correct, wrong, LookAgain];

const loadPixiAssets = async () => {
  const assets = await Assets.load(
    EMOTES_ASSETS.concat(assetList),
    (progress) => {
      console.log(progress);
    },
  );
  console.log(assets);
  setAssetsStore(assets);
};

export default loadPixiAssets;
