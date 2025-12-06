export interface Parameter {
  name: string;
  value: number | string;
}

export interface Prediction {
  modelName: string;
  confidence: number;
}

export interface Log {
  id: string;
  message: string;
  level: 'warning' | 'alert';
  timestamp: string;
}

export interface AutoSafeCommand {
  id: string;
  command: string;
  status: 'active' | 'completed';
  timestamp: string;
}

// Mock data functions
const mockParameters: Parameter[] = [
  { name: 'Anomaly Score', value: '2.3%' },
  { name: 'Packets Analyzed', value: '1.2M' },
  { name: 'Encryption Entropy', value: '7.8/10' },
  { name: 'Traffic Patterns', value: 'Normal' },
  { name: 'Attack Confidence', value: '0.12%' },
  { name: 'Network Load', value: '34.5%' }
];

const mockPredictions: Prediction[] = [
  { modelName: 'DDoS Detection', confidence: 0.08 },
  { modelName: 'Protocol Anomaly', confidence: 0.15 },
  { modelName: 'Behavioral ML', confidence: 0.22 },
  { modelName: 'Packet Pattern', confidence: 0.19 }
];

const mockLogs: Log[] = [
  { id: '1', message: 'Suspicious packet timing pattern detected in subnet 192.168.1.0/24', level: 'warning', timestamp: new Date(Date.now() - 60000).toISOString() },
  { id: '2', message: 'CRITICAL: Potential DDoS attack detected from 203.45.67.89 (1.2M packets/sec)', level: 'alert', timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: '3', message: 'Anomalous encryption entropy detected in flow to 10.0.0.5', level: 'warning', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: '4', message: 'CRITICAL: Malware-like behavioral pattern detected on port 443', level: 'alert', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: '5', message: 'Port scan activity detected: 50+ ports probed in 2 seconds', level: 'warning', timestamp: new Date(Date.now() - 900000).toISOString() }
];

const mockAutoSafeCommands = [
  { id: '1', command: 'Block IP 203.45.67.89', status: 'completed' as const, timestamp: new Date(Date.now() - 30000).toISOString() },
  { id: '2', command: 'Isolate affected subnet', status: 'active' as const, timestamp: new Date(Date.now() - 10000).toISOString() }
];

// API Functions
export async function getParameters(): Promise<Parameter[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockParameters), 300);
  });
}

export async function getPredictions(): Promise<Prediction[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPredictions), 300);
  });
}

export async function getLogs(): Promise<Log[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLogs), 300);
  });
}

export async function getPermissionStatus(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Waiting for Permission'), 300);
  });
}

export async function getAutoSafeCommands() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAutoSafeCommands), 300);
  });
}
