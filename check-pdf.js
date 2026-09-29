import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function checkPdf(filename) {
  const existingPdfBytes = fs.readFileSync(filename);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  console.log(`Fields in ${filename}:`);
  fields.forEach(field => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${type}: ${name}`);
  });
  if (fields.length === 0) {
    console.log('No form fields found.');
  }
}

checkPdf('TEMPLATE-SPH.pdf');
checkPdf('TEMPLATE-INVOICE.pdf');
