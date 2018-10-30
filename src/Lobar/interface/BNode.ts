import { BRack } from '../BRack';

export abstract class BNode {
    public node: AudioNode;

    constructor (public name: string, public bar: BRack) {
    }

    public connectTo(bNode: BNode) {
        this.node.connect(bNode.node);
    }

    public disconnect(bNode: BNode) {
        this.node.disconnect(bNode.node);
    }
}