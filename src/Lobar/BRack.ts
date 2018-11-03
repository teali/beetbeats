
export class BRack {
    public ctx: AudioContext;

    constructor() {
        this.ctx = new AudioContext();

    }

    public async setupFilters() {
        await this.ctx.audioWorklet.addModule('/processor/testprocessor.js');

    }
}