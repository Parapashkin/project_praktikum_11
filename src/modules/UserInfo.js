export class UserInfo {
    constructor(userElement, infoElement, defaultValues) {
        this.userElement = userElement;
        this.infoElement = infoElement;
        this.defaultValues = defaultValues;
        // this.api = api; ++
    }

    setUserInfo(userUpdate, infoUpdate) {
        this.user = userUpdate;
        this.info = infoUpdate;
        this.defaultValues(this.user, this.info);
        this.updateUserInfo();
    }



    updateUserInfo() {
        this.userElement.textContent = this.user;
        this.infoElement.textContent = this.info;



    }

}

