class Car{
    constructor(public brand: string, public model: string, public year: number, public color: string, protected price: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
    }
    
}
//Похідні класи машин батьківскього
class VolkswagenPassat extends Car { 
    constructor(brand: string, model: string, year: number, color: string, protected price: number, public engine: string, public transmission: string, public fuelType: string, private BodyType: string) {
        super(brand, model, year, color, price);
        this.engine = engine;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.BodyType = BodyType;
    }
    public getBodyType() {
        return this.BodyType;
    }

    public setBodyType(BodyType: string) {
        this.BodyType = BodyType;
    }

    public drive() {
        console.log("Driving VolkswagenPassat");
    }

    public stop() {
        console.log("Stopping VolkswagenPassat");
    }

    public refuel() {
        console.log("Refueling VolkswagenPassat");
    }
}

class AudiRS6 extends Car {
    constructor(brand: string, model: string, year: number, color: string, price: number, public engine: string, public transmission: string, public fuelType: string, private BodyType: string) {
        super(brand, model, year, color, price);
        this.engine = engine;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.BodyType = BodyType;
    }
    public getBodyType() {
        return this.BodyType;
    }

    public setBodyType(BodyType: string) {
        this.BodyType = BodyType;
    }

    public drive() {
        console.log("The AudiRS6 is driving fast");
    }

    public stop() {
        console.log("The AudiRS6 is stopping fast");
    }

    public refuel() {
        console.log("The AudiRS6 is refueling");
    }
}

class ToyotaCamry extends Car { 
    constructor(brand: string, model: string, year: number, color: string, protected price: number, public engine: string, public transmission: string, public fuelType: string, private BodyType: string) {
        super(brand, model, year, color, price);
        this.engine = engine;
        this.transmission = transmission;
        this.fuelType = fuelType;
    }
    public getBodyType() {
        return this.BodyType;
    }

    public setBodyType(BodyType: string) {
        this.BodyType = BodyType;
    }

    public drive() {
        console.log("The ToyotaCamry is driving slowly");
    }

    public stop() {
        console.log("The ToyotaCamry is stopping slowly");
    }

    public refuel() {
        console.log("The ToyotaCamry is refueling slowly");
    }
}

const volkswagenPassatB9 = new VolkswagenPassat("Volkswagen", "Passat B9", 2024, "Red", 10000, "2.6 TSI", "Automatic", "Gasoline", "Universal");
const volkswagenPassatB8 = new VolkswagenPassat("Volkswagen", "Passat B8+", 2020, "Gray", 10000, "1.6 MPI", "Automatic", "Gasoline", "Universal");
const audiRS6 = new AudiRS6("Audi", "RS6 B9", 2024, "Red", 10000, "4.0 TFSI V8", "Automatic", "Gasoline", "Universal");
const audiRS6B8 = new AudiRS6("Audi", "RS6 B8", 2020, "Blue", 10000, "3.0 TSI V6", "Manual", "Gasoline", "Universal");
const toyotaCamryOld = new ToyotaCamry("Toyota", "Camry", 2016, "Red", 10000, "2.6 V6", "Automatic", "Gasoline0", "Universal");
const toyotaCamryNew = new ToyotaCamry("Toyota", "Camry", 2024, "Green", 10000, "1.6 MPI V4", "Automatic", "Gasoline", "Sedan");

console.log("volkswagenPassatB9: ", volkswagenPassatB9);
console.log("volkswagenPassatB8: ", volkswagenPassatB8);
console.log("audiRS6: ", audiRS6);
console.log("audiRS6B8: ", audiRS6B8);
console.log("toyotaCamryOld: ", toyotaCamryOld);
console.log("toyotaCamryNew: ", toyotaCamryNew);