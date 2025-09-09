import promptSync from 'prompt-sync';
const prompt = promptSync();

type IceCreamSize = "small" | "medium";
//типи начинок 
type IceCreamFlavor = "vanilla" | "chocolate" | "strawberry" | "caramel";

interface IceCreamOrder { 
    size: IceCreamSize;
    topping?: IceCreamFlavor | IceCreamFlavor[];  // Дозволяємо і одну начинку, і масив
}

const PRICES = {
    sizes: {
        маленький: 10,
        великий: 25
    },
    toppings: {
        vanilla: 6,
        chocolate: 5,
        strawberry: 10,
        caramel: 6  // Додаємо 
    }
} as const;

export function calculateIceCreamPrice(order: IceCreamOrder): number { 
    // базова вартість
    const sizeMap: Record<IceCreamSize, keyof typeof PRICES.sizes> = {
        small: "маленький",
        medium: "великий"
    };

    let totalPrice = PRICES.sizes[sizeMap[order.size]];

    // Handle toppings: allow for single or multiple toppings
    let toppings: IceCreamFlavor[] = [];
    if (order.topping) {
        if (Array.isArray(order.topping)) {
            toppings = order.topping;
        } else {
            toppings = [order.topping];
        }
    }

    for (const topping of toppings) {
        totalPrice += PRICES.toppings[topping];
    }

    return totalPrice;
}

export function getIceCreamOrderFromUser(): IceCreamOrder { 
    let size: IceCreamSize;
    while (true) { 
        const sizeInput = prompt(
            "Виберіть розмір стаканчика:\n" +
            "1 - Маленький (10грн)\n" +
            "2 - Великий (25грн)\n" +
            "Введіть 1 або 2:"
        );
        if (sizeInput === "1") {
            size = "small";
            break;
        }
        else if (sizeInput === "2") { 
            size = "medium";
            break;
        }
        else {
            console.log("Неправильний ввід. Повторіть спробу.");
        }
    }

    // Для простоти повертаємо тільки розмір
    return { size };
}

// Приклад 1: Маленький стаканчик без начинок
const order1: IceCreamOrder = {
    size: "small"
};
console.log("Маленький стаканчик:", calculateIceCreamPrice(order1), "грн");

// Приклад 2: Великий стаканчик з шоколадом
const order2: IceCreamOrder = {
    size: "medium",
    topping: "chocolate"
};
console.log("Великий з шоколадом:", calculateIceCreamPrice(order2), "грн");

// Приклад 3: Маленький з усіма начинками
const order3: IceCreamOrder = {
    size: "small",
    topping: ["chocolate", "caramel", "strawberry"]
};
console.log("Маленький з усіма начинками:", calculateIceCreamPrice(order3), "грн");

// Приклад 4: Великий з карамеллю та ягодами
const order4: IceCreamOrder = {
    size: "medium",
    topping: ["caramel", "strawberry"]
};
console.log("Великий з карамеллю та ягодами:", calculateIceCreamPrice(order4), "грн");