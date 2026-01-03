import dotenv from 'dotenv';
dotenv.config();

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    await transporter.sendMail(notifyMe);
    await transporter.sendMail(confirmSender);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
