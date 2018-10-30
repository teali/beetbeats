// tslint:disable:no-console

import * as React from 'react';
import './App.css';
import { FileSourceBNode } from './Lobar/SourceNode/FileSourceBNode';
import { BNode } from './Lobar/interface/BNode';

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
    const context = new AudioContext();
    const res: Response = await fetch('clip.mp3');
    const source = context.createBufferSource();
    const gain = new GainNode(context);

    source.buffer = await context.decodeAudioData(await res.arrayBuffer());
    source.connect(gain);
    gain.connect(context.destination);

    const file: BNode = new FileSourceBNode("test");
    console.log(file.name);
    // source.connect(context.destination);

    source.start(0);
    source.stop(3);
  }
}

export default App;
