import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface WorkItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  category: 'work' | 'material';
}

interface ContractData {
  number: string;
  date: string;
  client: string;
  object: string;
  totalAmount: number;
  items: WorkItem[];
  terms: string;
}

interface EstimateData {
  number: string;
  date: string;
  client: string;
  object: string;
  items: WorkItem[];
  totalAmount: number;
}

interface ActData {
  number: string;
  date: string;
  estimateNumber: string;
  client: string;
  object: string;
  items: WorkItem[];
  totalAmount: number;
}

const addFont = (doc: jsPDF) => {
  doc.setFont('helvetica');
};

export const generateContract = (data: ContractData): void => {
  const doc = new jsPDF();
  addFont(doc);
  
  doc.setFontSize(18);
  doc.text('ДОГОВОР ПОДРЯДА', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`№ ${data.number} от ${new Date(data.date).toLocaleDateString('ru-RU')}`, 105, 30, { align: 'center' });
  
  doc.setFontSize(11);
  let y = 45;
  
  doc.text('Заказчик:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.text(data.client, 50, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  doc.text('Объект работ:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.text(data.object, 55, y);
  doc.setFont('helvetica', 'normal');
  y += 15;
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('1. ПРЕДМЕТ ДОГОВОРА', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  y += 10;
  
  const termsText = data.terms || 'Подрядчик обязуется выполнить ремонтные работы в соответствии со сметой, а Заказчик обязуется принять и оплатить выполненные работы.';
  const splitTerms = doc.splitTextToSize(termsText, 170);
  doc.text(splitTerms, 20, y);
  y += splitTerms.length * 7 + 10;
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('2. СМЕТА РАБОТ', 20, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  const workItems = data.items.filter(item => item.category === 'work');
  const materialItems = data.items.filter(item => item.category === 'material');
  
  const tableData: any[] = [];
  
  if (workItems.length > 0) {
    tableData.push([{ content: 'РАБОТЫ', colSpan: 5, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
    workItems.forEach((item, index) => {
      tableData.push([
        (index + 1).toString(),
        item.name,
        item.unit,
        item.quantity.toString(),
        `${item.price.toLocaleString('ru-RU')} ₽`,
        `${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`
      ]);
    });
  }
  
  if (materialItems.length > 0) {
    tableData.push([{ content: 'МАТЕРИАЛЫ', colSpan: 5, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
    materialItems.forEach((item, index) => {
      tableData.push([
        (index + 1).toString(),
        item.name,
        item.unit,
        item.quantity.toString(),
        `${item.price.toLocaleString('ru-RU')} ₽`,
        `${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`
      ]);
    });
  }
  
  autoTable(doc, {
    startY: y,
    head: [['№', 'Наименование', 'Ед.изм.', 'Кол-во', 'Цена', 'Сумма']],
    body: tableData,
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 70 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 }
    }
  });
  
  y = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`ИТОГО: ${data.totalAmount.toLocaleString('ru-RU')} ₽`, 140, y);
  doc.setFont('helvetica', 'normal');
  y += 15;
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('3. ПОРЯДОК ОПЛАТЫ', 20, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  y += 10;
  
  const paymentText = '3.1. Оплата производится в следующем порядке:\n- Аванс 40% от суммы договора\n- Окончательный расчет после подписания акта выполненных работ';
  const splitPayment = doc.splitTextToSize(paymentText, 170);
  doc.text(splitPayment, 20, y);
  y += splitPayment.length * 7 + 15;
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('4. ПОДПИСИ СТОРОН', 20, y);
  doc.setFont('helvetica', 'normal');
  y += 15;
  
  doc.setFontSize(11);
  doc.text('Заказчик:', 20, y);
  doc.text('_____________________', 20, y + 10);
  
  doc.text('Подрядчик:', 120, y);
  doc.text('_____________________', 120, y + 10);
  
  doc.save(`Договор_${data.number}.pdf`);
};

export const generateEstimatePDF = (data: EstimateData): void => {
  const doc = new jsPDF();
  addFont(doc);
  
  doc.setFontSize(18);
  doc.text('СМЕТА НА РЕМОНТНЫЕ РАБОТЫ', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`№ ${data.number} от ${new Date(data.date).toLocaleDateString('ru-RU')}`, 105, 30, { align: 'center' });
  
  doc.setFontSize(11);
  let y = 45;
  
  doc.text('Заказчик:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.text(data.client, 50, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  doc.text('Объект работ:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.text(data.object, 55, y);
  doc.setFont('helvetica', 'normal');
  y += 20;
  
  const workItems = data.items.filter(item => item.category === 'work');
  const materialItems = data.items.filter(item => item.category === 'material');
  
  const tableData: any[] = [];
  
  if (workItems.length > 0) {
    tableData.push([{ content: 'РАБОТЫ', colSpan: 6, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
    workItems.forEach((item, index) => {
      tableData.push([
        (index + 1).toString(),
        item.name,
        item.unit,
        item.quantity.toString(),
        `${item.price.toLocaleString('ru-RU')} ₽`,
        `${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`
      ]);
    });
  }
  
  if (materialItems.length > 0) {
    tableData.push([{ content: 'МАТЕРИАЛЫ', colSpan: 6, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
    materialItems.forEach((item, index) => {
      tableData.push([
        (index + 1).toString(),
        item.name,
        item.unit,
        item.quantity.toString(),
        `${item.price.toLocaleString('ru-RU')} ₽`,
        `${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`
      ]);
    });
  }
  
  autoTable(doc, {
    startY: y,
    head: [['№', 'Наименование работ/материалов', 'Ед.изм.', 'Кол-во', 'Цена', 'Сумма']],
    body: tableData,
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 70 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 }
    },
    foot: [[{ content: `ИТОГО: ${data.totalAmount.toLocaleString('ru-RU')} ₽`, colSpan: 6, styles: { fontStyle: 'bold', fontSize: 11, fillColor: [220, 220, 220] } }]]
  });
  
  y = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(11);
  doc.text('Составил: _____________________', 20, y);
  doc.text('Дата: ______________', 120, y);
  
  doc.save(`Смета_${data.number}.pdf`);
};

export const generateActPDF = (data: ActData): void => {
  const doc = new jsPDF();
  addFont(doc);
  
  doc.setFontSize(18);
  doc.text('АКТ ВЫПОЛНЕННЫХ РАБОТ', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`№ ${data.number} от ${new Date(data.date).toLocaleDateString('ru-RU')}`, 105, 30, { align: 'center' });
  doc.text(`По смете № ${data.estimateNumber}`, 105, 38, { align: 'center' });
  
  doc.setFontSize(11);
  let y = 50;
  
  doc.text('Заказчик:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.text(data.client, 50, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  doc.text('Объект работ:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.text(data.object, 55, y);
  doc.setFont('helvetica', 'normal');
  y += 20;
  
  const workItems = data.items.filter(item => item.category === 'work');
  const materialItems = data.items.filter(item => item.category === 'material');
  
  const tableData: any[] = [];
  
  if (workItems.length > 0) {
    tableData.push([{ content: 'ВЫПОЛНЕННЫЕ РАБОТЫ', colSpan: 6, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
    workItems.forEach((item, index) => {
      tableData.push([
        (index + 1).toString(),
        item.name,
        item.unit,
        item.quantity.toString(),
        `${item.price.toLocaleString('ru-RU')} ₽`,
        `${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`
      ]);
    });
  }
  
  if (materialItems.length > 0) {
    tableData.push([{ content: 'ИСПОЛЬЗОВАННЫЕ МАТЕРИАЛЫ', colSpan: 6, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }]);
    materialItems.forEach((item, index) => {
      tableData.push([
        (index + 1).toString(),
        item.name,
        item.unit,
        item.quantity.toString(),
        `${item.price.toLocaleString('ru-RU')} ₽`,
        `${(item.quantity * item.price).toLocaleString('ru-RU')} ₽`
      ]);
    });
  }
  
  autoTable(doc, {
    startY: y,
    head: [['№', 'Наименование', 'Ед.изм.', 'Кол-во', 'Цена', 'Сумма']],
    body: tableData,
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 70 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 30 }
    },
    foot: [[{ content: `ИТОГО ВЫПОЛНЕНО РАБОТ НА СУММУ: ${data.totalAmount.toLocaleString('ru-RU')} ₽`, colSpan: 6, styles: { fontStyle: 'bold', fontSize: 11, fillColor: [220, 220, 220] } }]]
  });
  
  y = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(11);
  const conclusion = 'Работы выполнены полностью и в срок. Заказчик претензий по объему, качеству и срокам выполнения работ не имеет.';
  const splitConclusion = doc.splitTextToSize(conclusion, 170);
  doc.text(splitConclusion, 20, y);
  y += splitConclusion.length * 7 + 15;
  
  doc.text('Заказчик:', 20, y);
  doc.text('_____________________', 20, y + 10);
  
  doc.text('Подрядчик:', 120, y);
  doc.text('_____________________', 120, y + 10);
  
  doc.save(`Акт_${data.number}.pdf`);
};
