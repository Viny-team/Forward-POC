hexToRGB = function(hex) {
  hex = parseInt(hex.slice(1), 16)
  let r = hex >> 16
  let g = (hex >> 8) & 0xff
  let b = hex & 0xff
  return `rgb(${r},${g},${b})`
}

export default hexToRGB
