/**
 * --- SUBSYSTEMS ---
 * These represent the complex logic that the Facade will simplify[cite: 12].
 */

class InventorySystem {
    /**
     * Checks if a product is currently in stock[cite: 51].
     * @param productId - The unique identifier for the product [cite: 52]
     * @returns true if the product is available [cite: 52]
     */
    checkStock(productId: string): boolean {
      console.log(`[InventorySystem] Checking stock in Kampala Warehouse for: ${productId}`);
      return true; // Simplified: assume product is always in stock[cite: 53].
    }
  
    /**
     * Reserves a specified quantity of a product in the inventory[cite: 53, 54].
     */
    reserveItem(productId: string, quantity: number): void {
      console.log(`[InventorySystem] Reserving ${quantity} unit(s) of product: ${productId}`);
    }
  }
  
  class PaymentProcessor {
    /**
     * Validates the format of a payment method[cite: 63, 64].
     */
    validateCard(cardNumber: string): boolean {
      console.log(`[PaymentProcessor] Validating payment method: ${cardNumber}`);
      // Simplified validation: checking length[cite: 65].
      return cardNumber.length === 16 || cardNumber.startsWith('256'); 
    }
  
    /**
     * Processes a payment transaction for the specified amount[cite: 66, 67].
     */
    processPayment(amount: number, cardNumber: string): boolean {
      // Localized currency display (Ugandan Shillings - UGX)
      console.log(`[PaymentProcessor] Processing payment of UGX ${amount.toLocaleString()} via: ${cardNumber}`);
      return true; // Simplified: assume payment always succeeds[cite: 69].
    }
  }
  
  class ShippingService {
    /**
     * Initiates the shipping process for a completed order[cite: 76, 77].
     */
    shipOrder(orderId: string, address: string): void {
      console.log(`[ShippingService] Dispatching order ${orderId} to Boda-Boda delivery at: ${address}`);
    }
  
    /**
     * Retrieves the tracking number for a shipped order[cite: 79].
     */
    trackPackage(orderId: string): string {
      console.log(`[ShippingService] Retrieving tracking info for order: ${orderId}`);
      return `KLA-TRACK-${orderId}-${Date.now()}`; // Localized tracking prefix[cite: 80].
    }
  }
  
  /**
   * --- FACADE ---
   * The OrderFacade serves as a single point of entry to the subsystem[cite: 14, 15].
   */
  
  class OrderFacade {
    private inventorySystem: InventorySystem;
    private paymentProcessor: PaymentProcessor;
    private shippingService: ShippingService;
  
    constructor() {
      // Initialize all subsystems internally[cite: 90, 91].
      this.inventorySystem = new InventorySystem();
      this.paymentProcessor = new PaymentProcessor();
      this.shippingService = new ShippingService();
    }
  
    /**
     * Places a complete order by coordinating inventory, payment, and shipping[cite: 17, 91, 92].
     */
    public placeOrder(
      productId: string,
      quantity: number,
      cardNumber: string,
      amount: number,
      shippingAddress: string
    ): boolean {
      console.log('\n=== Starting Ugandan Online Shop Order Process ===\n');
  
      // Step 1: Check inventory availability[cite: 94].
      if (!this.inventorySystem.checkStock(productId)) {
        console.error('[OrderFacade] Order failed: Product out of stock at Kampala Warehouse');
        return false;
      }
  
      // Step 2: Validate payment method[cite: 95].
      if (!this.paymentProcessor.validateCard(cardNumber)) {
        console.error('[OrderFacade] Order failed: Invalid payment details');
        return false;
      }
  
      // Step 3: Process payment transaction[cite: 96, 97].
      if (!this.paymentProcessor.processPayment(amount, cardNumber)) {
        console.error('[OrderFacade] Order failed: Payment processing error');
        return false;
      }
  
      // Step 4: Reserve inventory to prevent overselling[cite: 97].
      this.inventorySystem.reserveItem(productId, quantity);
  
      // Step 5: Initiate shipping[cite: 98].
      const orderId = this.generateOrderId();
      this.shippingService.shipOrder(orderId, shippingAddress);
  
      console.log(`\n[OrderFacade] ✅ Order ${orderId} placed successfully!\n`);
      return true; // [cite: 99]
    }
  
    private generateOrderId(): string {
      return `UG-ORD-${Date.now()}`; // Localized order ID format[cite: 100].
    }
  }
  
  /**
   * --- CLIENT / TEST CODE ---
   * The Client calls high-level methods on the Facade without needing to understand subsystem details[cite: 31].
   */
  
  class ClientWithFacade {
    checkout(): void {
      // Client only interacts with the Facade[cite: 125].
      const orderFacade = new OrderFacade();
  
      const success = orderFacade.placeOrder(
        'MATOOKE-001',           // productId
        5,                       // quantity
        '2567700000000000',      // cardNumber/phone
        150000,                  // amount (UGX)
        'Plot 12, Acacia Avenue, Kololo, Kampala' // Localized address [cite: 126]
      );
  
      if (success) {
        console.log('✅ Order placed successfully! Check your SMS for tracking.'); // [cite: 127]
      } else {
        console.error('❌ Order placement failed. Please contact support.'); // [cite: 128]
      }
    }
  }
  
  // Running the Example[cite: 134, 135].
  const client = new ClientWithFacade();
  client.checkout();