declare module 'ooura' {
    export default class ooura {
        scalarArrayFactory(): Float64Array;
        vectorArrayFactory(): Float64Array;
        fft(dataBuffer: ArrayBuffer, reBuffer: ArrayBuffer, imBuffer: ArrayBuffer): void;
        ifft(dataBuffer: ArrayBuffer, reBuffer: ArrayBuffer, imBuffer: ArrayBuffer): void;
        constructor(length: number, type: object);
    }
}


