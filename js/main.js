const time_put = document.getElementById('timePutter');
const place_put = document.getElementById('placePutter');
const text_put = document.getElementById('textPutter');

document.querySelector('button').addEventListener('click', () => {
  const time_get = document.getElementById('timeGetter');
  const place_get = document.getElementById('placeGetter');
  const text_get = document.getElementById('textGetter');

  time_put.textContent = time_get.value;
  place_put.textContent = place_get.value;
  text_put.textContent = text_get.value;
});

document.querySelector('#output').addEventListener('click', () => {
  html2canvas(document.querySelector("#result")).then(canvas => {
    document.body.appendChild(canvas)
  });
});



