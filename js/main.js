// function generateImages() {
//   //load csv
//   //get nm time place text imgUrl
//   let i = 1;
//   const interval = setInterval(() => {
//     i++;
//     routine(String(i)+".jpg",String(i),"雪国","ああああああ！","img/"+String(i)+".jpg");
//     if (i > 10) {
//       clearInterval(interval);
//     }
//   }, 3000);
// }

let events = [
  {
    "name": "焚き火",
    "time": "23:00",
    "place": "@駐輪場",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "反ワク",
    "time": "23:00",
    "place": "@食堂",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "コンパ",
    "time": "23:00",
    "place": "@時計台",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "ライヴ",
    "time": "23:00",
    "place": "@音楽室",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "グリコ",
    "time": "23:00",
    "place": "@京都駅",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "綱引き",
    "time": "23:00",
    "place": "@BC棟",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "ねずみコンパ",
    "time": "23:00",
    "place": "@食堂",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "キャンプファイヤー",
    "time": "23:00",
    "place": "@駐輪場",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "火遊び",
    "time": "23:00",
    "place": "@裏",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "ようわからん",
    "time": "23:00",
    "place": "@神社",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
  {
    "name": "うんこ",
    "time": "23:00",
    "place": "@清水寺",
    "text": "国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。信号所に汽車が止まった。向側の座席から娘が立って来て、島村の前のガラス窓を落した。雪の冷気が流れこんだ。",
  },
];



function test() {
  let id = document.getElementById('tentacles').value-1;
  routine(events[id]["name"],events[id]["time"],events[id]["place"],events[id]["text"],"img/"+String(id+1)+".jpg");
}

function routine(nm,time,place,text,imgUrl) {
  document.getElementById('timePutter').textContent = time;
  document.getElementById('placePutter').textContent = place;
  document.getElementById('textPutter').textContent = text;
  document.getElementById('nm').textContent = nm;
  document.getElementById('resImg').src = imgUrl;
  const $preview = document.querySelector("#result");
  $preview.addEventListener("input", () => {
    for (const $img of $preview.querySelectorAll("img")) {
      if ($img.src.match(/^https*:/)) {
        $img.crossOrigin = "anonymous";
      }
    }
  }, false);
  start();
  setTimeout(() => {saveCanvas()},5000);
}

function update() {
  document.getElementById('timePutter').textContent = document.getElementById('timeGetter').value;
  document.getElementById('placePutter').textContent = document.getElementById('placeGetter').value;
  document.getElementById('textPutter').textContent = document.getElementById('textGetter').value;
  document.getElementById('nm').textContent = document.getElementById('nmGetter').value;
};


function startAndSave() {
  update();
  const $preview = document.querySelector("#result");
  $preview.addEventListener("input", () => {
    for (const $img of $preview.querySelectorAll("img")) {
      if ($img.src.match(/^https*:/)) {
        $img.crossOrigin = "anonymous";
      }
    }
  }, false);
  start();
  setTimeout(() => {saveCanvas()},2000);
}


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



