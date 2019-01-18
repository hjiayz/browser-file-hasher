import shajs from "sha.js";
addEventListener('message', function (event) {
  let [id, file, algorithm, format] = event.data;
  let hasher = shajs(algorithm);
  let chuck_size = 1 << 16;
  let start = 0;
  const hash_chuck = () => {
    let end = start + chuck_size;
    if (end > file.size) {
      end = file.size;
    }
    let chuck = file.slice(start, end);
    let reader = new FileReader();
    reader.onload = e => {
      let data = new Uint8Array(e.target.result);
      hasher = hasher.update(data);
      if (end == file.size) {
        postMessage([id, 0, hasher.digest(format)]);
      } else {
        start = end;
        postMessage([id, 2, start])
        hash_chuck();
      }
    };
    reader.onerror = e => {
      sendMessage([id, 1, e]);
    };
    reader.readAsArrayBuffer(chuck);
  }
  hash_chuck();
})