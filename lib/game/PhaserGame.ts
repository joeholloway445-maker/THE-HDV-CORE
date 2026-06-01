import type { Types } from 'phaser'
import { BootScene } from './scenes/BootScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { ModeSelectorScene } from './scenes/ModeSelectorScene'
import { RPGScene } from './scenes/RPGScene'
import { ActionScene } from './scenes/ActionScene'
import { SimScene } from './scenes/SimScene'

export function createGameConfig(parent: HTMLElement): Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: '100%',
    height: '100%',
    backgroundColor: '#0f0f1a',
    scene: [
      BootScene,
      MainMenuScene,
      ModeSelectorScene,
      RPGScene,
      ActionScene,
      SimScene,
    ],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: { debug: false },
    },
  }
}
