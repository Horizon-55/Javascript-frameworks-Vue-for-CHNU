// Interface for Animal Task 1
interface Animal {
    name: string;
    age: number;
    color: string;
    weight: number;
    height: number;
    speed: number;
    isHungry: boolean;
    isSleeping: boolean;
    isWalking: boolean;
    isRunning: boolean;
}
//OOP type for Animal
class Cat implements Animal {
    constructor(public name: string, 
        public age: number, public color: string, public weight: number, 
        public height: number, public speed: number, public isHungry: boolean,
        public isSleeping: boolean, public isWalking: boolean, public isRunning: boolean) {
            this.name = name;
            this.age = age;
            this.color = color;
            this.weight = weight;
            this.height = height;
            this.speed = speed;
            this.isHungry = isHungry;
            this.isSleeping = isSleeping;
            this.isWalking = isWalking;
            this.isRunning = isRunning;
    }
    public sleep() {
        this.isSleeping = true;
    }
    public wakeUp() {
        this.isSleeping = false;
    }
    public eat() {
        this.isHungry = false;
    }
    public walk() {
        this.isWalking = true;
    }
    public run() {
        this.isRunning = true;
    }
    public hunt() {
        this.isHungry = true;
    }
}

class Bird implements Animal {
    constructor(public name: string, public age: number, public color: string, public weight: number, 
        public height: number, public speed: number, public isHungry: boolean, 
        public isSleeping: boolean, public isWalking: boolean, public isRunning: boolean, public isFlying: boolean) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.weight = weight;
        this.height = height;
        this.speed = speed;
        this.isHungry = isHungry;
        this.isSleeping = isSleeping;
        this.isWalking = isWalking;
        this.isRunning = isRunning;
    }
    public sleep() {
        this.isSleeping = true;
    }
    public wakeUp() {
        this.isSleeping = false;
    }
    public eat() {
        this.isHungry = false;
    }
    public walk() {
        this.isWalking = true;
    }
    public run() {
        this.isRunning = true;
    }
    public hunt() {
        this.isHungry = true;
    }
    //Bird specific methods
    public fly() {
        this.isFlying = true;
    }
    public land() {
        this.isFlying = false;
    }
}

class Fish implements Animal {
    constructor(public name: string, public age: number, public color: string, 
        public weight: number, public height: number, public speed: number, public isHungry: boolean, 
        public isSleeping: boolean, public isWalking: boolean, public isRunning: boolean, public isSwimming: boolean) {
        this.name = name;
        this.age = age;
        this.color = color;
        this.weight = weight;
        this.height = height;
        this.speed = speed;
        this.isHungry = isHungry;
        this.isSleeping = isSleeping;
        this.isWalking = isWalking;
        this.isRunning = isRunning;
        this.isSwimming = isSwimming;
    }
    public sleep() {
        this.isSleeping = true;
    }
    public wakeUp() {
        this.isSleeping = false;
    }
    public eat() {
        this.isHungry = false;
    }
    public walk() {
        this.isWalking = true;
    }
    public run() {
        this.isRunning = true;
    }
    public hunt() {
        this.isHungry = true;
    }
    //Fish specific methods
    public swim() {
        this.isSwimming = true;
    }
    public dive() {
        this.isSwimming = false;
    }
}
const cat = new Cat("Yarik", 2, "Black", 10, 10, 10, true, false, false, false);
const bird = new Bird("Kesha", 3, "Green", 10, 10, 10, true, false, false, false, true);
const fish = new Fish("Nemo", 4, "Blue", 10, 10, 10, true, false, false, false, true);
console.log(cat);
console.log(bird);
console.log(fish);