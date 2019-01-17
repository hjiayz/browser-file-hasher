import Worker from "./hash.worker.js";

const worker = new Worker();

let count = 0;

let callbacks = {};

worker.onmessage = function(event) {
  callbacks[event[0]][event[1]](event[2]);
};

function hash(file, algorithm) {
  return new Promise((res, err) => {
    while (callbacks[count] !== undefined) {
      if (count >= Number.MAX_SAFE_INTEGER) {
        count = 0;
      } else {
        count++;
      }
    }
    callbacks[count] = [res, err];
    worker.postMessage([count, file, algorithm]);
  });
}
export { hash };
