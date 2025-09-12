//Task 5 Interface
interface Course { 
    title: string;
    duration: number;
    liststudent: string[];
}

class OnlineCourse implements Course { 
    constructor(public title: string, public duration: number, public liststudent: string[]) { 
        this.title = title;
        this.duration = duration;
        this.liststudent = liststudent;
    }
    //Метод для реєстрації студента
    public registerStudent(student: string): void { 
        this.liststudent.push(student);
    }
    //Метод для перевірки чи студент зареєстрований
    public isStudentRegistered(student: string): boolean { 
        return this.liststudent.includes(student);
    };
}

class CourseManager implements Course { 
    constructor(public title: string, public duration: number, public liststudent: string[], public listcourse: Course[]) { 
        this.title = title;
        this.duration = duration;
        this.liststudent = liststudent;
    }
    //Метод для додавання курсу
    public addCourse(course: Course): void { 
        this.listcourse.push(course);
    }
    //Метод для видалення курсу
    public removeCourse(courseName: string): void { 
        this.listcourse = this.listcourse.filter(course => course.title !== courseName);
    }
    //Метод для пошуку курсу
    public findCourse(courseName: string): Course | undefined { 
        return this.listcourse.find(course => course.title === courseName);
    }
}
//масив додавання курсів людей та в їхній предмет!
const CourseList: Course[] = [
    new OnlineCourse("JavaScript", 10, ["John", "Jane"]),
    new OnlineCourse("Java", 10, ["Jonny", "Jenny"]),
    new CourseManager("JavaScript", 10, ["John", "Jane"], [new OnlineCourse("JavaScript", 10, ["John", "Jane"])]),
    new CourseManager("Java", 10, ["Jonny", "Jenny"], [new OnlineCourse("Java", 10, ["Jonny", "Jenny"])]),
];
//До
console.log(CourseList.forEach(course => course.title));