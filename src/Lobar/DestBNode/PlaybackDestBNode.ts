import { BRack } from '../BRack';
import { DestBNode } from '../interface/DestBNode';

export class PlaybackDestBNode extends DestBNode {
    public node: AudioDestinationNode;

    constructor(name: string, bar: BRack) {
        super(name, bar);
        this.node = bar.ctx.destination;
    }
}