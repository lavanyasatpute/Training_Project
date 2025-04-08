// utils/pdfGenerator.js
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const qrcode = require('qrcode');

exports.generateTicketPDF = async (ticket:any) => {
  const tempPath = path.join(__dirname, '../temp', `ticket-${ticket.id}.pdf`);
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream(tempPath);

  const qrCodeDataUrl = await qrcode.toDataURL(JSON.stringify({
    id: ticket.id,
    eventId: ticket.Event.id,
    userId: ticket.userId,
    ticketType: ticket.TicketType
  }));

  doc.pipe(stream);

  doc.fontSize(20).text('Event Ticket', { align: 'center' });
  doc.moveDown();
  doc.text(`Event: ${ticket.Event.Title}`);
  doc.text(`Date: ${new Date(ticket.Event.Schedule).toLocaleString()}`);
  doc.text(`Location: ${ticket.Event.Location}`);
  doc.text(`Ticket Type: ${ticket.TicketType}`);
  doc.text(`Seat: ${ticket.seatNumber || 'Not Assigned'}`);
  doc.text(`Price: ₹${ticket.Price}`);
  doc.image(qrCodeDataUrl, 400, 200, { width: 150 });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(tempPath));
    stream.on('error', reject);
  });
};
