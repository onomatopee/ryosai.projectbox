function generateImages() {
  //load csv
  //get nm time place text imgUrl
  for (let i = 1; i <= 10; i++) {
    routine(String(i)+".jpg",String(i),"雪国","ああああああ！","img/"+String(i)+".jpg");
    start();
    saveCanvasStr(nm);
  }
}

function routine(nm,time,place,text,imgUrl) {
  document.getElementById('timePutter').textContent = time;
  document.getElementById('placePutter').textContent = place;
  document.getElementById('textPutter').textContent = text;
  document.getElementById('resImg').src = imgUrl;
  //start();
  //start();
  //setTimeout(saveCanvasStr(),2000,nm);
  //saveCanvasStr(nm);
}

function update() {
  document.getElementById('timePutter').textContent = document.getElementById('timeGetter').value;
  document.getElementById('placePutter').textContent = document.getElementById('placeGetter').value;
  document.getElementById('textPutter').textContent = document.getElementById('textGetter').value;
};

// codes copied and pasted from https://blog.totoraj.net/sample/html-to-canvas/sample.html and https://blog.totoraj.net/2022-01-07-html-to-canvas/

document.addEventListener("DOMContentLoaded", () => {
  const $preview = document.querySelector("#result");
  $preview.addEventListener("input", () => {
    for (const $img of $preview.querySelectorAll("img")) {
      if ($img.src.match(/^https*:/)) {
        $img.crossOrigin = "anonymous";
      }
    }
  }, false);
});

async function start() {
  const $css = document.querySelector("#css");
  const $preview = document.querySelector("#result");
  const $canvas = document.querySelector("#canvas");
  const ctx = $canvas.getContext("2d");

  const clientRect = $preview.getBoundingClientRect();
  const w = clientRect.width;
  const h = clientRect.height;

  const cssText = await replaceUrlToBase64($css.innerHTML);

  const svgText = elementToSvgText($preview, cssText);

  const svgBase64 =
    "data:image/svg+xml;base64,"
    + btoa(unescape(encodeURIComponent(svgText)));
  
  // 2倍のサイズでcanvasに描画する
  // svgなので描画サイズは自由に変えられる
  $canvas.width = w * 2;
  $canvas.height = h * 2;

  const img = new Image();
  img.src = svgBase64;

  img.onload = () => {
    // 2倍のサイズでcanvasに描画する
    ctx.drawImage(img, 0, 0, w * 2, h * 2);
  }
  img.onerror = err => {
    console.log(err);
  }
}

function saveCanvas() {
  saveCanvasStr("canvasTest.png");
}

function saveCanvasStr(str) {
  const $canvas = document.querySelector("#canvas");
  const $a = document.createElement("a");
  $a.download = str;
  document.body.append($a);
  console.log($canvas.toDataURL());
  $canvas.toBlob(blob => {
    $a.href = URL.createObjectURL(blob);
    $a.click();
    URL.revokeObjectURL(blob);
    $a.remove();
  }, "image/png");
}

// CSS内のurlをbase64にして埋め込む
async function replaceUrlToBase64(cssText) {
  const regex = /url\s*\(["']*(.+?)["']*\)/g;
  const promises = [];
  cssText.replace(regex, async (match, url) => {
    const promise = fetchFileBase64(url)
      .then(base64 => `url(${base64})`);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return cssText.replace(regex, () => data.shift());
}

// ファイルを取得してbase64で返す
async function fetchFileBase64(fileUrl) {
  const req = new Request(fileUrl);
  let mimeType = "";
  const res = await fetch(req);
  if (!res.ok) {
    throw new Error(`fetch error ${res.status}`);
  }
  mimeType = res.headers.get("content-type").split(";")[0];
  const aBuff = await res.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(aBuff);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mimeType};base64,${window.btoa(binary)}`;
}

// 画像をbase64にして返す
function imageToBase64($img, mimeType="image/png") {
  const $canvas = document.createElement("canvas");
  $canvas.width  = $img.naturalWidth;
  $canvas.height = $img.naturalHeight;
  const ctx = $canvas.getContext("2d");
  ctx.drawImage($img, 0, 0);
  return $canvas.toDataURL(mimeType);
}

// 対象要素をSVGにして返す
function elementToSvgText($target, cssText) {
  const $clone = $target.cloneNode(true);

  const $targetImages = $target.querySelectorAll("img");
  const $cloneImages = $clone.querySelectorAll("img");

  for (let i=0; i < $targetImages.length; i++) {
    $cloneImages[i].src = imageToBase64($targetImages[i]);
  }

  const clientRect = $target.getBoundingClientRect();
  const width = clientRect.width;
  const height = clientRect.height;
  console.log(width, height);
  const xmlText = new XMLSerializer().serializeToString($clone);
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <foreignObject width="100%" height="100%" requiredExtensions="http://www.w3.org/1999/xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            ${cssText}
          </style>
          ${xmlText}
        </div>
      </foreignObject>
    </svg>
  `;
}



