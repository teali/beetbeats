import { BRack } from '../BRack';
import { FilterBNode } from '../interface/FilterBNode';

export class LowShelfBNode extends FilterBNode {
    public node: BiquadFilterNode;

    constructor(name: string, bar: BRack) {
        super(name, bar);
        this.node = new BiquadFilterNode(bar.ctx);
        this.node.type = 'lowshelf';
    }

    public setFreq(value: number) {
        this.node.frequency.setValueAtTime(value, this.bar.ctx.currentTime);
    }

    public setGain(value: number) {
        this.node.gain.setValueAtTime(value, this.bar.ctx.currentTime);
    }

    public getFreq(): number {
        return this.node.frequency.value;
    }

    public getGain(): number {
        return this.node.gain.value;
    }
}