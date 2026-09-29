import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { SPHDocument, SPHData } from '@/src/components/pdf/SPHDocument';
import { InvoiceDocument } from '@/src/components/pdf/InvoiceDocument';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json({ error: 'Missing type or payload' }, { status: 400 });
    }

    let logoPath = '';
    let signaturePath = '';
    try {
      const logoBuffer = fs.readFileSync(path.join(process.cwd(), 'public/app/logo-kop.png'));
      logoPath = `data:image/png;base64,${logoBuffer.toString('base64')}`;
      
      const sigBuffer = fs.readFileSync(path.join(process.cwd(), 'public/app/ttd-sales-and-marketing-manager.png'));
      signaturePath = `data:image/png;base64,${sigBuffer.toString('base64')}`;
    } catch (e) {
      console.warn("Failed to load local images", e);
    }

    // Process attachments to Buffer for React PDF
    let processedAttachments = payload.attachments || [];
    processedAttachments = processedAttachments.map((att: any) => {
      if (typeof att.url === 'string' && att.url.startsWith('data:image')) {
        const parts = att.url.split(',');
        if (parts.length === 2) {
          const header = parts[0];
          const base64Data = parts[1];
          const format = header.includes('jpeg') || header.includes('jpg') ? 'jpg' : 'png';
          return {
            ...att,
            url: { data: Buffer.from(base64Data, 'base64'), format }
          };
        }
      }
      return att;
    });

    const data: SPHData = {
      ...payload,
      attachments: processedAttachments,
      logoPath,
      signaturePath,
    };

    let stream;

    if (type === 'sph') {
      stream = await renderToStream(<SPHDocument data={data} />);
    } else if (type === 'invoice') {
      stream = await renderToStream(<InvoiceDocument data={data} />);
    } else {
      return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
    }

    // Convert NodeJS Readable stream to Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${type.toUpperCase()}_${data.docNumber || 'Document'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
