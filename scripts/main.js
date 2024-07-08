import {
    world,
    system
  } from "@minecraft/server";

function mainTick() {
  if (system.currentTick === 400) {
    world.sendMessage("Hello World!");
  }
  system.run(mainTick);
}

system.run(mainTick);