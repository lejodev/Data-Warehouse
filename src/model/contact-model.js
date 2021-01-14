export class Contact {

    TEST_CONST = 123;

    constructor(name, lastName, email, country, position, channels, interestPercentage) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.country = country;
        this.position = position;
        this.channels = channels;
        this.interestPercentage = interestPercentage;
    }

    haveHighPercentage() {
        return this.interestPercentage > 80;
    }
}