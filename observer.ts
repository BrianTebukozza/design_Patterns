/** * 1. The Observer Interface 
 * Every customer must have a way to hear the news.
 */
interface Customer {
    name: string;
    update(rolexType: string): void;
}

/** * 2. The Subject Interface 
 * Defines how the stand manages its crowd.
 */
interface Subject {
    registerCustomer(customer: Customer): void;
    removeCustomer(customer: Customer): void;
    notifyCustomers(rolexType: string): void;
}

/** * 3. The Concrete Subject 
 * Mama Betty's Stand in Wandegeya.
 */
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

    /**
     * THE PATTERN ENGINE: notifyCustomers
     * This is where the foreach loop delivers the news to everyone at once.
     */
    public notifyCustomers(rolexType: string): void {
        console.log(`\n📢 Mama Betty shouts: "ROLEX READY! Type: ${rolexType.toUpperCase()}"`);
        
        // Use forEach to iterate through every registered customer
        this.observers.forEach((observer: Customer) => {
            // Logic: The Subject (Stand) calls the update method on each Observer (Customer)
            // This is the core 'Broadcast' mechanism of the Observer Pattern.
            observer.update(rolexType);
        });
    }
}

/** * 4. The Concrete Observers 
 * The hungry individuals from your image.
 */
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

// --- Execution ---

const mamaBettyStand = new RolexStand();

// Initializing customers from your screenshot
const john = new ConcreteCustomer("John", "Chapati");
const sarah = new ConcreteCustomer("Sarah", "Student Budget");
const mike = new ConcreteCustomer("Mike", "Premium");
const grace = new ConcreteCustomer("Grace", "Egg Special");

// Customers start observing (waiting)
mamaBettyStand.registerCustomer(john);
mamaBettyStand.registerCustomer(sarah);
mamaBettyStand.registerCustomer(mike);
mamaBettyStand.registerCustomer(grace);

// A Rolex is finished!
mamaBettyStand.notifyCustomers("Student Budget");

// Sarah gets her food and leaves
mamaBettyStand.removeCustomer(sarah);

// Another Rolex is ready
mamaBettyStand.notifyCustomers("Premium");