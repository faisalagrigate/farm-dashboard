import ExcelJS from 'exceljs';

const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';
const PAGE_LIMIT = 1000;

type MetricValue = { value?: string | number; unit?: string; type?: string };
type SensorRecord = {
  deviceId?: string;
  timestamp?: string;
  status?: string;
  metrics?: Record<string, MetricValue | string | number | null>;
};

async function fetchAllSensorData(deviceId?: string): Promise<SensorRecord[]> {
  const rows: SensorRecord[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = new URL(`${BASE_URL}/iot/data`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(PAGE_LIMIT));
    if (deviceId) url.searchParams.set('deviceId', deviceId);

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch IoT data: ${res.status}`);
    }

    const payload = await res.json();
    const data: SensorRecord[] = payload.data || [];
    const pagination = payload.pagination || {};
    totalPages = Math.max(Number(pagination.pages) || 1, 1);
    rows.push(...data);
    page += 1;
  }

  return rows;
}

function metricValue(metric: MetricValue | string | number | null | undefined) {
  if (metric == null) return '';
  if (typeof metric === 'object') return metric.value ?? '';
  return metric;
}

export async function exportIotDataToExcel(deviceId?: string): Promise<void> {
  const documents = await fetchAllSensorData(deviceId);

  if (documents.length === 0) {
    throw new Error('No sensor data found to export');
  }

  const metricKeys = new Set<string>();
  documents.forEach((doc) => {
    Object.keys(doc.metrics || {}).forEach((key) => metricKeys.add(key));
  });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Farm Dashboard';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Sensor Data');
  const columns = [
    { header: 'Timestamp', key: 'timestamp', width: 25 },
    { header: 'Device ID', key: 'deviceId', width: 20 },
    { header: 'Status', key: 'status', width: 15 },
    ...Array.from(metricKeys).map((key) => ({ header: key, key, width: 15 })),
  ];
  sheet.columns = columns;
  sheet.getRow(1).font = { bold: true };

  documents.forEach((doc) => {
    const rowData: Record<string, string | number> = {
      timestamp: doc.timestamp || '',
      deviceId: doc.deviceId || '',
      status: doc.status || '',
    };

    metricKeys.forEach((key) => {
      rowData[key] = metricValue(doc.metrics?.[key]) as string | number;
    });

    sheet.addRow(rowData);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  link.href = blobUrl;
  link.download = deviceId
    ? `iot_data_${deviceId}_${date}.xlsx`
    : `iot_data_all_${date}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}
