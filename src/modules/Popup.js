export class Popup {
    constructor(popup) {
        this.popup = popup;
    }

    open() {
        // console.log("open")
        this.popup.classList.add('popup_is-opened');

    }

    close() {

        // console.log("close")
        this.popup.classList.remove('popup_is-opened');
    }


    setEventListeners(){
        this.popup.querySelector('.popup__close').addEventListener('click',this.close.bind(this));
       
        
    }


}





