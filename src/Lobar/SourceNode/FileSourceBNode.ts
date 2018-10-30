import { SourceBNode } from '../interface/SourceBNode';

export class FileSourceBNode implements SourceBNode {

    constructor(public name: string) {
    }


    getTest(): string {
        return "test2";
    }
}