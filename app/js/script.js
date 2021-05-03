const body = document.querySelector('body')
const btnHamburger = document.querySelector('#btnHamburger') 
const header = document.querySelector('.header')
const overlay = document.querySelector('.overlay')
//const fadeElements = document.querySelectorAll('.has-fade')
const menuMobile = document.querySelector('#menuMobile')

btnHamburger.addEventListener('click', () => {   
  if (header.classList.contains('open')){
        header.classList.remove('open')
        /*fadeElements.forEach((el) => {
          el.classList.remove('fade-in')
          el.classList.add('fade-out')
        })*/
        overlay.classList.remove('fade-in')
        overlay.classList.add('fade-out')
        menuMobile.classList.remove('slide-in')
        menuMobile.classList.add('slide-out')
        body.classList.remove('noscroll')  
      } else {
        header.classList.add('open')
        menuMobile.classList.add('slide-in')
        /*fadeElements.forEach((el) => {
          el.classList.add('fade-in')
          el.classList.remove('fade-out')
        })*/
        overlay.classList.add('fade-in')
        overlay.classList.remove('fade-out')
        menuMobile.classList.add('slide-in')
        menuMobile.classList.remove('slide-out')
        body.classList.add('noscroll') 
      }
    })