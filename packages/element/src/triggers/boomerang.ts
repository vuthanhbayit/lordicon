import { IPlayer, ITrigger } from '../interfaces';

/**
 * Boomerang trigger plays animation from first to last frame when you hover over them, then play in reverse once you move the cursor away.
 */
export class Boomerang implements ITrigger {
    constructor(
        protected player: IPlayer,
        protected element: HTMLElement,
        protected targetElement: HTMLElement,
    ) {
        this.onHover = this.onHover.bind(this);
    }

    onConnected() {
        this.targetElement.addEventListener('mouseenter', this.onHover);
    }

    onDisconnected() {
        this.targetElement.removeEventListener('mouseenter', this.onHover);

        this.player.direction = 1;
    }

    onComplete() {
        this.player.direction = -1;
        this.player.play();
    }

    onHover() {
        this.player.direction = 1;
        this.player.play();
    }
}