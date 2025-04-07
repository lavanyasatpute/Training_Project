import { AppDataSource } from "../config/data-source";
import { AppError } from "../utils/appError";

// services/ticket.service.js
import {Ticket} from '../entities/Ticket';
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
    if (!ticket) throw new AppError('Ticket not found',400);

    const pdfPath = await generateTicketPDF(ticket);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Your Ticket for ${ticket.Event.Title}`,
        html: `
      <h2 style="color:#4f46e5;">Your Event Ticket</h2>
      <p><strong>Event:</strong> ${ticket.Event.Title}</p>
      <p><strong>Date:</strong> ${new Date(ticket.Event.Schedule).toLocaleString()}</p>
      <p><strong>Location:</strong> ${ticket.Event.Location}</p>
      <p><strong>Type:</strong> ${ticket.TicketType}</p>
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