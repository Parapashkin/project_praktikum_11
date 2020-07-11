export class FormValidator {
    constructor(form) {
        this.form = form;
        this.button = this.form.querySelector(".button");
    }



    setSubmitButtonState() {
     
        /**
         * Можно лучше: +++
         * const вместо let, т.к. значение не меняется.
         * const x = [...this.form ...
         *
         * Можно лучше:
         * Дать более семантичное название, например, isEveryFieldValid
         */
        
        const x = [...this.form.querySelectorAll('.popup__input')].reduce((acc, el) => this.checkInputValidity(el) && acc, true);
        this.button.disabled = !x;

    }

    getErrorMessage(element) {
        return this.form.querySelector(`.popup__valid[data-for="${element.name}"]`);

    }

    checkInputValidity(element) {

        /**
         * Можно лучше: ++++
         * Использовать const
         * Значение validity не изменяется.
         * Значение errorMessage не меняется
         * Редактирование свойств объекта в const допустимо, т.к. ссылка на объект не изменяется.
         */
        const validity = element.validity;
        const errorMessage = this.getErrorMessage(element);

        if (validity.valid) {
            errorMessage.textContent = "";
            return true;
        }
        if (validity.tooShort) {
            errorMessage.textContent = "Введите от 2 до 30 символов";
            return false;
        }
        if (validity.patternMismatch) {
            errorMessage.textContent = "Данные не корректны";
            return false;
        }
        if(validity.valueMissing) {
            errorMessage.textContent = "Обязательное поле";
            return false;
        }
    }


    setEventListeners() {
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    }


    cleanSpaces() {
        this.form.querySelectorAll('.popup__valid').forEach(element => { element.textContent = ""; });
        this.form.reset();        

    }



}
