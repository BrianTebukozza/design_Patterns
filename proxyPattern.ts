{
    /**
     * 1. The Subject Interface
     * This defines the contract that both the Real Subject and 
     * the Proxy must fulfill.
     */
    interface IBankAccount {
      getBalance(): number;
      withdraw(amount: number): string;
      deposit(amount: number): string;
    }
  
    /**
     * 2. The Real Subject
     * The actual object that performs the core logic.
     */
    class RealBankAccount implements IBankAccount {
      private balance: number;
  
      constructor(private accountNumber: string, initialBalance: number) {
        this.balance = initialBalance;
      }
  
      public getBalance(): number {
        return this.balance;
      }
  
      public withdraw(amount: number): string {
        if (amount > this.balance) {
          throw new Error("Insufficient funds");
        }
        this.balance -= amount;
        return `Withdrawn $${amount}. New balance: $${this.balance}`;
      }
  
      public deposit(amount: number): string {
        this.balance += amount;
        return `Deposited $${amount}. New balance: $${this.balance}`;
      }
  
      public getAccountNumber(): string {
        return this.accountNumber;
      }
    }
  
    /**
     * 3. The Proxy
     * Acts as an intermediary to the RealBankAccount.
     * It implements the same interface (IBankAccount).
     */
    class ATMProxy implements IBankAccount {
      private authenticated: boolean = false;
      private transactionLog: string[] = [];
      private cachedBalance: number | null = null;
      private dailyWithdrawalLimit: number = 500;
      private dailyWithdrawn: number = 0;
  
      constructor(
        private realAccount: RealBankAccount,
        private correctPin: string
      ) {}
  
      public authenticate(enteredPin: string): boolean {
        if (enteredPin === this.correctPin) {
          this.authenticated = true;
          this.logTransaction("Authentication successful");
          console.log("ATM: Authentication successful ✓");
          return true;
        }
        this.logTransaction("Authentication failed");
        console.log("ATM: Authentication failed ✗");
        return false;
      }
  
      private logTransaction(action: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.transactionLog.push(`[${timestamp}] ${action}`);
      }
  
      private verifyAccess(): void {
        if (!this.authenticated) {
          throw new Error("ATM: Please authenticate first!");
        }
      }
  
      // --- Interface Implementation ---
  
      public getBalance(): number {
        this.verifyAccess();
        
        if (this.cachedBalance !== null) {
          this.logTransaction("Balance inquiry (cached)");
          return this.cachedBalance;
        }
  
        this.cachedBalance = this.realAccount.getBalance();
        this.logTransaction(`Balance inquiry: $${this.cachedBalance}`);
        return this.cachedBalance;
      }
  
      public withdraw(amount: number): string {
        this.verifyAccess();
  
        if (this.dailyWithdrawn + amount > this.dailyWithdrawalLimit) {
          throw new Error("ATM: Daily withdrawal limit reached.");
        }
  
        try {
          const result = this.realAccount.withdraw(amount);
          this.dailyWithdrawn += amount;
          this.cachedBalance = null; // Invalidate cache
          this.logTransaction(`Withdrawal: $${amount}`);
          return result;
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Unknown error";
          this.logTransaction(`Withdrawal failed: ${msg}`);
          throw error;
        }
      }
  
      public deposit(amount: number): string {
        this.verifyAccess();
        if (amount <= 0) throw new Error("Deposit must be positive");
  
        const result = this.realAccount.deposit(amount);
        this.cachedBalance = null; // Invalidate cache
        this.logTransaction(`Deposit: $${amount}`);
        return result;
      }
    }
  
    // --- Demo Execution ---
    const myAccount = new RealBankAccount("ACC-12345", 1000);
    const myATM = new ATMProxy(myAccount, "1234");
  
    try {
      myATM.authenticate("1234");
      console.log(`Balance: $${myATM.getBalance()}`);
      console.log(myATM.deposit(500));
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  }