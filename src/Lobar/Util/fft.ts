import ooura from 'ooura';

export class FFT {
    private oo: ooura;
    private im: Float64Array;

    constructor(bufferLength: number) {
        this.oo = new ooura(bufferLength, {type: 'real', radix: 4});
        this.im = this.oo.vectorArrayFactory();
    }

    public dft(data: Float64Array): Float64Array {
        const output = this.oo.vectorArrayFactory();
        this.oo.fft(data.buffer, output.buffer, this.im.buffer);
        return output.map(Math.abs);
    }
}