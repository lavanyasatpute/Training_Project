// utils/pdfGenerator.js
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const qrcode = require('qrcode');

exports.generateTicketPDF = async (ticket:any) => {
  // console.log("From PDF utility: ", ticket.Event.Title);

  const tempPath = path.join(__dirname, '../temp', `ticket-${ticket.id}.pdf`);
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream(tempPath);

  // Generate QR code as Data URL and convert to Buffer
  const qrCodeDataUrl = await qrcode.toDataURL(JSON.stringify({
    id: ticket.id,
    Event: ticket.Event.Title,
    Ticket_Type: ticket.TicketType,
    Seat_number: ticket.seatNumber,
    date: ticket.Event.Schedule,
    Location: ticket.Event.Location,
    Description: ticket.Event.Description
  }));

  const qrCodeImageBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');

  doc.pipe(stream);

  // Header
  doc.fontSize(26).fillColor('#1a1a1a').text('🎟️ Event Ticket', { align: 'center' });
  doc.moveDown();

  // Ticket Box
  doc.roundedRect(50, 100, 500, 300, 10)
    .fillAndStroke('#f8f8f8', '#cccccc');

  doc.fillColor('#000').fontSize(14);
  doc.text(`Event: ${ticket.Event.Title}`, 70, 120);
  doc.text(`Date: ${new Date(ticket.Event.Schedule).toLocaleString()}`, 70, 150);
  doc.text(`Location: ${ticket.Event.Location}`, 70, 180);
  doc.text(`Ticket Type: ${ticket.TicketType}`, 70, 210);
  doc.text(`Seat: ${ticket.seatNumber || 'Not Assigned'}`, 70, 240);
  doc.text(`Price: ₹${ticket.Price}`, 70, 270);
  doc.text(`Description: ${ticket.Event.Description}`, 70, 300, { width: 350 });

 
  doc.image(qrCodeImageBuffer, 430, 180, { width: 100, height: 100 });

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(tempPath));
    stream.on('error', reject);
  });
};
