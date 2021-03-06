import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Header from "../Header";
import Scene from "../Scene";
import styles from "../../styles/Home.module.css";

import useStore from "../../store";
import { getTrack, getTrackStream, getTrendingTracks } from "../../api";
import Track from "../Track";

import Crunker from "./crunker";

const Home: NextPage = () => {
  const [ready, setReady] = useState(false);

  const loaded = useStore((state) => state.loaded);
  const clicked = useStore((state) => state.clicked);
  const host = useStore((state) => state.host);
  const api = useStore((state) => state.api);

  const [tracks, setTracks] = useState<any[]>([]);

  const getTracks = async () => {
    // const tracks = await Promise.all([
    //   getTrack(host, "P9Jmk"),
    //   getTrack(host, "2PEEp"),
    // ]);
    const tracks = await getTrendingTracks(host);

    const tracksWithStream = tracks.slice(0, 3).map((v) => {
      const stream = getTrackStream(host, v.id);
      return { ...v, stream };
    });

    setTracks(tracksWithStream);
    console.log(tracksWithStream);
  };

  useEffect(() => api.loaded(), []);

  useEffect(() => {
    if (host) {
      getTracks();
    }
  }, [host]);

  const testCrunker = async () => {
    const inputSampleRate = 48000;
    const crunker = new Crunker({ sampleRate: inputSampleRate });
    // As we aren't using `crunker.fetchAudio`, we must convert the files to buffers manually,
    // is the same code from the source, just condensed and without need to `fetch` the files.
    crunker
      .fetchAudio("/drake_vocals.wav", "/accompaniment.wav")
      .then((buffers) => crunker.mergeAudio(buffers))
      .then((merged) => crunker.export(merged, "audio/mp3"))
      .then((output) => crunker.download(output.blob))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div className="container mx-auto mt-4">
      <Head>
        <title>MashApp | We love mashups</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;400;500;700&family=Rubik+Mono+One&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Header />
      <div className="absolute -z-10 w-screen h-screen top-0 left-0">
        <Scene />
      </div>
      <main className={styles.main}>
        <h1 className="text-4xl font-bold">Mashups powered by AI & Audius</h1>
        <p className="mt-2 text-center text-sm">
          We`re building dApp for creating, listening & sharing mashups
        </p>
        {/* <button
          type="button"
          className="mt-4 bg-gradient-to-br from-[#BF53E0] via-[#A431D2] to-[#794EF2] px-4 py-2 rounded text-sm uppercase"
        >
          Generate Mashup
        </button> */}
        {/* <button
          onClick={() => {
            loaded && api.start();
          }}
        >
          Start scene
        </button>
        <button
          onClick={() => {
            loaded && api.stop();
          }}
        >
          Pause scene
        </button>
        <button
          onClick={() => {
            loaded && api.resume();
          }}
        >
          res scene
        </button> */}
        {tracks.length ? (
          <div className="flex items-center mt-12">
            <div>
              {tracks.map((v) => (
                <div className="mb-4" key={v.id}>
                  <Track
                    stream={v.stream}
                    img={v.artwork["150x150"]}
                    author={v.user.name}
                    title={v.title}
                  />
                </div>
              ))}
            </div>
            {/* <div className="flex items-center ml-2 mr-4">
              {[1, 2, 3].map((v) => (
                <svg
                  key={v}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              ))}
            </div>
            <div>
              <Track
                img={tracks[0].artwork["150x150"]}
                title="kek"
                author="shrek"
              />
            </div> */}
          </div>
        ) : null}
      </main>
      <footer className="container flex justify-end fixed bottom-6 text-xs">
        <a
          href="https://twitter.com/MashApp4"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          stay tuned on we ?????? mashups
        </a>
      </footer>
    </div>
  );
};

export default Home;
