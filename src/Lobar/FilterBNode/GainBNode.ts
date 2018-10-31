import { BRack } from '../BRack';
import { FilterBNode } from '../interface/FilterBNode';

export class GainBNode extends FilterBNode {
    public node: GainNode;

    constructor(name: string, bar: BRack) {
        super(name, bar);
        this.node = new GainNode(bar.ctx);
    }

    public setGain(value: number) {
        this.node.gain.setValueAtTime(value, this.bar.ctx.currentTime);
    }

    public getGain(): number {
        return this.node.gain.value;
    }
}