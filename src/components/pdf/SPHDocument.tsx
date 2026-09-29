import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

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
  headerImage: {
    width: 200,
    height: 60,
    objectFit: 'contain',
    marginBottom: 20,
    marginLeft: -15, // Align with text better if logo has whitespace
  },
  metaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metaLeft: {
    flexDirection: 'column',
    width: '60%',
  },
  metaRight: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 200,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    width: 70,
  },
  value: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  introText: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  colNo: { width: '5%', borderRightWidth: 1, borderRightColor: '#000', padding: 5, textAlign: 'center' },
  colDesign: { width: '45%', borderRightWidth: 1, borderRightColor: '#000', padding: 5 },
  colQty: { width: '15%', borderRightWidth: 1, borderRightColor: '#000', padding: 5, textAlign: 'center' },
  colPrice: { width: '15%', borderRightWidth: 1, borderRightColor: '#000', padding: 5, textAlign: 'right' },
  colTotal: { width: '20%', padding: 5, textAlign: 'right' },
  
  ul: {
    marginLeft: 10,
    marginBottom: 10,
  },
  li: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  signatureSection: {
    marginTop: 30,
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
  bankTable: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 5,
    marginBottom: 15,
  },
  bankLeft: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  bankRight: {
    flex: 1,
    padding: 5,
  },
  timeTable: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 5,
    marginBottom: 15,
  },
  timeRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  timeLastRow: {
    flexDirection: 'row',
  },
  timeColLeft: {
    width: '60%',
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  timeColRight: {
    width: '40%',
    padding: 5,
  },
});

export interface SPHItem {
  name: string;
  qty: number;
  price: number;
  subtotal: number;
  specs?: string[];
  hasAttachment?: boolean;
}

export interface AttachmentData {
  url: string;
  description: string;
}

export interface SPHData {
  customerName: string;
  customerCompany?: string;
  customerPhone?: string;
  customerDomicile?: string;
  date: string;
  docNumber: string;
  items: SPHItem[];
  total: number;
  shippingCost?: number;
  taxDiscount?: number;
  taxAmount?: number;
  paymentType?: 'FULL' | 'DP_70' | 'LUNAS_30';
  attachments?: AttachmentData[];
  logoPath: string;
  signaturePath: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

export const SPHDocument: React.FC<{ data: SPHData }> = ({ data }) => {
  const companyTarget = data.customerCompany || data.customerName;

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

        <Image src={data.logoPath} style={styles.headerImage} />

        <View style={styles.metaHeader}>
          <View style={styles.metaLeft}>
            <View style={styles.row}><Text style={styles.label}>Nomor</Text><Text style={styles.value}>: {data.docNumber}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Lampiran</Text><Text style={styles.value}>: {data.attachments && data.attachments.length > 0 ? `${data.attachments.length} Berkas` : '-'}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Perihal</Text><Text style={styles.value}>: Penawaran Harga Produksi</Text></View>
          </View>
          <View style={[styles.metaRight, { paddingLeft: 40 }]}>
            <Text style={styles.bold}>Jakarta, {data.date}</Text>
            <View style={{ marginTop: 30 }}>
              <Text>Kepada:</Text>
              <Text>Yth. <Text style={styles.bold}>{data.customerName}</Text></Text>
              {data.customerCompany && <Text style={styles.bold}>{data.customerCompany}</Text>}
              <Text>di</Text>
              <Text style={{ textDecoration: 'underline' }}>Tempat</Text>
            </View>
          </View>
        </View>

        <Text style={styles.introText}>Dengan hormat,</Text>
        <Text style={styles.introText}>
          Berdasarkan informasi yang kami terima bahwa {companyTarget} membutuhkan vendor untuk produksi pakaian custom. Melalui surat ini, kami CITILEX ASIA bermaksud menawarkan harga dalam hal produksi pakaian tersebut. Penawaran produksi terkait spesifikasi dan harga tercantum dalam tabel sebagai berikut:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colNo}>No</Text>
            <Text style={styles.colDesign}>Spesifikasi</Text>
            <Text style={styles.colQty}>Size & Qty</Text>
            <Text style={styles.colPrice}>Harga/pcs</Text>
            <Text style={styles.colTotal}>TOTAL</Text>
          </View>

          {data.items.map((item, i) => (
            <View key={i} style={[styles.tableRow, i === data.items.length - 1 ? { borderBottomWidth: 0 } : {}]}>
              <Text style={styles.colNo}>{i + 1}</Text>
              <View style={styles.colDesign}>
                <Text style={styles.bold}>{item.name}</Text>
                {item.specs && item.specs.length > 0 && (
                  <View style={{ marginTop: 5 }}>
                    {item.specs.map((spec, idx) => (
                      <Text key={idx} style={{ fontSize: 9, color: '#333' }}>• {spec}</Text>
                    ))}
                  </View>
                )}
                {item.hasAttachment && (
                  <Text style={{ fontSize: 9, color: '#666', marginTop: 5, fontStyle: 'italic' }}>(Desain Terlampir)</Text>
                )}
              </View>
              <Text style={styles.colQty}>{item.qty} pcs</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.price)}</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.subtotal)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Keterangan :</Text>
        <View style={styles.ul}>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Harga normal khusus size S-XL, jika terdapat size diatas XL maka ada tambahan 5.000 per pcs per kenaikan size.</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Harga untuk lengan pendek jika lengan panjang terdapat tambahan Rp10.000 per pcs</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Harga belum termasuk ongkir</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Harga sudah termasuk packaging plastik OPP</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Garansi yang Kami tawarkan :</Text>
        <View style={styles.ul}>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Free Sampling / Proofing setelah DP</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Garansi ganti produk baru jika terdapat produk yang error/tidak sesuai kesepakatan</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Ketentuan pembayaran dan produksi :</Text>
        <View style={styles.ul}>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Melakukan Down Payment (DP) sebesar 70% dari total pemesanan.</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Setelah DP dibayarkan, CITILEX ASIA memberikan Form Approval yang berisi semua detail kesepakatan.</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Pelunasan sebesar 30% dari total pemesanan dapat dilakukan setelah produk selesai diproduksi.</Text></View>
        </View>

        {/* This will likely push to next page depending on content length, which is fine */}
        <Text style={styles.sectionTitle} break>Jangka Waktu Pembuatan :</Text>
        <View style={styles.timeTable}>
          <View style={styles.timeRow}><Text style={styles.timeColLeft}>1. Desain & Approve</Text><Text style={styles.timeColRight}>1-2 hari</Text></View>
          <View style={styles.timeRow}><Text style={styles.timeColLeft}>2. Pembelian Bahan</Text><Text style={styles.timeColRight}>2-3 hari</Text></View>
          <View style={styles.timeRow}><Text style={styles.timeColLeft}>3. Pengiriman Sampel ke Klien</Text><Text style={styles.timeColRight}>2-3 hari</Text></View>
          <View style={styles.timeRow}><Text style={styles.timeColLeft}>4. Produksi dan finishing (Jahit, QC)</Text><Text style={styles.timeColRight}>Sesuai Antrean Produksi</Text></View>
          <View style={styles.timeRow}><Text style={styles.timeColLeft}>5. Pengiriman reguler</Text><Text style={styles.timeColRight}>3-5 hari</Text></View>
          <View style={styles.timeLastRow}>
            <Text style={[styles.timeColLeft, styles.bold]}>TOTAL LAMA PRODUKSI</Text>
            <Text style={[styles.timeColRight, styles.bold]}>Estimasi 2-4 Minggu</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Detail Pengemasan Produk :</Text>
        <View style={styles.ul}>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Pengemasan dikemas per pcs dan dikelompokkan berdasarkan ukuran, menggunakan plastik OPP standar.</Text></View>
          <View style={styles.li}><Text style={styles.bullet}>•</Text><Text style={styles.value}>Packaging custom (box, pouch, kertas kraft, logo khusus) tersedia dengan penyesuaian biaya dan waktu produksi.</Text></View>
        </View>

        <Text style={styles.sectionTitle}>No Rekening Tujuan Pembayaran :</Text>
        <View style={styles.bankTable}>
          <Text style={styles.bankLeft}>Mandiri a.n. Zipzap Corporation</Text>
          <Text style={styles.bankRight}>137-00-2472377-3</Text>
        </View>

        <Text style={styles.introText}>
          Kami bersedia untuk melakukan presentasi terkait detail penawaran meliputi proses produksi, detail spesifikasi, benefit, dan sampling produk jika diperlukan.
        </Text>
        <Text style={styles.introText}>
          Demikian penawaran ini kami sampaikan. Kami sangat berharap dapat menjalin kerja sama yang baik dengan <Text style={styles.bold}>{companyTarget}</Text>. Apabila ada pertanyaan lebih lanjut, silakan menghubungi kami. Atas perhatiannya kami ucapkan terimakasih.
        </Text>

        <View style={styles.signatureSection} wrap={false}>
          <View style={styles.signatureBox}>
            <Text>Hormat kami,</Text>
            <Image src={data.signaturePath} style={styles.signatureImage} />
            <Text style={[styles.bold, { textDecoration: 'underline' }]}>Zaka Anshori</Text>
            <Text>Sales & Marketing Manager</Text>
            <Text>CITILEX ASIA</Text>
          </View>
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
        </Page>
      ))}
    </Document>
  );
};
