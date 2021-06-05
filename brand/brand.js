class Brand {

  constructor(link, image){
      this.link = link
      this.image = image
  }

  showBrand() {
    let brandElement  =  document.createElement("div")

    let linkElement     =  document.createElement("a")
    linkElement.setAttribute( "href", this.link)

    let imageElement    =  document.createElement("img")
    imageElement.setAttribute("src",  this.image)

    linkElement.appendChild(brandElement)
    brandElement.appendChild(imageElement)

    document.body.appendChild(linkElement)

  }


  setName(string) {
    this.name = string
  }

  setLink(string) {
    this.link = string
  }

  getName() {
    return this.name
  }

  getLink() {
    return this.link
  }
}
