// script.js
document.getElementById('connect').addEventListener('click', async () => {
    try {
      // Request a USB device
      const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1234, productId: 0x5678 }] });
      
      await device.open(); // Open the device
      if (device.configuration === null) await device.selectConfiguration(1);
      await device.claimInterface(0); // Interface may vary based on device
  
      document.getElementById('status').textContent = 'Status: Connected';
  
      // Read signal strength or other relevant data from device
      const result = await device.transferIn(1, 64); // Adjust endpoint number and length as needed
      const signalStrength = new TextDecoder().decode(result.data);
  
      document.getElementById('signal-strength').textContent = `Signal Strength: ${signalStrength}`;
    } catch (error) {
      console.error(error);
      document.getElementById('status').textContent = 'Status: Connection failed';
    }
  });
  