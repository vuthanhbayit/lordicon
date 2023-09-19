import { IPlayer, ITrigger } from '../interfaces';

const CLICK_EVENTS = [
    { name: 'mousedown' },
    { name: 'touchstart', options: { passive: true } },
];

/**
 * Click trigger plays animation after the icon click.
 */
export class Click implements ITrigger {
    constructor(
        protected player: IPlayer,
        protected element: HTMLElement,
        protected targetElement: HTMLElement,
    ) {
        this.onClick = this.onClick.bind(this);
    }

    onConnected() {
        for (const event of CLICK_EVENTS) {
            this.targetElement.addEventListener(event.name, this.onClick, event.options)
        }
    }

    onDisconnected() {
        for (const event of CLICK_EVENTS) {
            this.targetElement.removeEventListener(event.name, this.onClick)
        }
    }

    onClick() {
        if (this.player.isPlaying) {
            return;
        }

        this.player.playFromBeginning();
    }
}
