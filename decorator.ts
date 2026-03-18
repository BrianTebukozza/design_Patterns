interface Rolex {
  getDescription(): string;
  getCost(): number;
}

class PlainRolex implements Rolex {
  getDescription(): string {
    return "Standard Rolex (1 Egg, 1 Chapati)";
  }

  getCost(): number {
    return 2000; // original price
  }
}

abstract class RolexDecorator implements Rolex {
  protected decoratedRolex: Rolex;

  constructor(rolex: Rolex) {
    this.decoratedRolex = rolex;
  }

  getDescription(): string {
    return this.decoratedRolex.getDescription();
  }

  getCost(): number {
    return this.decoratedRolex.getCost();
  }
}

class ExtraEgg extends RolexDecorator {
  getDescription(): string {
    return this.decoratedRolex.getDescription() + ", + Extra Egg";
  }

  getCost(): number {
    return this.decoratedRolex.getCost() + 500;
  }
}

class VeggieMix extends RolexDecorator {
  getDescription(): string {
    return this.decoratedRolex.getDescription() + ", with Veggie Mix";
  }

  getCost(): number {
    return this.decoratedRolex.getCost() + 300;
  }
}

class StudentDiscount extends RolexDecorator {
  getDescription(): string {
    return "PROMO: " + this.decoratedRolex.getDescription();
  }

  getCost(): number {
    return this.decoratedRolex.getCost() - 200;
  }
}

console.log("--- Mama Betty's Rolex Stand ---");

let order1: Rolex = new PlainRolex();
order1 = new ExtraEgg(order1);
order1 = new ExtraEgg(order1);
order1 = new VeggieMix(order1);

console.log("Customer 1 Order: " + order1.getDescription());
console.log("Price: " + order1.getCost() + " UGX");

console.log("--------------------------------");

let order2: Rolex = new PlainRolex();
order2 = new VeggieMix(order2);
order2 = new StudentDiscount(order2);

console.log("Customer 2 Order: " + order2.getDescription());
console.log("Price: " + order2.getCost() + " UGX");
