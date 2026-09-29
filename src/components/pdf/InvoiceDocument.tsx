import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { SPHData } from './SPHDocument';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Oblique.ttf', fontStyle: 'italic' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-BoldOblique.ttf', fontWeight: 'bold', fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    paddingBottom: 80,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerImage: {
    width: 150,
    height: 45,
    objectFit: 'contain',
    marginLeft: -10,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: 9,
    color: '#475569',
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  metaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metaLeft: {
    flexDirection: 'column',
    width: '50%',
  },
  metaRight: {
    flexDirection: 'column',
    width: '50%',
  },
  labelTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginBottom: 0,
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    fontWeight: 'bold',
    color: '#334155',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  colItem: { width: '40%', padding: 8 },
  colQty: { width: '15%', padding: 8, textAlign: 'center' },
  colPrice: { width: '20%', padding: 8, textAlign: 'right' },
  colTotal: { width: '25%', padding: 8, textAlign: 'right' },
  
  summaryBox: {
    alignSelf: 'flex-end',
    width: '70%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: '#334155',
    borderBottomWidth: 0,
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 12,
  },
  summaryLabel: {
    color: '#64748b',
  },
  summaryValue: {
    fontWeight: 'bold',
  },

  bankBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '50%',
  },
  bankTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#334155',
  },
  
  signatureSection: {
    marginTop: 40,
    alignItems: 'flex-end',
    width: '100%',
  },
  signatureBox: {
    width: 150,
    alignItems: 'center',
  },
  signatureImage: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginVertical: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 7,
    color: '#64748b',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

export const InvoiceDocument: React.FC<{ data: SPHData }> = ({ data }) => {
  const total = data.total;
  const ongkir = data.shippingCost || 0;
  const discount = data.taxDiscount || 0;
  const tax = data.taxAmount || 0;
  const baseGrandTotal = total + ongkir - discount - tax;

  let grandTotal = baseGrandTotal;
  let title = "INVOICE";
  
  if (data.paymentType === 'DP_70') {
    title = "INVOICE - DOWN PAYMENT (70%)";
    grandTotal = baseGrandTotal * 0.7;
  } else if (data.paymentType === 'LUNAS_30') {
    title = "INVOICE - PELUNASAN (30%)";
    grandTotal = baseGrandTotal * 0.3;
  }

  const downPaymentInfo = baseGrandTotal * 0.7; // 70% DP
  const remainingInfo = baseGrandTotal - downPaymentInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* FIXED HEADER FOR ALL PAGES (Acts as top padding) */}
        <View fixed style={{ height: 60, paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Image src={data.logoPath} style={{ width: 70 }} />
        </View>

        <Text fixed render={({ pageNumber }) => `Page ${pageNumber}`} style={{ position: 'absolute', top: 20, right: 50, fontSize: 9, color: '#64748b' }} />

        {/* MASK TO HIDE FIXED HEADER ON PAGE 1 */}
        <View style={{ position: 'absolute', top: 0, left: -50, right: -50, height: 60, backgroundColor: '#FFFFFF' }} />

        <View style={styles.headerContainer}>
          <Image src={data.logoPath} style={styles.headerImage} />
          <View style={styles.headerRight}>
            <Text>Jakarta, Indonesia</Text>
            <Text>0813-2927-1515</Text>
            <Text>behagroup@gmail.com</Text>
            <Text>https://citilex.asia</Text>
          </View>
        </View>
        <Text style={styles.invoiceTitle}>{title}</Text>

        <View style={styles.metaHeader}>
          <View style={styles.metaLeft}>
            <Text style={styles.labelTitle}>Billed To:</Text>
            <Text style={styles.bold}>{data.customerName}</Text>
            {data.customerCompany && <Text>{data.customerCompany}</Text>}
            {data.customerDomicile && <Text>{data.customerDomicile}</Text>}
            {data.customerPhone && <Text>{data.customerPhone}</Text>}
          </View>
          <View style={[styles.metaRight, { alignItems: 'flex-end' }]}>
            <View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ width: 60, color: '#64748b', textAlign: 'right', marginRight: 10 }}>Invoice No:</Text>
                <Text style={styles.bold}>{data.docNumber}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{ width: 60, color: '#64748b', textAlign: 'right', marginRight: 10 }}>Date:</Text>
                <Text style={styles.bold}>{data.date}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colItem}>SPESIFIKASI</Text>
            <Text style={styles.colQty}>QUANTITY</Text>
            <Text style={styles.colPrice}>UNIT PRICE</Text>
            <Text style={styles.colTotal}>SUBTOTAL</Text>
          </View>

          {data.items.map((item, i) => (
            <View key={i} style={[styles.tableRow, i === data.items.length - 1 ? { borderBottomWidth: 0 } : {}]}>
              <View style={styles.colItem}>
                <Text style={styles.bold}>{item.name}</Text>
                {item.specs && item.specs.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    {item.specs.map((spec, idx) => (
                      <Text key={idx} style={{ fontSize: 9, color: '#64748b' }}>{spec}</Text>
                    ))}
                  </View>
                )}
                {item.hasAttachment && (
                  <Text style={{ fontSize: 9, color: '#666', marginTop: 5, fontStyle: 'italic' }}>(Desain Terlampir)</Text>
                )}
              </View>
              <Text style={styles.colQty}>{item.qty}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.price)}</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.subtotal)}</Text>
            </View>
          ))}
        </View>

        {/* Spacer to prevent table stretching bug in react-pdf */}
        <View style={{ height: 20 }} />

        <View wrap={false}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatCurrency(total)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
              <Text style={styles.summaryValue}>{formatCurrency(ongkir)}</Text>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diskon / Potongan</Text>
                <Text style={[styles.summaryValue, { color: '#dc2626' }]}>- {formatCurrency(discount)}</Text>
              </View>
            )}
            {tax > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pajak</Text>
                <Text style={[styles.summaryValue, { color: '#dc2626' }]}>- {formatCurrency(tax)}</Text>
              </View>
            )}
            <View style={styles.summaryTotalRow}>
              <Text>Total Tagihan {data.paymentType === 'DP_70' ? '(DP 70%)' : data.paymentType === 'LUNAS_30' ? '(PELUNASAN 30%)' : ''}</Text>
              <Text>{formatCurrency(grandTotal)}</Text>
            </View>
            {(!data.paymentType || data.paymentType === 'FULL') && (
              <>
                <View style={[styles.summaryRow, { borderBottomWidth: 0, marginTop: 5 }]}>
                  <Text style={styles.summaryLabel}>Down Payment (70%)</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(downPaymentInfo)}</Text>
                </View>
                <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.summaryLabel}>Remaining Payment</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(remainingInfo)}</Text>
                </View>
              </>
            )}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 30 }}>
            <View style={[styles.bankBox, { marginTop: 0 }]}>
              <Text style={styles.bankTitle}>Payment Information</Text>
              <Text>Bank Mandiri</Text>
              <Text style={styles.bold}>137-00-2472377-3</Text>
              <Text>a.n. Zipzap Corporation</Text>
            </View>

            <View style={[styles.signatureSection, { marginTop: 0, width: 'auto' }]}>
              <View style={styles.signatureBox}>
                <Text>Marketing & Sales Manager</Text>
                <Image src={data.signaturePath} style={styles.signatureImage} />
                <Text style={[styles.bold, { textDecoration: 'underline' }]}>Zaka Anshori</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text><Text style={styles.bold}>REP. OFFICE</Text> Jl. Bintaro Tengah Blok J4 No. 12, Bintaro, Pesanggrahan, Jakarta Selatan, Indonesia</Text>
          <Text><Text style={styles.bold}>PRODUCTION CENTER</Text> Jl. Menayu Lor Plurugan No. 112, Tirtonirmolo, Kasihan, Bantul, DI Yogyakarta, Indonesia</Text>
        </View>
      </Page>

      {/* Render Attachments on subsequent pages */}
      {data.attachments && data.attachments.length > 0 && data.attachments.map((attachment, index) => (
        <Page key={`att-${index}`} size="A4" style={styles.page}>
          <View fixed style={{ height: 60, paddingTop: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Image src={data.logoPath} style={{ width: 70 }} />
          </View>
          <Text fixed render={({ pageNumber }) => `Page ${pageNumber}`} style={{ position: 'absolute', top: 20, right: 50, fontSize: 9, color: '#64748b' }} />

          <View style={{ alignItems: 'center', marginTop: 0 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 20 }}>Lampiran {index + 1}</Text>
            <Image src={attachment.url} style={{ width: 500, height: 500, objectFit: 'contain' }} />
            {attachment.description && (
              <Text style={{ marginTop: 20, fontSize: 12, textAlign: 'center' }}>
                Keterangan: {attachment.description}
              </Text>
            )}
          </View>

          <View style={{ position: 'absolute', bottom: 40, left: 50, right: 50, padding: 15, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>Catatan:</Text>
            <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#64748b' }}>
              "Membayar sama dengan menyetujui seluruh detail item termasuk desainnya"
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};
