// tslint:disable:no-console

import * as React from 'react';
import Slider from 'rc-slider';

import './App.css';
import 'rc-slider/assets/index.css';
import { BRack } from './Lobar/BRack';
import { PlaybackDestBNode } from './Lobar/DestBNode/PlaybackDestBNode';
import { GainBNode } from './Lobar/FilterBNode/GainBNode';
import { LowPassBNode } from './Lobar/FilterBNode/LowPassBNode';
import { FileSrcBNode } from './Lobar/SrcBNode/FileSrcBNode';
import { HighPassBNode } from './Lobar/FilterBNode/HighPassBNode';
import { PeakingBNode } from './Lobar/FilterBNode/PeakingBNode';



class App extends React.Component {
  private slideA:((value: number) => void)|undefined;

  constructor(props: object) {
    super(props);
    this.audioTest();
  }

  public render() {
    const slider = <Slider className="slider" onChange={this.slideA} max={2000} min={100} step={1} defaultValue={1500} />;

    return (
      <div className="App">
        {slider}
      </div>
    );
  }

  private async audioTest () {



    const bar = new BRack();
    const srcNode = new FileSrcBNode('song', bar);
    const gainNode = new GainBNode('gain', bar);
    const lowpass = new LowPassBNode('lowpass', bar);
    const gain2Node = new GainBNode('gain2', bar);
    const peaking = new PeakingBNode('peaking', bar);
    const destNode = new PlaybackDestBNode('dest', bar);

    this.slideA = (value: number) => {
      lowpass.setFreq(value);
    }

    srcNode.setFile('clip.mp3');
    gainNode.setGain(0.5);
    lowpass.setFreq(1500);
    lowpass.setPeak(8);
    peaking.setFreq(1500);
    peaking.setGain(20);
    peaking.setWidth(1000);

    srcNode.connectTo(gainNode);

    gainNode.connectTo(lowpass);
    lowpass.connectTo(destNode);
    
    srcNode.start();
  }
}

export default App;
