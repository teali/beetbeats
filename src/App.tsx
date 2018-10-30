// tslint:disable:no-console

import * as React from 'react';
import './App.css';
import { BRack } from './Lobar/BRack';
import { PlaybackDestBNode } from './Lobar/DestBNode/PlaybackDestBNode';
import { GainBNode } from './Lobar/FilterBNode/GainBNode';
import { FileSrcBNode } from './Lobar/SrcBNode/FileSrcBNode';


class App extends React.Component {
  constructor(props: object) {
    super(props);
    this.audioTest();
  }

  public render() {
    return (
      <div className="App">
        <p>testtest</p>
      </div>
    );
  }

  private async audioTest () {
    // const context = new AudioContext();
    // const res: Response = await fetch('clip.mp3');
    // const source = context.createBufferSource();

    // source.buffer = await context.decodeAudioData(await res.arrayBuffer());
    // source.connect(context.destination);
    // source.start();

    const bar = new BRack();
    const srcNode = new FileSrcBNode('song', bar);
    const gainNode = new GainBNode('gain', bar);
    const gain2Node = new GainBNode('gain2', bar);
    const destNode = new PlaybackDestBNode('dest', bar);
    srcNode.setFile('clip.mp3');

    gainNode.setGain(10);
    gain2Node.setGain(0.1);

    srcNode.connectTo(gainNode);
    gainNode.connectTo(gain2Node);
    gain2Node.connectTo(destNode);
    
    srcNode.start();
  }
}

export default App;
