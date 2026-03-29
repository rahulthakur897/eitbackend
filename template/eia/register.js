export const registerForm = ({name, otp}) => {
    return `
      <div>
        <h2>Dear ${name},</h2>
        <p><strong>OTP:</strong> ${otp}</p>
      </div>
    `;
  };
  