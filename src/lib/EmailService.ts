export const EmailService = {
  /**
   * Simulates sending a welcome email to a new strategic asset.
   * In a production environment, this would call a provider like SendGrid or Resend.
   */
  async sendWelcomeEmail(name: string, email: string, university: string) {
    console.log(`[EmailService] Dispatching welcome sequence to ${email}`);
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const emailData = {
      to: email,
      subject: "Welcome to the TUFOP Strategic Network",
      body: `Hello ${name},\n\nYou have been registered as a strategic asset for ${university}.\nWelcome to the forum!`
    };

    console.log("[EmailService] Payload delivered:", emailData);
    
    return { success: true, messageId: Math.random().toString(36).substr(2, 9) };
  },

  /**
   * Logs an automated notification for project assignments.
   */
  async notifyAssignment(assetName: string, projectName: string) {
    console.log(`[EmailService] Security Alert: Asset ${assetName} assigned to operation ${projectName}`);
    return { success: true };
  }
};
