export const itForm = ({fullName, email, contactNumber, companyName, message}) => {
    return `
      <div>
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${contactNumber}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;
  };
  