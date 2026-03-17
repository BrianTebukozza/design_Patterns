// 1. THE COMPONENT INTERFACE
// This is the "contract." Anything that wants to be a "Garden"
// MUST have these two methods.
interface Garden {
  getDescription(): string;
  getValue(): number;
}

// 2. THE CONCRETE COMPONENT
// This is our starting point: simple, undecorated land.
class BareLand implements Garden {
  getDescription(): string {
    return "A plain piece of land in Central Uganda";
  }

  getValue(): number {
    return 5000000; // Base price in UGX
  }
}

// 3. THE BASE DECORATOR (The Wrapper)
// Note: It implements 'Garden' so it can be used anywhere a Garden is expected.
// It also contains a 'Garden' inside it (Composition).
abstract class GardenDecorator implements Garden {
  protected decoratedGarden: Garden;

  constructor(g: Garden) {
    this.decoratedGarden = g;
  }

  // By default, it just asks the inner garden for the info
  getDescription(): string {
    return this.decoratedGarden.getDescription();
  }

  getValue(): number {
    return this.decoratedGarden.getValue();
  }
}

// 4. CONCRETE DECORATORS
// These classes actually change the behavior/data.

class MatookeDecorator extends GardenDecorator {
  getDescription(): string {
    return this.decoratedGarden.getDescription() + ", with Matooke plantation";
  }

  getValue(): number {
    return this.decoratedGarden.getValue() + 2000000;
  }
}

class CoffeeDecorator extends GardenDecorator {
  getDescription(): string {
    return (
      this.decoratedGarden.getDescription() + ", with Arabica Coffee trees"
    );
  }

  getValue(): number {
    return this.decoratedGarden.getValue() + 3500000;
  }
}

class FenceDecorator extends GardenDecorator {
  getDescription(): string {
    return (
      this.decoratedGarden.getDescription() + ", and a secure barbed wire fence"
    );
  }

  getValue(): number {
    return this.decoratedGarden.getValue() + 1200000;
  }
}

// 5. THE CLIENT CODE
// Here is how we build our "Shamba" layer by layer.

// Start with the base land
let myShamba: Garden = new BareLand();

// Wrap it in Matooke
myShamba = new MatookeDecorator(myShamba);

// Wrap that result in Coffee
myShamba = new CoffeeDecorator(myShamba);

// Wrap everything in a Fence
myShamba = new FenceDecorator(myShamba);

// Final Results
console.log("--- My Shamba Details ---");
console.log("Description: " + myShamba.getDescription());
console.log("Total Value: " + myShamba.getValue().toLocaleString() + " UGX");
