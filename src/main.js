import Wk from "./hash.worker.js";

const worker = new Wk();

let count = 0;

let callbacks = {};

worker.onmessage = function ({ data }) {
  let cb = callbacks[data[0]][data[1]];
  if (typeof cb === "function") {
    cb(data[2]);
  }
};

function hash(file, algorithm, onProgress, format) {
  return new Promise((res, err) => {
    while (callbacks[count] !== undefined) {
      if (count >= Number.MAX_SAFE_INTEGER) {
        count = 0;
      } else {
        count++;
      }
    }
    callbacks[count] = [res, err, onProgress];
    worker.postMessage([count, file, algorithm, format]);
  });
}
export { hash };
