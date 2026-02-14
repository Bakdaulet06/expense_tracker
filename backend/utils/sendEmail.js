// utils/sendEmail.js
import axios from "axios"

export const sendEmail = async (to, subject, text) => {
  console.log("=== SENDING EMAIL ===")
  console.log("To:", to)
  console.log("Subject:", subject)
  console.log("Text:", text)
  console.log("API Key exists:", !!process.env.BREVO_API_KEY)
  
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { 
          name: "Expense Tracker", 
          email: "baikozhabakdaulet42@gmail.com" // ← Replace with YOUR verified email
        },
        to: [{ email: to }],
        subject,
        textContent: text
      },
      {
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json"
        }
      }
    )
    console.log("✅ Email sent! Response:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Email error:", error.response?.data || error.message)
    throw error
  }
}