class Card {
  constructor(name, link, template, imageOpen, likes) {
    this.name = name;
    this.link = link;
    this.template = template;
    this.cardElem = null;
    this.imageOpen = imageOpen;
    this.likes = likes;
  }

  create() {
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', this.template);
    const newCard = element.firstElementChild;

    newCard.querySelector('.place-card__name').textContent = this.name;
    /**
     * Можно лучше: +++
     * Работать с element.style, в таком случае исключается риск перезаписать другие стили.
     * https://developer.mozilla.org/ru/docs/Web/API/HTMLElement/style
     */
    // newCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.link})`);
    newCard.querySelector('.place-card__image').style =`background-image: url(${this.link})`;
    newCard.querySelector('.place-card__like-count').textContent = this.likes;
    this.cardElem = newCard;
    this.setEventListeners();

    return newCard;
  }





  like() {
    this.cardElem.querySelector(".place-card__like-icon").classList.toggle('place-card__like-icon_liked')
  }


  /**
   * Можно лучше:
   * Лучше снимать обработчики с this.cardElem (removeEventListener), чтобы на этот элемент не осталось
   * ссылок и сборщик мусора мог его удалить из памяти.
   */
  remove(event){
    this.cardElem.remove();
    this.cardElem = null;
    event.stopImmediatePropagation()
  }



  showCurrentImage(){
    /**
     * Можно лучше:
     * Передавать this.link
     */
    this.imageOpen(this.cardElem.querySelector(".place-card__image").getAttribute('style'))
    // this.imageOpen(this.cardElem.querySelector(".place-card__image").getAttribute('style'))

  }



  setEventListeners() {
    this.cardElem.querySelector(".place-card__delete-icon").addEventListener('click', this.remove.bind(this));
    this.cardElem.querySelector(".place-card__like-icon").addEventListener('click', this.like.bind(this));
    this.cardElem.querySelector(".place-card__image").addEventListener('click', this.showCurrentImage.bind(this));
  }
}



