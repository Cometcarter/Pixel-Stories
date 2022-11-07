var savebtn = document.querySelector(".savetodb");
var downloadbtn = document.querySelector(".download");
var clearbtn = document.querySelector(".clearcanvas");
// let name = document.querySelector('.filename')
// name became deprecated on time 38 when using global variable ASK IN CLASS!!!
// let inputValue = document.querySelector('input[name="imgtype"]:checked')
//getElementByClassName wouldn't work, remember to ask why because bruh..


// Array.from(trash).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText.trim()
//     const msg = this.parentNode.parentNode.childNodes[3].innerText.trim()
//     fetch('messages', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'name': name.trim(),
//         'msg': msg.trim()
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });


savebtn.addEventListener('click', function () {
  if (document.querySelector('.filename').value != "" && document.querySelector('input[name="imgtype"]:checked') != null) {

    fetch('/savetogallery', {
      //^^ this fetch is grabbing the backend route
      //it sends the canvas and filename to the route and there it gets sent to the db c:
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'canvas': paintCanvas.toDataURL(`image/${document.querySelector('input[name="imgtype"]:checked').value}`),
        'filename': document.querySelector('.filename').value,
        'blurb': document.querySelector('.blurb').value
      })
    })
      .then(response => {
        // if (response.ok) return response.json()
      })
      .then(data => {
        window.location.reload(true)
      })
  } else {
    alert('Please Enter Name or File Type')
  }
});


clearbtn.addEventListener('click', clearArt)

function clearArt() {
  console.log('clear')
  //referred https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
  context.clearRect(0, 0, paintCanvas.width, paintCanvas.height)
}

downloadbtn.addEventListener('click', downloadArt)

function downloadArt() {
  let name = document.querySelector('.filename').value
  var link = document.createElement('a')
  //^^^creating anchor tag/ creating link to download
  let inputValue = document.querySelector('input[name="imgtype"]:checked').value
  link.download = `${name}`
  //^^filename when download
  console.log(inputValue)
  link.href = paintCanvas.toDataURL(`image/${inputValue}`)
  //^^converts canvas to DataURL/img
  link.click();
  //^^ this clicks the created anchor tag to start download
}

// ========https://www.codicode.com/art/undo_and_redo_to_the_html5_canvas.aspx will keep in mind for future canvas drawings============= 
// ================================================================================= Zsolt on Coden Pen vvvvvv
const paintCanvas = document.querySelector('.js-paint');
const context = paintCanvas.getContext('2d');
context.lineCap = 'round';

const colorPicker = document.querySelector('.js-color-picker');

colorPicker.addEventListener('change', event => {
  context.strokeStyle = event.target.value;
});

const lineWidthRange = document.querySelector('.js-line-range');
const lineWidthLabel = document.querySelector('.js-range-value');

lineWidthRange.addEventListener('input', event => {
  const width = event.target.value;
  lineWidthLabel.innerHTML = width;
  context.lineWidth = width;
});

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }
const startDrawing = event => {
  isMouseDown = true;
  [x, y] = [event.offsetX, event.offsetY];
}
const drawLine = event => {
  if (isMouseDown) {
    const newX = event.offsetX;
    const newY = event.offsetY;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(newX, newY);
    context.stroke();
    //[x, y] = [newX, newY];
    x = newX;
    y = newY;
  }
}

paintCanvas.addEventListener('mousedown', startDrawing);
paintCanvas.addEventListener('mousemove', drawLine);
paintCanvas.addEventListener('mouseup', stopDrawing);
paintCanvas.addEventListener('mouseout', stopDrawing);
// =================================================================================



// Array.from(thumbDown).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const name = this.parentNode.parentNode.childNodes[1].innerText.trim()
//     const msg = this.parentNode.parentNode.childNodes[3].innerText.trim()
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     console.log(thumbDown)
//     fetch('thumbdown', {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         'name': name.trim(),
//         'msg': msg.trim(),
//         'thumbUp': thumbDown
//       })
//     })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//       .then(data => {
//         console.log(data)
//         window.location.reload(true)
//       })
//   });
// });





