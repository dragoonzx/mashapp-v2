import create from "zustand";
import { addEffect } from "@react-three/fiber";

import synthMP3 from "../assets/synth.mp3";
import snareMP3 from "../assets/snare.mp3";
import drumsMP3 from "../assets/drums.mp3";
import { getAuidusHost } from "../api";

async function createAudio(
  url: string,
  { threshold, expire }: { threshold?: number; expire?: number } = {}
) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  // @ts-expect-error: webkitAudioContext
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  const data = new Uint8Array(analyser.frequencyBinCount);
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = true;
  const gainNode = context.createGain();
  gainNode.gain.value = 1;
  gainNode.connect(context.destination);
  source.connect(analyser);
  analyser.connect(gainNode);

  let time = Date.now();
  let state = {
    source,
    data,
    context,
    gain: 1,
    signal: false,
    avg: 0,
    update: () => {
      let now = Date.now();
      let value = 0;
      analyser.getByteFrequencyData(data);
      for (let i = 0; i < data.length; i++) value += data[i];
      const avg = (state.avg = value / data.length);
      if (threshold && avg > threshold && now - time > expire!) {
        time = Date.now();
        state.signal = true;
      } else state.signal = false;
    },
    setGain(level: number) {
      gainNode.gain.setValueAtTime((state.gain = level), context.currentTime);
    },
  };

  return state;
}

interface IStore {
  loaded: boolean;
  clicked: boolean;
  host: string;
  audio: {
    drums: Awaited<ReturnType<typeof createAudio>>;
    snare: Awaited<ReturnType<typeof createAudio>>;
    synth: Awaited<ReturnType<typeof createAudio>>;
  };
  track: { synthonly: boolean; kicks: number; loops: number };
  api: {
    loaded: () => Promise<void>;
    start: () => void;
    resume: () => void;
    stop: () => void;
  };
}

const useStore = create<IStore>((set, get) => {
  const drums = createAudio(drumsMP3, { threshold: 10, expire: 500 });
  const snare = createAudio(snareMP3, { threshold: 40, expire: 500 });
  const synth = createAudio(synthMP3);

  const host = getAuidusHost();

  return {
    loaded: false,
    clicked: false,
    audio: { drums: null, snare: null, synth: null },
    track: { synthonly: false, kicks: 0, loops: 0 },
    host: "",
    api: {
      async loaded() {
        set({
          loaded: true,
          audio: {
            drums: await drums,
            snare: await snare,
            synth: await synth,
          },
          host: await host,
        });
      },
      start() {
        const audio = get().audio;
        const files = Object.values(audio);
        const track = get().track;
        files.forEach(({ source }) => source.start(0));
        set({ clicked: true });
        // we need to remove effect after stop?
        addEffect(() => {
          files.forEach(({ update }) => update());
          if (audio.drums.signal) track.kicks++;
          if (audio.snare.signal) {
            if (track.loops++ > 6) {
              track.synthonly = !track.synthonly;
              audio.drums.setGain(track.synthonly ? 0 : 1);
              audio.snare.setGain(track.synthonly ? 0 : 1);
              track.loops = 0;
            }
            track.kicks = 0;
          }
        });
      },
      resume() {
        const audio = get().audio;
        const files = Object.values(audio);
        files.forEach(({ source, context }) => context.resume());
      },
      stop() {
        const audio = get().audio;
        const files = Object.values(audio);
        files.forEach(({ source, context }) => context.suspend());
      },
    },
  };
});

export default useStore;
