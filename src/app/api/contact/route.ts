// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import Mail from 'nodemailer/lib/mailer';

// /**
//  * This is an example of API... could be use but it requires less secure apps.
//  *
//  * @param request
//  * @returns
//  */
// export async function POST(request: NextRequest) {
//   const { email, name, message } = await request.json();

//   const transport = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     /*
//       setting service as 'gmail' is same as providing these setings:
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true
//       If you want to use a different email provider other than gmail, you need to provide these manually.
//       Or you can go use these well known services and their settings at
//       https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
//   */
//     auth: {
//       user: process.env.REACT_APP_EMAIL,
//       pass: process.env.REACT_APP_PASSWORD,
//     },
//   });

//   const mailOptions: Mail.Options = {
//     from: process.env.REACT_APP_EMAIL,
//     to: process.env.REACT_APP_PASSWORD,
//     // cc: email, (uncomment this line if you want to send a copy to the sender)
//     subject: `Message from ${name} (${email})`,
//     text: message,
//   };

//   const sendMailPromise = () =>
//     new Promise<string>((resolve, reject) => {
//       transport.sendMail(mailOptions, function (err) {
//         if (!err) {
//           resolve('Email sent');
//         } else {
//           console.log(err);
//           reject(err.message);
//         }
//       });
//     });

//   try {
//     await sendMailPromise();
//     return NextResponse.json({ message: 'Email sent' });
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 500 });
//   }
// }
