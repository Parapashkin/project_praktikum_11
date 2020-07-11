function setSubmitButton(button, isValid) {
    button.disabled = !isValid;
}

setSubmitButton(popupButton, false);
setSubmitButton(popupButtonEdit,true);

function getErrorMessage(element) {
    return document.querySelector(`.popup__valid[data-for="${element.name}"]`);
}

function checkInputValidity(element) {
    if (element.tagName !== "INPUT") return true;
    const validity = element.validity;
    // console.log(validity);
    if(validity.valid) {
        getErrorMessage(element).textContent = "";
        return true;
    }
    if(validity.tooShort) {
        getErrorMessage(element).textContent = "Введите от 2 до 30 символов";
        return false;
    }
    if(validity.patternMismatch) {
        getErrorMessage(element).textContent = "Данные не корректны";
        return false;
    }
    if(validity.valueMissing) {
        getErrorMessage(element).textContent = "Обязательное поле";
        return false;
    }
}


function setEventListeners(form) {
    let x = [...form.elements].reduce((acc, el) => checkInputValidity(el) && acc, true);
    setSubmitButton(popupButton, x);
    setSubmitButton(popupButtonEdit, x);

}

formPopup.addEventListener('input', () => setEventListeners(formPopup));
formEdit.addEventListener('input', () => setEventListeners(formEdit));

