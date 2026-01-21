export const forgetPwdForm = ({ otp }) => {
    return `
      <div>
        <p><strong>Dear Sir/Madam,</strong></p>
        <p>We have received your request to update the password to your account on the EITA website. Your 1 time OTP is <strong>${otp}</strong></p>
        <p>This OTP is valid for 15 minutes or 1 successful attempt whichever is earlier.</p>
        <p>Please do not share this One Time Password with anyone.</p>
        <p><strong>Regards,</strong></p>
        <p>EITA Team</p>
      </div>
    `;
  };
  