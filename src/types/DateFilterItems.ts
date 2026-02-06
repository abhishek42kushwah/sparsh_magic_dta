import { errorToast } from '@/utils/toastMassage';

export const DateItem = ['Today', 'This Week', 'Last Week', 'This Month', 'Last Month', 'Last Three Months', 'This Year'];

export const getDateRange = (range: string) => {
  const today = new Date();
  let startDate, endDate;

  switch (range) {
    case 'Today':
      startDate = endDate = today.toISOString().split('T')[0];
      break;
    case 'This Week':
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      startDate = firstDayOfWeek.toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
    case 'Yesterday':
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = yesterday.toISOString().split('T')[0];
      endDate = yesterday.toISOString().split('T')[0];
      break;
    case 'Last Week':
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
      startDate = lastWeekStart.toISOString().split('T')[0];
      endDate = lastWeekEnd.toISOString().split('T')[0];
      break;
    case 'Last Month':
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
      endDate = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
      break;
    case 'This Month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
    case 'This Year':
      startDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
    case 'Last Three Months':
      startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
      break;
    default:
      startDate = endDate = '';
  }
  return { startDate, endDate };
};

export const exportDataToCSV = (
  origin: any,
  selectedRange: string | { type: string; startDate: string; endDate: string },
  name: string
) => {
  if (origin.length === 0) {
    errorToast(`No ${name} available to export.`);
    return;
  }

  let startDate: string;
  let endDate: string;
  let rangeType: string;


  if (typeof selectedRange === 'string') {
    rangeType = selectedRange;
    const dateRange = getDateRange(selectedRange);
    startDate = dateRange.startDate;
    endDate = dateRange.endDate;
  } else {
    rangeType = selectedRange.type;
    if (selectedRange.type === 'Custom' && selectedRange.startDate && selectedRange.endDate) {
      startDate = selectedRange.startDate;
      endDate = selectedRange.endDate;
    } else {
      const dateRange = getDateRange(selectedRange.type);
      startDate = dateRange.startDate;
      endDate = dateRange.endDate;
    }
  }


  const csvHeaders = Object.keys(origin[0]).join(',') + '\n';
  const csvRows = origin.map((row: any) => Object.values(row).join(',')).join('\n');

 
  const dateRangeInfo = `Date Range,${rangeType}\nStart Date,${startDate}\nEnd Date,${endDate}\n\n`;
  const csvContent = 'data:text/csv;charset=utf-8,' + dateRangeInfo + csvHeaders + csvRows;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');

  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${name}_${startDate}_to_${endDate}.csv`);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatDateTime = (dateString: string | null) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' });
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });
  const formattedTime = timeFormatter.format(date);
  return `${formattedDate} ${formattedTime}`;
};

export const formatDateTimeIST = (utcDate: string | null) => {
  if (!utcDate) return '-';
  const date = new Date(utcDate);
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const numberToWords = (amount: number): string => {
  const a = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const numToWords = (num: number): string => {
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
    if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + numToWords(num % 100) : '');
    if (num < 100000) return numToWords(Math.floor(num / 1000)) + ' Thousand ' + (num % 1000 ? numToWords(num % 1000) : '');
    if (num < 10000000) return numToWords(Math.floor(num / 100000)) + ' Lakh ' + (num % 100000 ? numToWords(num % 100000) : '');
    return numToWords(Math.floor(num / 10000000)) + ' Crore ' + (num % 10000000 ? numToWords(num % 10000000) : '');
  };

  const [rupees, paise] = amount.toFixed(2).split('.').map(Number);
  let words = '';

  if (rupees > 0) words += numToWords(rupees) + ' Rupees';
  if (paise > 0) words += ' and ' + numToWords(paise) + ' Paise';
  return words ? words + ' Only' : '';
};
