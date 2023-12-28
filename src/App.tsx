import { useEffect, useState } from "react";
import { _ReactPixi, Container, Sprite } from "@pixi/react";

import bunnySprite from "./assets/bunny.png";

const App = () => {
  const [bunny, setBunny] = useState<_ReactPixi.ISprite>();

  useEffect(() => {
    setBunny({
      x: 100,
      rotation: 5,
    });
  }, []);

  return (
    <Container>
      <Sprite image={bunnySprite} y={82} {...bunny} />
    </Container>
  );
};

export default App;
