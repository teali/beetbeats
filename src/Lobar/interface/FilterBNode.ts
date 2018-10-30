import { BRack } from '../BRack';
import { BNode } from './BNode';

export abstract class FilterBNode extends BNode {
    
    constructor(name: string, bar: BRack) {
        super(name, bar);
    }
}