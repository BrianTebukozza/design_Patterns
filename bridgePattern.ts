{
    /**
     * 1. IMPLEMENTATION INTERFACE
     * This defines the "Device" contract. All concrete devices (Samsung, Sony)
     * must follow this.
     */
    interface IDevice {
      isEnabled(): boolean;
      enable(): void;
      disable(): void;
      getChannel(): number;
      setChannel(channel: number): void;
      getBrand(): string;
    }
  
    /**
     * 2. CONCRETE IMPLEMENTATIONS
     */
    class SamsungTV implements IDevice {
      private on: boolean = false;
      private channel: number = 1;
  
      public isEnabled(): boolean { return this.on; }
      public enable(): void { this.on = true; console.log("Samsung: Power ON"); }
      public disable(): void { this.on = false; console.log("Samsung: Power OFF"); }
      public getChannel(): number { return this.channel; }
      public setChannel(ch: number): void { this.channel = ch; }
      public getBrand(): string { return "Samsung"; }
    }
  
    class SonyTV implements IDevice {
      private powered: boolean = false;
      private currentChannel: number = 1;
  
      public isEnabled(): boolean { return this.powered; }
      public enable(): void { this.powered = true; console.log("Sony: System Activated"); }
      public disable(): void { this.powered = false; console.log("Sony: System Deactivated"); }
      public getChannel(): number { return this.currentChannel; }
      public setChannel(ch: number): void { this.currentChannel = ch; }
      public getBrand(): string { return "Sony"; }
    }
  
    /**
     * 3. ABSTRACTION
     * The RemoteControl "Has-A" Device (Composition).
     * This is the "Bridge" connecting the remote interface to the device logic.
     */
    class RemoteControl {
      constructor(protected device: IDevice) {}
  
      public togglePower(): void {
        if (this.device.isEnabled()) {
          this.device.disable();
        } else {
          this.device.enable();
        }
      }
  
      public channelUp(): void {
        const current = this.device.getChannel();
        this.device.setChannel(current + 1);
        console.log(`Remote: Channel increased to ${this.device.getChannel()}`);
      }
    }
  
    /**
     * 4. REFINED ABSTRACTION
     * Adds new features (Mute, Favorites) without changing the Device classes.
     */
    class AdvancedRemote extends RemoteControl {
      public mute(): void {
        console.log(`Advanced Remote: ${this.device.getBrand()} is now MUTED`);
      }
  
      public setChannel(channel: number): void {
        this.device.setChannel(channel);
        console.log(`Advanced Remote: Direct tuned to ${channel}`);
      }
    }
  
    // --- DEMO ---
    
    // Create Implementations
    const samsung = new SamsungTV();
    const sony = new SonyTV();
  
    // Link Abstraction to Implementation (The Bridge)
    const basicRemote = new RemoteControl(samsung);
    const proRemote = new AdvancedRemote(sony);
  
    console.log("--- Operating Samsung with Basic Remote ---");
    basicRemote.togglePower();
    basicRemote.channelUp();
  
    console.log("\n--- Operating Sony with Advanced Remote ---");
    proRemote.togglePower();
    proRemote.setChannel(55);
    proRemote.mute();
  
    // The Bridge allows switching the device at runtime
    console.log("\n--- Switching: Advanced Remote now controlling Samsung ---");
    const proRemoteForSamsung = new AdvancedRemote(samsung);
    proRemoteForSamsung.setChannel(10);
  }