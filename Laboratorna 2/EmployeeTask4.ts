//Базовий клас Employee
class Employee { 
    constructor(public name: string, public age: number, public salary: number) { 
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
   
   public getAnnualSalary(): number {
    return this.salary * 12;
    
   }
}

interface Payable { 
    pay(): void;
}
//Клас Developer який наслідує клас Employee та Manager
class Develper extends Employee implements Payable { 
    constructor(name: string, age: number, salary: number, public programmingLanguage: string) {
        super(name, age, salary);
        this.programmingLanguage = programmingLanguage;
    }
    //Метод повернення бонус у розмірі 10% від заробітної плати
    public getBonus(): number {
        return this.salary * 0.1;
    }

    public pay(): void { 
        console.log(`${this.name} received ${this.salary} for the month`);
    }
}

class Manager extends Employee implements Payable { 
    constructor(name: string, age: number, salary: number, public department: string) {
        super(name, age, salary);
        this.department = department;
    }
    //Метод повернення бонус у розмірі -20% від заробітної плати
    public getBonus(): number {
        return this.salary * -0.2;
    }

    public pay(): void { 
        console.log(`${this.name} received ${this.salary} for the month`);
    }
}

const employers: [Develper, Manager] = [
    new Develper("John", 30, 1000, "JavaScript"),
    new Manager("Jane", 30, 1000, "HR"),
];
//підсумувати заробітну плату всіх працівників 4.4
const annualSalaryForAllEmployers = employers.reduce((sum, employer) => sum + employer.getAnnualSalary(), 0);
console.log(annualSalaryForAllEmployers);