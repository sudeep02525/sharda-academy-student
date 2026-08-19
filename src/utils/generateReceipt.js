import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Helper to convert number to words
const numberToWords = (num) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : 'Only';
  return str;
};

export const generateReceiptPDF = (receipt, studentDetails) => {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // 1. Draw Border
  doc.setDrawColor(31, 58, 147); // Navy blue border
  doc.setLineWidth(1);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  doc.setLineWidth(0.3);
  doc.rect(7, 7, pageWidth - 14, pageHeight - 14);

  // 2. Draw Header Strip
  doc.setFillColor(31, 58, 147); // Professional Navy Blue
  doc.rect(7, 7, pageWidth - 14, 40, 'F');

  // Load Logo (Assuming /logo_cropped.png is accessible or we use text if image fails)
  // To avoid async image loading complexities in jsPDF without base64, we will use stylized text for the logo
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("SHARDA ACADEMY", 20, 25);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("123 Education Hub, Knowledge City, State - 400001", 20, 32);
  doc.text("Phone: +91 9876543210 | Email: info@shardaacademy.com", 20, 37);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("FEE RECEIPT", pageWidth - 65, 30);

  // 3. Receipt Info Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  
  doc.setFont("helvetica", "bold");
  doc.text(`Receipt No:`, 20, 60);
  doc.setFont("helvetica", "normal");
  doc.text(receipt.receiptNumber || 'N/A', 50, 60);

  doc.setFont("helvetica", "bold");
  doc.text(`Date:`, pageWidth - 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text(new Date(receipt.paymentDate).toLocaleDateString('en-IN'), pageWidth - 45, 60);

  doc.setDrawColor(200, 200, 200);
  doc.line(20, 65, pageWidth - 20, 65); // separator

  // 4. Student Details Section
  doc.setFont("helvetica", "bold");
  doc.text("Student Name:", 20, 75);
  doc.setFont("helvetica", "normal");
  doc.text(studentDetails.name || 'N/A', 55, 75);

  doc.setFont("helvetica", "bold");
  doc.text("Roll / ID:", pageWidth - 90, 75);
  doc.setFont("helvetica", "normal");
  doc.text(studentDetails.rollNumber || 'N/A', pageWidth - 60, 75);

  // 5. Transaction Table
  const tableData = [
    ["Total Fee Amount", `Rs. ${receipt.totalFee?.toLocaleString('en-IN')}`],
    ["Paid Till Now (Before this)", `Rs. ${(receipt.paidTillNow - receipt.amountPaid)?.toLocaleString('en-IN')}`],
    ["Amount Paid (This Transaction)", `Rs. ${receipt.amountPaid?.toLocaleString('en-IN')}`],
    ["Remaining Due Amount", `Rs. ${receipt.dueAmount?.toLocaleString('en-IN')}`],
    ["Payment Mode", receipt.paymentMode || 'N/A'],
    [receipt.paymentMode === 'Online' ? 'Transaction ID' : 'Collected By', receipt.paymentMode === 'Online' ? (receipt.transactionId || 'N/A') : (receipt.collectedBy || 'Admin')]
  ];

  doc.autoTable({
    startY: 90,
    margin: { left: 20, right: 20 },
    theme: 'grid',
    headStyles: { fillColor: [31, 58, 147], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 11, cellPadding: 6 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 100 },
      1: { cellWidth: 70 }
    },
    body: tableData
  });

  const finalY = doc.lastAutoTable.finalY || 160;

  // 6. Amount in words
  doc.setFont("helvetica", "bold");
  doc.text("Amount in Words:", 20, finalY + 15);
  doc.setFont("helvetica", "italic");
  doc.text(`${numberToWords(receipt.amountPaid)} Rupees Only`, 55, finalY + 15);

  // 7. Signature Line
  doc.setFont("helvetica", "normal");
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 70, finalY + 50, pageWidth - 20, finalY + 50);
  doc.text("Authorized Signatory", pageWidth - 65, finalY + 56);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text("Sharda Academy", pageWidth - 60, finalY + 61);

  // 8. Footer Strip
  doc.setFillColor(31, 58, 147);
  doc.rect(7, pageHeight - 27, pageWidth - 14, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Thank you for your payment. This is a computer generated receipt.", pageWidth / 2, pageHeight - 16, { align: "center" });

  // Save the PDF
  doc.save(`Receipt_${receipt.receiptNumber}.pdf`);
};
