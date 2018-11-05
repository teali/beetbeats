// Every frame skip is 2.90249433107ms
class MyWorkletProcessor extends AudioWorkletProcessor {

    // Static getter to define AudioParam objects in this custom processor.
    static get parameterDescriptors() {
      return [{
        name: 'myParam',
        defaultValue: 0.707
      }];
    }
  
    constructor() { 
        super();
        this.check = true;
        this.bufferLen = 512;
        this.sampleLen = 128;
        this.inBuffer = [
            new Float32Array(this.bufferLen), 
            new Float32Array(this.bufferLen)
        ];
        this.outBuffer = [
            new Float32Array(this.bufferLen), 
            new Float32Array(this.bufferLen)
        ];
        this.cycle = this.bufferLen/this.sampleLen;
        this.offset = 0;
    }

    enqueue(input, output) {
        for (let i = 0; i < input.length; ++i) {
            //console.log(input[i].length);
            // console.log(this.offset * this.sampleLen);
            this.inBuffer[i].set(input[i], this.offset * this.sampleLen);
            // console.log(this.outBuffer[i].slice(this.offset * this.sampleLen, (this.offset+1) * this.sampleLen));
            // output[i].set(this.outBuffer[i].slice(this.offset * this.sampleLen, (this.offset+1) * this.sampleLen));
            // output[i].set(new Float32Array(128));
        }

        if (this.offset === this.cycle - 1) {
            this.doProcess(input, output);
            this.offset = 0;
        } else {
            this.offset++;
        }
    }

    doProcess(input, output) {
        for (let i = 0; i < input.length; ++i) {
            this.outBuffer[i].set(this.inBuffer[i]);
        }
    }
    
    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        this.enqueue(input, output);

        return true;
    }
  }

registerProcessor('gain-processor', MyWorkletProcessor);