import { game } from "./game";
import { DIRS } from "rot-js";

export class Player {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
  }

  act() {
    game.engine.lock();
    window.addEventListener("keydown", this);
  }

  handleEvent(ev) {
    const keyMap = {
      38: 0,
      33: 1,
      39: 2,
      34: 3,
      40: 4,
      35: 5,
      37: 6,
      36: 7,
    };

    const code = ev.keyCode;
    if (!(code in keyMap)) {
      return;
    }

    const [dx, dy] = DIRS[8][keyMap[code]];
    const newX = this._x + dx;
    const newY = this._y + dy;
    const newKey = `${newX},${newY}`;
    if (!(newKey in game.map)) {
      return;
    }

    const entry = game.map[newKey];
    if (entry != null) {
      if (entry.isKitten) {
        game.status("you found the kitten!")
        return;
      }

      game.status(entry.description);
      return;
    }

    game.display.draw(this._x, this._y, "");
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    game.engine.unlock();
  }

  _draw() {
    game.display.draw(this._x, this._y, "#", "#ff0");
  }
}