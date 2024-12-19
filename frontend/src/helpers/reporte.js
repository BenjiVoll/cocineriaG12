import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateAsistenciaReport = (asistenciaData, personalName) => {
    const doc = new jsPDF();

   
    doc.setFontSize(18);
    doc.text(`Informe de Asistencia para ${personalName}`, 14, 22);

   
    doc.setFontSize(12);
    doc.text(`Generado en: ${new Date().toLocaleDateString()}`, 14, 32);

   
    const tableColumn = ["Fecha", "Estado", "Justificativo"];
    const tableRows = [];

    asistenciaData.forEach(record => {
        const rowData = [
            record.fecha,
            record.estado,
            record.justificativo || 'N/A',
        ];
        tableRows.push(rowData);
    });

  
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: {
            fillColor: [22, 160, 133],
            textColor: [255, 255, 255],
            fontSize: 12,
        },
        bodyStyles: {
            fillColor: [238, 238, 238],
            textColor: [0, 0, 0],
            fontSize: 10,
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255]
        },
    });

    
    doc.setFontSize(10);
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    doc.save(`informe_asistencia_${personalName}.pdf`);
};
