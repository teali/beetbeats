import { BRack } from '../BRack';
import { FilterBNode } from '../interface/FilterBNode';

export class BandPassBNode extends FilterBNode {
    public node: BiquadFilterNode;

    constructor(name: string, bar: BRack) {
        super(name, bar);
        this.node = new BiquadFilterNode(bar.ctx);
        this.node.type = 'bandpass';
    }

    public setFreq(value: number) {
        this.node.frequency.setValueAtTime(value, this.bar.ctx.currentTime);
    }

    public setPeak(value: number) {
        this.node.Q.setValueAtTime(value, this.bar.ctx.currentTime);
    }

    public getFreq(): number {
        return this.node.frequency.value;
    }

    public getPeak(): number {
        return this.node.Q.value;
    }
}