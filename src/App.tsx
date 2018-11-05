// tslint:disable:no-console

import * as React from 'react';
import Slider, { SliderProps } from 'rc-slider';

import './App.css';
import 'rc-slider/assets/index.css';
import { BRack } from './Lobar/BRack';
import { PlaybackDestBNode } from './Lobar/DestBNode/PlaybackDestBNode';
import { GainBNode } from './Lobar/FilterBNode/GainBNode';
import { LowPassBNode } from './Lobar/FilterBNode/LowPassBNode';
import { FileSrcBNode } from './Lobar/SrcBNode/FileSrcBNode';
import { HighPassBNode } from './Lobar/FilterBNode/HighPassBNode';
import { PeakingBNode } from './Lobar/FilterBNode/PeakingBNode';
import { TestBNode } from './Lobar/FilterBNode/TestBNode';
import { FFT } from './Lobar/Util/fft';
import ooura from 'ooura';
import { Chart } from "chart.js";

class App extends React.Component {
  private slideA:((value: number) => void)|undefined;
  private slideB:((value: number) => void)|undefined; 
  constructor(props: object) {
    super(props);
    this.audioTest();
    
  }

  public render() {
    const slider = <Slider className="slider" onChange={this.slideA} max={2000} min={100} step={1} defaultValue={1500} />;
    
    return (
      <div className="App">
        {slider}
        <canvas id="myChart" width="800" height="500" />
      </div>
    );
  }

  private async audioTest () {
    const bar = new BRack();
    await bar.setupFilters();
    const srcNode = new FileSrcBNode('song', bar);
    const gainNode = new GainBNode('gain', bar);
    const lowpass = new LowPassBNode('lowpass', bar);
    const gain2Node = new GainBNode('gain2', bar);
    const peaking = new PeakingBNode('peaking', bar);
    const destNode = new PlaybackDestBNode('dest', bar);
    const gainWorkletNode = new TestBNode('gain-test', bar);

    const input = new Float64Array(1024);

    for (let i = 0; i < 1024; i++) {
      input[i] = Math.cos(i) + Math.sin(i*2);
    }

    const fft = new FFT(1024);
    window['FFT'] = FFT;
    const out = fft.dft(input);

    const graph: any = document.getElementById("myChart");

    if (graph) {
      const labelss = [];
      for (let i = 0; i <512; i++) {
        labelss.push(i.toString());
      }
      const ctx = graph.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelss,
          datasets: [{
            label: 'fftTest',
            data: Array.from(out)
          }]
        },
        options: {
          scales: {
            xAxes: [{
              display: true
            }],
             yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
          }
        }
      })
    }
    
    
    this.slideA = (value: number) => {
      lowpass.setFreq(value);
    }
    this.forceUpdate();
    console.log("reached");
    srcNode.setFile('clip.mp3');
    gainNode.setGain(0.4);
    lowpass.setFreq(1500);
    lowpass.setPeak(8);
    peaking.setFreq(1500);
    peaking.setGain(20);
    peaking.setWidth(1000);

    srcNode.connectTo(gainNode);

    gainNode.connectTo(gainWorkletNode);
    gainWorkletNode.connectTo(destNode);
    
    srcNode.start();
    

  }
}

export default App;
