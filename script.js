const APIKey = 'SAMXsWHE1JLbFZEOZIT_WKHMzbcAdNgzMAMy70l7DNw'
const count = 4;
let call = `https://api.unsplash.com/photos/random/?client_id=${APIKey}&count=${count}`;
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

const displayImages = ()=>{
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(pic => {
        const item = document.createElement('a');
        item.setAttribute('href',pic.links.html);
        item.setAttribute('target','_blank');

        const img = document.createElement("img");
        img.setAttribute('src', pic.urls.regular);
        img.setAttribute('alt',pic.alt_description);
        img.setAttribute('title',pic.alt_description);
        
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotoes() {
    try{
        const response = await fetch(call)
        photosArray = await response.json()
        displayImages()
    }
    catch (error){
        console.log("Sorry for the Page Error", error)
    }
}

getPhotoes()

window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotoes();
      }
})