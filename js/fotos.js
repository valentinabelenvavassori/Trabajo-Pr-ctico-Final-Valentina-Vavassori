const imagenes = document.querySelectorAll('.img-librería')
const imageneslight = document.querySelector('.agregar-imagen')
const contenedorLight= document.querySelector('.imagen-light')
const menu1 = document.querySelector('.menu');

imagenes.forEach (imagen => {
    imagen.addEventListener('click', () => {
      aparecerImagen(imagen.getAttribute('src'))
    })
})

contenedorLight.addEventListener('click', (e)=> {
    if (e.target !== imageneslight){
        contenedorLight.classList.toggle('show')
        imageneslight.classList.toggle('showimage')
        menu1.style.opacity = '1'
    }
})
const aparecerImagen = (imagen) => {
    imageneslight.src= imagen;
    contenedorLight.classList.toggle('show')
    imageneslight.classList.toggle('showimage')
    menu1.style.opacity = '0'
}