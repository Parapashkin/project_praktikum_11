export class CardList {
    constructor(container, createCard, api) {
        this.container = container;
        this.createCard = createCard;
        this.api = api;

    }

    addCard(name, link, likes) {
        this.container.appendChild(this.createCard(name, link, likes));

    }



    render(cards) {

        cards.forEach((card) => {
            this.addCard(card.name, card.link, card.likes.length);
        })




    }
}



