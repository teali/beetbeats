import { BRack } from '../BRack';
import { BNode } from './BNode';

export abstract class SrcBNode extends BNode {

    constructor(name: string, bar: BRack) {
        super(name, bar);
    }

    public abstract start(): void;
}