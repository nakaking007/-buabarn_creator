const SHEET_NAME = 'licenses';

function doGet(e) {
  const key = String(e.parameter.key || '').trim();
  if (!key) {
    return json({ valid: false, message: 'กรุณาระบุ License Key' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return json({ valid: false, message: 'ไม่พบชีต licenses' });
  }

  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift().map(String);
  const keyIndex = headers.indexOf('licenseKey');
  if (keyIndex < 0) {
    return json({ valid: false, message: 'ไม่พบคอลัมน์ licenseKey' });
  }

  const found = rows.find(row => String(row[keyIndex]).trim() === key);
  if (!found) {
    return json({ valid: false, message: 'License Key ไม่ถูกต้อง' });
  }

  const record = toObject(headers, found);
  const active = String(record.active).toUpperCase() === 'TRUE';
  if (!active) {
    return json({ valid: false, message: 'License นี้ถูกปิดใช้งานแล้ว' });
  }

  const plan = String(record.plan || '').trim();
  if (plan === 'lifetime') {
    return json({
      valid: true,
      plan: 'lifetime',
      planLabel: 'ตลอดชีพ',
      customerName: record.customerName || '',
      expiresAt: null
    });
  }

  const expiresAt = normalizeDate(record.expiresAt);
  if (!expiresAt) {
    return json({ valid: false, message: 'License รายเดือนยังไม่ได้ตั้งวันหมดอายุ' });
  }

  if (new Date(expiresAt).getTime() <= Date.now()) {
    return json({
      valid: false,
      message: 'License รายเดือนหมดอายุแล้ว กรุณาต่ออายุ'
    });
  }

  return json({
    valid: true,
    plan: 'monthly',
    planLabel: 'รายเดือน',
    customerName: record.customerName || '',
    expiresAt
  });
}

function toObject(headers, row) {
  const obj = {};
  headers.forEach((header, index) => {
    obj[header] = row[index];
  });
  return obj;
}

function normalizeDate(value) {
  if (!value) {
    return '';
  }
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return value.toISOString();
  }
  return String(value).trim();
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
