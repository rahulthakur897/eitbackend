export const enquiryTemplate = ({ name, email, phonenumber, course, message }) => {
    return `
      <div>
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phonenumber}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;
  };
  