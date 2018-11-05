
class ArrayProxyHandler implements ProxyHandler<Uint8Array> {
    private onChange: () => void;

    constructor(onChange: () => void) {
        this.onChange = onChange;
    }

    public get(target: Uint8Array, property: PropertyKey, receiver: any): any {
        try {
            return new Proxy(target[property], this);
        } catch (err) {
            return Reflect.get(target, property, receiver);
        }
    }

    public defineProperty(target: Uint8Array, property: PropertyKey, descriptor: PropertyDescriptor) {
        this.onChange();
        return Reflect.defineProperty(target, property, descriptor);
    }

    public deleteProperty(target: Uint8Array, property: PropertyKey) {
        this.onChange();
        return Reflect.deleteProperty(target, property);
    }
}

class BufferProxyHandler implements ProxyHandler<ArrayBuffer> {
    private onChange: () => void;

    constructor(onChange: () => void) {
        this.onChange = onChange;
    }

    public get(target: ArrayBuffer, property: PropertyKey, receiver: any): any {
        try {
            console.log("inner");
            // return new Proxy(target[property], this);
            return target[property];
        } catch (err) {
            return Reflect.get(target, property, receiver);
        }
    }

    public defineProperty(target: ArrayBuffer, property: PropertyKey, descriptor: PropertyDescriptor) {
        this.onChange();
        return Reflect.defineProperty(target, property, descriptor);
    }

    public deleteProperty(target: ArrayBuffer, property: PropertyKey) {
        this.onChange();
        return Reflect.deleteProperty(target, property);
    }
}

/**
 * This fft is NOT thread safe, don't run concurrent operations with the same instance
 */
export class UselessFFT {
    private ctx: AudioContext;
    private buffer: AudioBuffer;
    private analyser: AnalyserNode;
    private testBuffer: ArrayBuffer;
    private innerBuffer: Uint8Array;
    private outputBuffer: Uint8Array;
    private changeHandler: ArrayProxyHandler;

    constructor(bufferLength: number, sampleRate: number = 44100) {
        this.ctx = new AudioContext();
        this.buffer = this.ctx.createBuffer(1, bufferLength, sampleRate);
        this.analyser = new AnalyserNode(this.ctx);
        
        const innerb = new ArrayBuffer(bufferLength);
        const bufferProxy = new Proxy(innerb, new BufferProxyHandler(() => { console.log('test buffer');}));
        console.log(bufferProxy.byteLength);
        this.outputBuffer = new Uint8Array(bufferProxy);

        this.innerBuffer = new Uint8Array(bufferLength);
        // this.changeHandler = new ArrayProxyHandler(() => {
        //     console.log('test');
        // });

        // this.outputBuffer = new Proxy(this.innerBuffer, this.changeHandler);
        const testArr = new Uint8Array(bufferLength);
        console.log(testArr);
        console.log(this.outputBuffer);
        this.analyser.getByteFrequencyData(this.outputBuffer);
        this.fft(new Float32Array(512));
    }

    public fft(sample: Float32Array) {
        const audioNode = new AudioBufferSourceNode(this.ctx);
        this.buffer.getChannelData(0).set(sample);
        audioNode.buffer = this.buffer;
        audioNode.connect(this.analyser);
        audioNode.start();
    }

}