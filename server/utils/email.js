// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendBookingEmail = async (userEmail, userName, eventTitle) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: `Booking Confirmation: ${eventTitle}`,
//       html: `
//         <p>Dear ${userName},</p>
//         <p>Your booking for <strong>${eventTitle}</strong> has been confirmed!</p>
//         <p>Thank you for choosing BookMyEvent.</p>
//       `,
//     };
//     let report = await transporter.sendMail(mailOptions);
//     console.log("Booking email sent successfully:", report);
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     throw error;
//   }
// };

// export const sendOtpEmail = async (email, otp, type) => {
//   try {
//     const messageType = type === "account-verification";
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your OTP Verification Code",
//       html: `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>OTP Verification</title>
//       </head>
//       <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, Helvetica, sans-serif;">
//         <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
//           <tr>
//             <td align="center">
//               <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.1);">

//                 <!-- Header -->
//                 <tr>
//                   <td align="center" style="background:skyblue; color:white; padding:25px;">
//                     <h1 style="margin:0;">BookMyEvent</h1>
//                   </td>
//                 </tr>

//                 <!-- Content -->
//                 <tr>
//                   <td style="padding:40px;">
//                     <h2 style="color:#333;">Hello 👋</h2>

//                      <p style="font-size:16px; color:#555; line-height:1.6;">
//                       ${messageType ? "Thank you for registering with BookMyEvent!" : "You have requested to book an event with BookMyEvent."}
//                     </p>

//                     <p style="font-size:16px; color:#555; line-height:1.6;">
//                       We received a request to verify your email address.
//                       Please use the OTP below to continue.
//                     </p>

//                     <!-- OTP Box -->
//                     <div style="text-align:center; margin:35px 0;">
//                       <span style="
//                         display:inline-block;
//                         padding:18px 35px;
//                         background:#EEF2FF;
//                         border:2px dashed #4F46E5;
//                         border-radius:10px;
//                         font-size:34px;
//                         font-weight:bold;
//                         letter-spacing:8px;
//                         color:#4F46E5;
//                       ">
//                         ${otp}
//                       </span>
//                     </div>

//                     <p style="font-size:15px; color:#555;">
//                       This OTP is valid for <strong>10 minutes</strong>.
//                     </p>

//                     <p style="font-size:15px; color:#555;">
//                       If you didn't request this code, you can safely ignore this email.
//                     </p>

//                     <hr style="border:none; border-top:1px solid #eee; margin:30px 0;">

//                     <p style="font-size:13px; color:#888;">
//                       For security reasons, never share your OTP with anyone.
//                     </p>
//                   </td>
//                 </tr>

//                 <!-- Footer -->
//                 <tr>
//                   <td align="center" style="background:#f8f8f8; padding:20px; color:#888; font-size:13px;">
//                     © ${new Date().getFullYear()} BookMyEvent. All rights reserved.
//                   </td>
//                 </tr>

//               </table>
//             </td>
//           </tr>
//         </table>
//       </body>
//       </html>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent successfully");
//   } catch (error) {
//     console.error("Email sending failed:", error);
//     throw error;
//   }
// };

import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================================================
   BOOKING CONFIRMATION EMAIL
========================================================= */

export const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: `Booking Confirmation: ${eventTitle}`,

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Booking Confirmation</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f4f4f4;
            font-family:Arial, Helvetica, sans-serif;
          "
        >

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="padding:40px 0;"
          >

            <tr>
              <td align="center">

                <table
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background:#ffffff;
                    border-radius:10px;
                    overflow:hidden;
                    box-shadow:0 5px 15px rgba(0,0,0,0.1);
                  "
                >

                  <!-- HEADER -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background:skyblue;
                        color:white;
                        padding:25px;
                      "
                    >
                      <h1 style="margin:0;">
                        BookMyEvent
                      </h1>
                    </td>
                  </tr>

                  <!-- CONTENT -->
                  <tr>
                    <td style="padding:40px;">

                      <h2 style="color:#333;">
                        Booking Confirmed 🎉
                      </h2>

                      <p
                        style="
                          font-size:16px;
                          color:#555;
                          line-height:1.6;
                        "
                      >
                        Dear ${userName},
                      </p>

                      <p
                        style="
                          font-size:16px;
                          color:#555;
                          line-height:1.6;
                        "
                      >
                        Your booking for
                        <strong>${eventTitle}</strong>
                        has been successfully confirmed.
                      </p>

                      <div
                        style="
                          background:#EEF2FF;
                          padding:20px;
                          border-radius:10px;
                          margin:25px 0;
                        "
                      >
                        <p
                          style="
                            margin:0;
                            font-size:16px;
                            color:#333;
                          "
                        >
                          🎫 Event:
                          <strong>${eventTitle}</strong>
                        </p>
                      </div>

                      <p
                        style="
                          font-size:16px;
                          color:#555;
                          line-height:1.6;
                        "
                      >
                        Thank you for choosing BookMyEvent.
                      </p>

                      <hr
                        style="
                          border:none;
                          border-top:1px solid #eee;
                          margin:30px 0;
                        "
                      >

                      <p
                        style="
                          font-size:13px;
                          color:#888;
                        "
                      >
                        This is an automated email from BookMyEvent.
                        Please do not reply to this email.
                      </p>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background:#f8f8f8;
                        padding:20px;
                        color:#888;
                        font-size:13px;
                      "
                    >
                      © ${new Date().getFullYear()}
                      BookMyEvent. All rights reserved.
                    </td>
                  </tr>

                </table>

              </td>
            </tr>

          </table>

        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Booking email error:", error);
      throw error;
    }

    console.log("Booking email sent successfully:", data);

    return data;
  } catch (error) {
    console.error("Booking email sending failed:", error);

    throw error;
  }
};

/* =========================================================
   OTP EMAIL
========================================================= */

export const sendOtpEmail = async (email, otp, type) => {
  try {
    const messageType = type === "account-verification";

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,

      to: email,

      subject: "Your BookMyEvent OTP Verification Code",

      html: `
        <!DOCTYPE html>
        <html>

        <head>
          <meta charset="UTF-8">
          <title>OTP Verification</title>
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f4f4f4;
            font-family:Arial, Helvetica, sans-serif;
          "
        >

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="padding:40px 0;"
          >

            <tr>

              <td align="center">

                <table
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background:#ffffff;
                    border-radius:10px;
                    overflow:hidden;
                    box-shadow:0 5px 15px rgba(0,0,0,0.1);
                  "
                >

                  <!-- HEADER -->

                  <tr>

                    <td
                      align="center"
                      style="
                        background:skyblue;
                        color:white;
                        padding:25px;
                      "
                    >

                      <h1 style="margin:0;">
                        BookMyEvent
                      </h1>

                    </td>

                  </tr>


                  <!-- CONTENT -->

                  <tr>

                    <td style="padding:40px;">

                      <h2 style="color:#333;">
                        Hello 👋
                      </h2>


                      <p
                        style="
                          font-size:16px;
                          color:#555;
                          line-height:1.6;
                        "
                      >

                        ${
                          messageType
                            ? "Thank you for registering with BookMyEvent!"
                            : "You have requested to book an event with BookMyEvent."
                        }

                      </p>


                      <p
                        style="
                          font-size:16px;
                          color:#555;
                          line-height:1.6;
                        "
                      >

                        We received a request to verify
                        your email address.

                        Please use the OTP below
                        to continue.

                      </p>


                      <!-- OTP BOX -->

                      <div
                        style="
                          text-align:center;
                          margin:35px 0;
                        "
                      >

                        <span
                          style="
                            display:inline-block;
                            padding:18px 35px;
                            background:#EEF2FF;
                            border:2px dashed #4F46E5;
                            border-radius:10px;
                            font-size:34px;
                            font-weight:bold;
                            letter-spacing:8px;
                            color:#4F46E5;
                          "
                        >

                          ${otp}

                        </span>

                      </div>


                      <p
                        style="
                          font-size:15px;
                          color:#555;
                        "
                      >

                        This OTP is valid for
                        <strong>10 minutes</strong>.

                      </p>


                      <p
                        style="
                          font-size:15px;
                          color:#555;
                        "
                      >

                        If you didn't request this code,
                        you can safely ignore this email.

                      </p>


                      <hr
                        style="
                          border:none;
                          border-top:1px solid #eee;
                          margin:30px 0;
                        "
                      >


                      <p
                        style="
                          font-size:13px;
                          color:#888;
                        "
                      >

                        For security reasons,
                        never share your OTP with anyone.

                      </p>

                    </td>

                  </tr>


                  <!-- FOOTER -->

                  <tr>

                    <td
                      align="center"
                      style="
                        background:#f8f8f8;
                        padding:20px;
                        color:#888;
                        font-size:13px;
                      "
                    >

                      © ${new Date().getFullYear()}
                      BookMyEvent.
                      All rights reserved.

                    </td>

                  </tr>

                </table>

              </td>

            </tr>

          </table>

        </body>

        </html>
      `,
    });

    if (error) {
      console.error("OTP email error:", error);

      throw error;
    }

    console.log("OTP email sent successfully:", data);

    return data;
  } catch (error) {
    console.error("OTP email sending failed:", error);

    throw error;
  }
};
