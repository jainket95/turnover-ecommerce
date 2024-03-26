import nodemailer from 'nodemailer';

// Function to send an email with the verification code
export const sendVerificationEmail = async (
	email: string,
	verificationCode: string
): Promise<void> => {
	// Create a transporter object using SMTP transport
	// const transporter = nodemailer.createTransport({
	// 	host: 'smtp.example.com', // Replace with your SMTP host
	// 	port: 587, // Replace with your SMTP port
	// 	secure: false, // True for 465, false for other ports
	// });

	// Configure the transporter
	nodemailer.createTestAccount((err, account) => {
		const transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		// This part goes in your signup success callback
		const mailOptions = {
			from: `Ecommerce <turnoverecommerce@yopmail.com>`,
			to: email,
			subject: 'Verification Code',
			text: `Your verification code is: ${verificationCode}`,
			html: `<b>Your verification code is: ${verificationCode}</b>`,
		};

		// Send the email
		try {
			(async function () {
				const info = await transporter.sendMail(mailOptions);
				console.log('Message sent: %s', info.messageId);
				console.log(
					'Preview URL: %s',
					nodemailer.getTestMessageUrl(info)
				);
			})().catch((error) => {
				console.error('Error sending email:', error);
			});
		} catch (error) {
			console.error('Error sending email:', error);
		}
	});
};

// transporter.sendMail(mailOptions, (error, info) => {
// 	if (error) {
// 		 return console.log(error);
// 	}
// 	console.log('Message sent: %s', info.messageId);
// });

// Usage example
// sendVerificationEmail('recipient@example.com').then(() => {
// 	console.log('Verification email sent');
// });
