try {
    const mobileNavIcon = document.querySelector('.intro__mobile_nav_icon');
    const mobileMenu = document.querySelector('.intro__mobile_nav');
    const mobileNavClose = document.querySelector('.intro__mobile_nav_close');
    const navMenus = document.querySelectorAll('.intro_mobile_navmenu');

    mobileNavIcon.addEventListener('click', () => {
        if(mobileMenu){
            mobileMenu.style.display = "flex";
            mobileMenu.lastElementChild.classList.add('animate__slideInRight')
        }
    })

    mobileNavClose.addEventListener('click', () => {
        if(mobileMenu){
            mobileMenu.style.display = "none";
        }
    })

    navMenus.forEach((menu) => {
        menu.addEventListener('click', () => {
            menu.classList.toggle('subMenuActive');
        })
    })

} catch (error) {
    console.log('Error detected...', error);
}