import dotenv from "dotenv";

dotenv.config();

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Common function to send email through Brevo
const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "BookMyEvent",
          email: process.env.EMAIL_FROM,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,

        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
      throw new Error(data?.message || "Failed to send email through Brevo");
    }

    console.log("Email sent successfully:", data.messageId);

    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

// ================================
// OTP EMAIL
// ================================

export const sendOtpEmail = async (email, otp, type) => {
  try {
    const messageType =
      type === "account-verification"
        ? "Account Verification"
        : "Booking Verification";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>BookMyEvent OTP</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        "
      >

        <div
          style="
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          "
        >

          <!-- Header -->

          <div
            style="
              background: #4f46e5;
              color: white;
              padding: 25px;
              text-align: center;
            "
          >
            <h1 style="margin: 0;">
              BookMyEvent
            </h1>

            <p style="margin: 8px 0 0;">
              ${messageType}
            </p>
          </div>


          <!-- Content -->

          <div style="padding: 35px; text-align: center;">

            <h2>
              Your OTP Verification Code
            </h2>

            <p style="color: #555;">
              Use the following OTP to continue with your
              BookMyEvent request.
            </p>


            <!-- OTP -->

            <div
              style="
                margin: 25px auto;
                padding: 18px;
                background: #f3f4f6;
                border-radius: 10px;
                width: 200px;
              "
            >

              <h1
                style="
                  margin: 0;
                  letter-spacing: 8px;
                  color: #4f46e5;
                "
              >
                ${otp}
              </h1>

            </div>


            <p style="color: #666;">
              This OTP is valid for
              <strong>10 minutes</strong>.
            </p>

            <p style="color: #888; font-size: 13px;">
              If you did not request this OTP,
              you can safely ignore this email.
            </p>

          </div>


          <!-- Footer -->

          <div
            style="
              background: #f9fafb;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 13px;
            "
          >

            <p style="margin: 0;">
              © ${new Date().getFullYear()} BookMyEvent
            </p>

            <p style="margin: 5px 0 0;">
              Event booking made simple.
            </p>

          </div>

        </div>

      </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: "Your BookMyEvent OTP Verification Code",
      html,
    });
  } catch (error) {
    console.error("OTP email error:", error);
    throw error;
  }
};

// ================================
// BOOKING CONFIRMATION EMAIL
// ================================

export const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>Booking Confirmation</title>
      </head>


      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        "
      >

        <div
          style="
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          "
        >

          <!-- Header -->

          <div
            style="
              background: #16a34a;
              color: white;
              padding: 25px;
              text-align: center;
            "
          >

            <h1 style="margin: 0;">
              BookMyEvent
            </h1>

            <p style="margin: 8px 0 0;">
              Booking Confirmation
            </p>

          </div>


          <!-- Content -->

          <div style="padding: 35px;">

            <h2>
              Booking Confirmed 🎉
            </h2>

            <p>
              Dear <strong>${userName}</strong>,
            </p>

            <p>
              Your booking for
              <strong>${eventTitle}</strong>
              has been successfully confirmed.
            </p>


            <div
              style="
                margin: 25px 0;
                padding: 20px;
                background: #f0fdf4;
                border-left: 5px solid #16a34a;
                border-radius: 8px;
              "
            >

              <p style="margin: 0; color: #166534;">
                Your ticket has been successfully booked.
              </p>

            </div>


            <p>
              Thank you for choosing
              <strong>BookMyEvent</strong>.
            </p>

            <p>
              We hope you enjoy the event!
            </p>

          </div>


          <!-- Footer -->

          <div
            style="
              background: #f9fafb;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 13px;
            "
          >

            <p style="margin: 0;">
              © ${new Date().getFullYear()} BookMyEvent
            </p>

          </div>

        </div>

      </body>

      </html>
    `;

    await sendEmail({
      to: userEmail,
      subject: `Booking Confirmation: ${eventTitle}`,
      html,
    });
  } catch (error) {
    console.error("Booking email error:", error);
    throw error;
  }
};
