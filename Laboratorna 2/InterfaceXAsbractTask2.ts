//Task 2 Inteface abstract
interface Shape{
    // Метод для обчислення площі фігури
    calculateArea(): number;
    
    // Метод для обчислення периметру фігури
    calculatePerimeter(): number;
}

//Клас Circle який реалізує інтерфейс Shape та інші ООП класи x Методи
class Circle implements Shape{
    constructor(public radius: number){
        this.radius = radius;
    }
    
    public calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    public calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    //Метод для масштабування фігури
    public scale(factor: number): void {
        this.radius *= factor;
    }
}

class Rectangle implements Shape{
    constructor(public width: number, public height: number){
        this.width = width;
        this.height = height;
    }
    //Методи для обчислення площі та периметру прямокутника
    public calculateArea(): number {
        return this.width * this.height;
    }
    //Метод для обчислення периметру прямокутника
    public calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
    //Метод для масштабування фігури
    public scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}

class Triangle implements Shape{
    constructor(public side1: number, public side2: number, public side3: number){
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }
    public calculateArea(): number {
        return Math.sqrt(this.side1 * this.side2 * this.side3);
    }
    public calculatePerimeter(): number {
        return this.side1 + this.side2 + this.side3;
    }
    //Метод для масштабування фігури
    public scale(factor: number): void {
        this.side1 *= factor;
        this.side2 *= factor;
        this.side3 *= factor;
    }
}
//Виклики методів для кожного класу
const circle = new Circle(10);
const rectangle = new Rectangle(10, 20);
const triangle = new Triangle(10, 20, 30);
console.log("CircleArea: ", circle.calculateArea());
console.log("CirclePerimeter: ", circle.calculatePerimeter());
console.log("RectangleArea: ", rectangle.calculateArea());
console.log("RectanglePerimeter: ", rectangle.calculatePerimeter());
console.log("TriangleArea: ", triangle.calculateArea());
console.log("TrianglePerimeter: ", triangle.calculatePerimeter());