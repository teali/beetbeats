import { BRack } from '../BRack';
import { FilterBNode } from '../interface/FilterBNode';

export class TestBNode extends FilterBNode {
    public node: AudioWorkletNode;

    constructor(name: string, bar: BRack) {
        super(name, bar);
        this.node = new AudioWorkletNode(bar.ctx, 'gain-processor');
    }
}