class Animal {
    eat() {
        console.log('This animal can eat.')
    }

    makeSound() {
        console.log('This animal can make sound.')
    }
}

class Dog {
    constructor() {
        this.animal = new Animal() // 委譲先
    }
    eat() {
        return this.animal.eat()
    }
    makeSound() {
        return this.animal.makeSound()
    }
    bite() {
        console.log('This dog can bite.')
    }
}

class Husky {
    constructor() {
        this.dog = new Dog() // 委譲先
    }
    eat() {
        return this.dog.eat()
    }
    makeSound() {
        return this.dog.makeSound()
    }
    bite() {
        return this.dog.bite()
    }
}

class Cat {
    constructor() {
        this.animal = new Animal() // 委譲先
    }
    eat() {
        return this.animal.eat()
    }
    makeSound() {
        return this.animal.makeSound()
    }
    scratch() {
        console.log('This cat can scratch.')
    }
}

class Bird {
    constructor() {
        this.animal = new Animal() // 委譲先
    }
    eat() {
        return this.animal.eat()
    }
    makeSound() {
        return this.animal.makeSound()
    }
    fly() {
        console.log('This bird can fly.')
    }
}

class Fish {
    constructor() {
        this.animal = new Animal() // 委譲先
    }
    eat() {
        return this.animal.eat()
    }
    swim() {
        console.log('This fish can swim.')
    }
}

const a = new Animal()
const d = new Dog()
const h = new Husky()
const c = new Cat()
const b = new Bird()
const f = new Fish()
console.log(a.eat()) // This animal can eat.
console.log(a.makeSound()) // This animal can make sound.
console.log(d.eat())  // This animal can eat.
console.log(d.makeSound()) // This animal can make sound.
console.log(d.bite()) // This dog can bite.
console.log(h.eat())  // This animal can eat.
console.log(b.makeSound()) // This animal can make sound.
console.log(b.fly()) // This bird can fly.
console.log(f.eat())  // This animal can eat.
console.log(f.swim()) // This fish can swim.
console.log(f.makeSound()) // TypeError: f.makeSound is not a function