let age: number = 20;
let name: string = "John";
let SexMan: boolean = true;

let employee: null = null;
let dontknowfriend: undefined = undefined;

//унікальний тип
let sym1: symbol = Symbol("sym1");
let sym2: symbol = Symbol("sym1");

//велике число! як тип
let bigNumber: bigint = 100n;
let anotherBigInt: bigint = BigInt(9007199254740991);

let numbersofArray: number[] = [1, 2, 3, 4, 5];
let friends: Array<string> = ["John", "Jane", "Jim", "Jill"];
//вивід імя та віку
console.log("Age: ", age);
console.log("Name: ", name);
console.log("SexMan: ", SexMan);
//вивести null & undefined
console.log("Employee: ", employee);
console.log("Dontknowfriend: ", dontknowfriend);
//вивести унікальний тип
console.log("Sym1: ", sym1);
console.log("Sym2: ", sym2);
//вивести велике число
console.log("BigNumber: ", bigNumber);
console.log("AnotherBigInt: ", anotherBigInt);
//вивести масив чисел
console.log("NumbersofArray: ", numbersofArray);
//вивести масив імен
console.log("Friends: ", friends);
