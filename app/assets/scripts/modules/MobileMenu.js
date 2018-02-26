import $ from 'jquery';

class MobileMenu {
    constructor(){
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
        this.events(); //calls the event menthod when the constructor is created
    }

    events() {
        this.menuIcon.click(this.toggleMenu.bind(this)); //binds this in toggleMenu to .site-header__menu-content
    }

    toggleMenu() {
        this.menuContent.toggle("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");

        if(this.menuIcon.hasClass('active')){
            this.menuIcon.toggleClass('reverse');
        }
        else {
            this.menuIcon.toggleClass('active');
        }
    }
}

export default MobileMenu;