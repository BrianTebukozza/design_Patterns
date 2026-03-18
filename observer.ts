interface Customer {
    name: string;
    update(rolexType: string): void;
}

interface Subject {
    registerCustomer(customer: Customer): void;
    removeCustomer(customer: Customer): void;
    notifyCustomers(rolexType: string): void;
}

class RolexStand implements Subject {
    private observers: Customer[] = [];

    public registerCustomer(customer: Customer): void {
        console.log(`--- ${customer.name} joined the queue. ---`);
        this.observers.push(customer);
    }

    public removeCustomer(customer: Customer): void {
        const index = this.observers.indexOf(customer);
        if (index !== -1) {
            this.observers.splice(index, 1);
            console.log(`--- ${customer.name} left the stand. ---`);
        }
    }

    public notifyCustomers(rolexType: string): void {
        console.log(`\n📢 Mama Betty shouts: "ROLEX READY! Type: ${rolexType.toUpperCase()}"`);
        
        this.observers.forEach((observer: Customer) => {
            observer.update(rolexType);
        });
    }
}

class ConcreteCustomer implements Customer {
    constructor(
        public name: string, 
        private preference: string
    ) {}

    public update(rolexType: string): void {
        if (rolexType === this.preference) {
            console.log(`✅ ${this.name}: "That's mine! My ${this.preference} is ready. Mukwano, thank you!"`);
        } else {
            console.log(`⏳ ${this.name}: "Still waiting... I ordered a ${this.preference}."`);
        }
    }
}


const mamaBettyStand = new RolexStand();

const john = new ConcreteCustomer("John", "Chapati");
const sarah = new ConcreteCustomer("Sarah", "Student Budget");
const mike = new ConcreteCustomer("Mike", "Premium");
const grace = new ConcreteCustomer("Grace", "Egg Special");

mamaBettyStand.registerCustomer(john);
mamaBettyStand.registerCustomer(sarah);
mamaBettyStand.registerCustomer(mike);
mamaBettyStand.registerCustomer(grace);

mamaBettyStand.notifyCustomers("Student Budget");

mamaBettyStand.removeCustomer(sarah);

mamaBettyStand.notifyCustomers("Premium");