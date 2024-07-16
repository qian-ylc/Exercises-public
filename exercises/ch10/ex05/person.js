class PersonRe {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayName() {
        console.log(`My name is ${this.name}`);
    }

}

class TeacherRe extends PersonRe {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    saySubject() {
        console.log(`${this.name} teaches ${this.subject}`);
    }
}

class StudentRe extends PersonRe {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    sayGrade() {
        console.log(`${this.name} is in grade ${this.grade}`);
    }
}

export { PersonRe as Person, TeacherRe as Teacher, StudentRe as Student } 
