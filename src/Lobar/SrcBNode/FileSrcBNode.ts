import { BRack } from '../BRack';
import { SrcBNode } from '../interface/SrcBNode';

export class FileSrcBNode extends SrcBNode {
    public node: AudioBufferSourceNode;

    constructor(name: string, bar: BRack) {
        super(name, bar);
        this.node = new AudioBufferSourceNode(this.bar.ctx);
    }

    public async setFile(filename: string) {
        const res: Response = await fetch(filename);
        this.node.buffer = await this.bar.ctx.decodeAudioData(await res.arrayBuffer());
    }

    public start(): void {
        this.node.start();
    }

    public stop(): void {
        this.node.stop();
    }
}