interface LibraryItem {
    title: string;
    author: string;

    borrow(): void;
}

//Клас Book & Magazine & DVD який наслідує клас LibraryItem
class Book implements LibraryItem { 
    constructor(public title: string, public author: string) {
        this.title = title;
        this.author = author;
    }

    public borrow(): void {
        console.log(`${this.title} by ${this.author} has been borrowed`);
    }

    public countPages(numberOfPages: number): void {
        console.log(`${this.title} has ${numberOfPages} pages`);
    }
}

class Magazine implements LibraryItem { 
    constructor(public title: string, public author: string) { 
        this.title = title;
        this.author = author;
    }

    public borrow(): void {
        console.log(`${this.title} by ${this.author} has been borrowed`);
    }

    public NumberofMagazine(numberOfMagazine: number): void { 
        console.log(`${this.title} has ${numberOfMagazine} magazines`);
    }
}

class DVD implements LibraryItem { 
    constructor(public title: string, public author: string) { 
        this.title = title;
        this.author = author;
    }
    
    public borrow(): void {
        console.log(`${this.title} by ${this.author} has been borrowed`);
    }

    public DurationofDVD(duration: number): void { 
        console.log(`${this.title} has ${duration} minutes`);
    }   
}

//Клас Library який має метод addItem для додавання предметів
class Library { 
    constructor(public items: LibraryItem[]) { 
        this.items = items;
    }

    public addItem(item: LibraryItem): void { 
        this.items.push(item);
    }
    
    public findItemByName(Name: string): LibraryItem | undefined { 
        return this.items.find(item => item.title === Name);
    }
}

const library = new Library([new Book("The Great Gatsby", "F. Scott Fitzgerald"), new Magazine("National Geographic", "National Geographic"), new DVD("The Avengers", "Joss Whedon")]);
library.addItem(new Book("1984", "George Orwell"));
console.log("Item found: ", library.findItemByName("The Great Gatsby"));
console.log("Dvd duration: ", library.findItemByName("The Avengers"));
console.log("Magazine number: ", library.findItemByName("National Geographic"));