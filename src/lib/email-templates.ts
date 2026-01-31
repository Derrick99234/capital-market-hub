export const emailTemplates = {
  registration: {
    subject: "Welcome to Capital Market Hub!",
    html: (name: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Capital Market Hub!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for registering with Capital Market Hub. Your account has been successfully created and you're now ready to start trading.</p>
        <p>Here are some things you can do:</p>
        <ul>
          <li>Deposit funds to your account</li>
          <li>Start trading with our platform</li>
          <li>Monitor your trading performance</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },

  login: {
    subject: "New Login to Your Account",
    html: (name: string, ip?: string, time?: string) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Login Detected</h2>
        <p>Hi ${name},</p>
        <p>We detected a new login to your Capital Market Hub account.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Time:</strong> ${time || new Date().toLocaleString()}</p>
          ${ip ? `<p><strong>IP Address:</strong> ${ip}</p>` : ''}
        </div>
        <p>If this was you, no further action is needed. If you don't recognize this login, please contact our support team immediately.</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },

  tradePlaced: {
    subject: "Trade Placed Successfully",
    html: (name: string, tradeDetails: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Trade Placed Successfully</h2>
        <p>Hi ${name},</p>
        <p>Your trade has been placed successfully. Here are the details:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Trade Type:</strong> ${tradeDetails.tradeType}</p>
          <p><strong>Asset:</strong> ${tradeDetails.asset}</p>
          <p><strong>Amount:</strong> $${tradeDetails.amount}</p>
          <p><strong>Duration:</strong> ${tradeDetails.duration}</p>
          <p><strong>Entry Price:</strong> $${tradeDetails.entryPrice}</p>
        </div>
        <p>You will receive another email when your trade is completed.</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },

  tradeWon: {
    subject: "Congratulations! Trade Won",
    html: (name: string, tradeDetails: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">🎉 Congratulations! Trade Won</h2>
        <p>Hi ${name},</p>
        <p>Great news! Your trade has been completed successfully and you made a profit.</p>
        <div style="background-color: #d1fae5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Trade Type:</strong> ${tradeDetails.tradeType}</p>
          <p><strong>Asset:</strong> ${tradeDetails.asset}</p>
          <p><strong>Amount:</strong> $${tradeDetails.amount}</p>
          <p><strong>Profit:</strong> <span style="color: #10b981; font-weight: bold;">$${tradeDetails.profit}</span></p>
          <p><strong>New Balance:</strong> $${tradeDetails.newBalance}</p>
        </div>
        <p>Keep up the great trading!</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },

  tradeLost: {
    subject: "Trade Completed",
    html: (name: string, tradeDetails: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6b7280;">Trade Completed</h2>
        <p>Hi ${name},</p>
        <p>Your trade has been completed. Here are the details:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Trade Type:</strong> ${tradeDetails.tradeType}</p>
          <p><strong>Asset:</strong> ${tradeDetails.asset}</p>
          <p><strong>Amount:</strong> $${tradeDetails.amount}</p>
          <p><strong>Result:</strong> <span style="color: #ef4444;">Loss</span></p>
          <p><strong>Loss Amount:</strong> $${tradeDetails.lossAmount}</p>
        </div>
        <p>Better luck next time. Remember to trade responsibly and manage your risk.</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },

  withdrawal: {
    subject: "Withdrawal Request Received",
    html: (name: string, withdrawalDetails: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Withdrawal Request Received</h2>
        <p>Hi ${name},</p>
        <p>We have received your withdrawal request and it is being processed.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Amount:</strong> $${withdrawalDetails.amount}</p>
          <p><strong>Method:</strong> ${withdrawalDetails.method}</p>
          <p><strong>Status:</strong> <span style="color: #f59e0b;">Pending</span></p>
          <p><strong>Processing Time:</strong> 24-48 hours</p>
        </div>
        <p>You will receive an email notification once your withdrawal has been processed.</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },

  withdrawalCompleted: {
    subject: "Withdrawal Completed Successfully",
    html: (name: string, withdrawalDetails: any) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Withdrawal Completed Successfully</h2>
        <p>Hi ${name},</p>
        <p>Your withdrawal request has been processed successfully.</p>
        <div style="background-color: #d1fae5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Amount:</strong> $${withdrawalDetails.amount}</p>
          <p><strong>Method:</strong> ${withdrawalDetails.method}</p>
          <p><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Completed</span></p>
          <p><strong>Transaction ID:</strong> ${withdrawalDetails.transactionId}</p>
        </div>
        <p>The funds should appear in your account within the next few hours depending on your payment method.</p>
        <p>Best regards,<br>The Capital Market Hub Team</p>
      </div>
    `,
  },
};

export default emailTemplates;