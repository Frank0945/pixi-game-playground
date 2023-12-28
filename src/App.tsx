import { useEffect, useState } from "react";
import * as PIXI from "pixi.js";
import { Container, Sprite } from "react-pixi-fiber";

import bunnySprite from "./assets/bunny.png";

const App = () => {
  const [bunny, setBunny] = useState<Sprite>();

  useEffect(() => {
    setBunny({
      x: 100,
      rotation: 5,
    });
  }, []);

  return (
    <Container>
      <Sprite texture={PIXI.Texture.from(bunnySprite)} y={82} {...bunny} />
    </Container>
  );
};

export default App;
