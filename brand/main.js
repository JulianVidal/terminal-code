
let brands = []

brands.push(new Brand("https://www.youtube.com/?hl=es", "image.png"))
brands.push(new Brand("https://www.youtube.com/?hl=es", "image.png"))

window.onload = function() {
	for(let i = 0; i < brands.length; i++) {
	brands[i].showBrand()
	}
}
