import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportToPDFButton = ({ columns, data, fileName = 'export.pdf', title = 'Exported Table' }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);

    autoTable(doc, {
      head: [columns],
      body: data,
      startY: 25,
      styles: { fontSize: 10 }
    });

    doc.save(fileName);
  };

  return (
    <button
      onClick={handleExport}
      style={{
        backgroundColor: '#3366ff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '1.5rem'
      }}
    >
      Export to PDF
    </button>
  );
};

export default ExportToPDFButton;
