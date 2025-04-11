import { AppDataSource } from "../config/data-source";
import { AppError } from "../utils/appError";

// services/ticket.service.js
import { Ticket } from '../entities/Ticket';
const Event = require('../entities/event');
const { generateTicketPDF } = require('../utils/pdf.utility');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const ticketRepository = AppDataSource.getRepository(Ticket)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS);

exports.sendTicketToEmail = async (ticketId: any, email: string) => {
    const ticket = await ticketRepository.findOne({
        where: { TicketID: ticketId },
        relations: ['Event'] // Make sure Event relation is properly named in your entity
    });
    if (!ticket) throw new AppError('Ticket not found', 400);

    const pdfPath = await generateTicketPDF(ticket);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Your Ticket for ${ticket.Event.Title}`,
        html: `
     <div style="
  max-width: 600px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background: linear-gradient(145deg, #ffffff, #f0f0ff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
">
  <h2 style="
    text-align: center;
    color: #4f46e5;
    font-size: 28px;
    margin-bottom: 10px;
  ">
    🎫 Your ${ticket.TicketType} Event Ticket
  </h2>
  
  <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">

  <p style="font-size: 18px; margin-bottom: 8px;">
    <strong style="color: #111;">🎤 Event:</strong> <span style="color: #4f46e5;">${ticket.Event.Title}</span>
  </p>
  
  <p style="font-size: 16px; margin-bottom: 6px;">
    <strong>📅 Date:</strong> ${new Date(ticket.Event.Schedule).toLocaleString()}
  </p>
  
  <p style="font-size: 16px; margin-bottom: 6px;">
    <strong>📍 Location:</strong> ${ticket.Event.Location}
  </p>

  <p style="font-size: 16px; margin-bottom: 6px;">
    <strong>🎟️ Ticket Type:</strong> ${ticket.TicketType}
  </p>

  <p style="font-size: 16px; margin-bottom: 6px;">
    <strong>💺 Seat:</strong> ${ticket.seatNumber || 'Not Assigned'}
  </p>

  <p style="font-size: 16px; margin-bottom: 6px;">
    <strong>💰 Price:</strong> ₹${ticket.Price}
  </p>

  <div style="
    margin-top: 30px;
    text-align: center;
  ">
    <p style="font-size: 14px; color: #777;">Show this ticket at the entry</p>
    <div style="
      margin-top: 10px;
      padding: 10px;
      background-color: #fff;
      border: 1px dashed #aaa;
      display: inline-block;
    ">
      <strong style="font-size: 18px;">Ticket ID:</strong><br>
      <code style="font-size: 16px; color: #4f46e5;">${ticket.TicketID}</code>
    </div>
  </div>
</div>

    `,
        attachments: [
            {
                filename: `ticket-${ticket.TicketID}.pdf`,
                path: pdfPath,
                contentType: 'application/pdf'
            }
        ]
    };

    await transporter.sendMail(mailOptions);
    fs.unlinkSync(pdfPath); // cleanup

    return 'Ticket sent successfully';
};


export { }