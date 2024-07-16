class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayName() {
        console.log(`My name is ${this.name}`);
    }

}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    saySubject() {
        console.log(`${this.name} teaches ${this.subject}`);
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    sayGrade() {
        console.log(`${this.name} is in grade ${this.grade}`);
    }
}

export { Person, Teacher, Student } 
