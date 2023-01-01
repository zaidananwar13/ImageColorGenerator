$(document).ready(() => {
  let url = new URLSearchParams(window.location.search)
  let colors = url.get("colors")
  let image = url.get("image")

  $('#box').css('background-image', `url(${image})`);

  colors = colors.split(",")
  let dark = 0
  let light = 0

  colors.forEach(element => {
    let color;
    
    if(tinycolor(`#${element}`).getBrightness() > 127.5) {
      color = "black";
      dark++;
    }else { color = "white"; light++; }

    let width = Math.round(Math.floor(Math.random() * 200) + 50)
    let height = Math.round(Math.floor(Math.random() * 200) + 50)
    let temp = `<li><div style="border-radius: 12px;border: 2px solid white;width: ${width}px;height: ${height}px;background-color: #${element};color: ${color};" class="color"><p>#${element.toUpperCase()}</p></div></li>`
    
    $("#colors").append(temp)
  })

  
  $('#colours').css('background-color', (dark < light) ? 'rgba(0, 0, 0, .5)' : 'rgba(255, 255, 255, .5)');
  $("#counter").text("Result: " + colors.length + " colors")
  $("#theme").text("Theme: " + ((dark < light) ? 'Dark' : 'Light'))
})
