import shajs from "sha.js";
onmessage = function(event) {
  let [id, file, algorithm] = event;
  let hasher = shajs(algorithm);
  let chuck_size = 1 << 16;
  let start = 0;
  function hash_chuck() {
    let end = start + chuck_size;
    if (end > file.size) {
      end = file.size;
    }
    let chuck = file.slice[(i, end)];
    let reader = new FileReader();
    reader.onload = e => {
      hasher.update(e.target.result);
      if (end == file.size) {
        sendMessage([id, 0, hasher.digest()]);
      } else {
        start = end;
        hash_chuck();
      }
    };
    reader.onerror = e => {
      sendMessage([id, 1, e]);
    };
  }
  hash_chuck();
};
