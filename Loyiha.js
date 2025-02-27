class person {
    constructor(name, desigination) {
        this.name = name;
        this.desigination = desigination;
    }
    learn() {
        console.log(`${this.name} is learning`);
    }

    work() {
        console.log(`${this.name} is coding`);
    }

    dance() {
        console.log(`${this.name} is dancing`);
    }

    sing() {
        console.log(`${this.name} is singing`);
    }
}



class programmer extends person {
    constructor(coding) {
        super(this.name, this.desigination);
        this.coding = coding;
    }
}

class dancer extends person {
    constructor(dance) {
        super(this.name, this.desigination);
        this.dance = dance;
    }
}


class singer extends person {
    constructor(singing) {
        super(this.name, this.desigination);
        this.singing = singing;
    }
}

const person1 = new person('Isfandiyor', 'Vohidoc');
person1.learn();
person1.work();
person1.dance();
person1.sing();


