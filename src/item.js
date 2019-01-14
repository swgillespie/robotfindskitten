import { game } from "./game";

export class Item {
  constructor(x, y, isKitten, description, glyph, color) {
    this._x = x;
    this._y = y;
    this.isKitten = isKitten;
    this.description = description;
    this._glyph = glyph;
    this._color = color;
    this._draw();
  }

  act() {
    // do nothing
    // this._draw();
  }

  _draw() {
    game.display.draw(this._x, this._y, this._glyph, this._color);
  }
}