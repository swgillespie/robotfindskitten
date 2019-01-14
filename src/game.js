import { Display, Map, RNG, Scheduler, Engine, Color } from "rot-js";
import { Player } from "./player";
import { Item } from "./item";

export class Game {
  constructor() {
    this.width = 100;
    this.height = 50;
    this.display = new Display({
      width: this.width,
      height: this.height,
    });
    this.map = {};
    this.player = null;
    this.items = [];
    this.engine = null;
    this.previousStatus = "";
    document.body.appendChild(this.display.getContainer());
  }

  run() {
    this._generateMap();
    const scheduler = new Scheduler.Simple();
    scheduler.add(this.player, true);
    for (const item of this.items) {
      scheduler.add(item, true);
    }
    this.engine = new Engine(scheduler);
    this.engine.start();
  }

  status(msg) {
    let idx = 0;
    for (const chr of this.previousStatus) {
      this.display.draw(idx, 0, "");
      idx++;
    }

    idx = 0;
    for (const chr of msg) {
      this.display.draw(idx, 0, chr);
      idx++;
    }

    this.previousStatus = msg;
  }

  _generateMap() {
    // Initially, the map is completely empty.
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.map[`${i},${j}`] = null;
      }
    }

    const freeCells = RNG.shuffle(Object.keys(this.map));

    // First, assign a cell to the player.
    const playerCell = freeCells.pop();
    const [playerX, playerY] = playerCell.split(",");
    this.player = new Player(parseInt(playerX), parseInt(playerY));

    // Create a kitten.
    this._generateItem(freeCells.pop(), true);

    // Create a few items.
    for (let i = 0; i < 9; i++) {
      this._generateItem(freeCells.pop(), false);
    }
  }
  
  _generateItem(cell, isKitten) {
    const color = Color.toHex([
      RNG.getUniformInt(0, 255),
      RNG.getUniformInt(0, 255),
      RNG.getUniformInt(0, 255),
    ]);

    const glyph = RNG.getItem(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%^*()".split("")
    );

    const description = RNG.getItem([
      "It's a null pointer. Its emptiness echoes inside you.",
      "It's a horrifyingly large spider.",
      "It's a corgi.",
      "It's Ada Lovelace! She pats your head.",
      "Some beans. They look less than delicious.",
      "A hole. You peer down. It's frighteningly deep.",
      "A fountain of chocolate. Too bad you don't have a mouth.",
      "A horse, standing motionless. You poke it. It moves slightly.",
      "A nice set of silverware.",
      "Another robot. Maybe they're also looking for kitten.",
      "Robot kitten. Popular in the 90s.",
      "Some kibble. Perhaps kitten is nearby.",
      "It's a copy of Guitar Hero. No TVs in sight, though.",
      "It's the 1972 Miami Dolphins, having a nice meal together.",
      "It's Ferris the Rustacean. He bristles at all of this JavaScript.",
    ]);

    const [x, y] = cell.split(",")
    const item = new Item(parseInt(x), parseInt(y), isKitten, description, glyph, color);
    this.items.push(item);
    this.map[cell] = item;
  }
}

export const game = new Game();
