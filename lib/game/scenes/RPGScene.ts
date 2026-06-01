import Phaser from 'phaser'

export class RPGScene extends Phaser.Scene {
  private hopePulse!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'RPGScene' })
  }

  create() {
    const { width, height } = this.cameras.main

    this.add.rectangle(width / 2, height / 2, width, height, 0x0a1a0a)

    this.add
      .text(width / 2, height * 0.2, 'CHRONICLES', {
        fontFamily: 'monospace',
        fontSize: '32px',
        color: '#22c55e',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height * 0.35, 'RPG Mode — Coming Soon', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#4ade80',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height * 0.5,
        'Explore the HOPE Authority Layer.\nComplete quests. Shape the world.',
        {
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#86efac',
          align: 'center',
        })
      .setOrigin(0.5)

    this.hopePulse = this.add
      .text(width / 2, height * 0.68, '✦  HOPE is watching over you  ✦', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#7c3aed',
      })
      .setOrigin(0.5)

    this.tweens.add({
      targets: this.hopePulse,
      alpha: 0,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    this.add
      .text(40, 40, '← MODES', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#22c55e',
      })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('ModeSelectorScene'))
  }
}
