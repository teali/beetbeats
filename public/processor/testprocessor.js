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
        
    }
    
    process(inputs, outputs, parameters) {
        if (this.check) console.time('test');
        const input = inputs[0];
        const output = outputs[0];

        const myParamValues = parameters['myParam'];

        if (myParamValues.length === 1) {
            for (let i = 0; i < input.length; ++i) {
                for (let j = 0; j < input[i].length; j++) {
                    output[i][j] = input[i][j] * myParamValues[0];
                }
            }
        } else {
            for (let i = 0; i < input.length; ++i) {
                for (let j = 0; j < input[i].length; j++) {
                    output[i][j] = input[i][j] * myParamValues[i];
                }
            }
        }
        if (this.check) {
            console.timeEnd('test');
            this.check = false;
            
        }

        return true;
    }
  }

registerProcessor('gain-processor', MyWorkletProcessor);