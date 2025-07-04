export interface ReportOption {
    value: string;
    text: string;
}

export interface ReportType {
    type: 'good' | 'bad';
    category: string;
    details: string;
    photo?: string;
    location?: LocationData;
    timestamp: string;
}

export interface LocationData {
    latitude: number;
    longitude: number;
    elevation?: number;
    heading?: number;
}

export interface ReportingState {
    currentReport: Partial<ReportType>;
    isSubmitting: boolean;
    error: string | null;
    location: LocationData | null;
}

export interface ReportingService {
    submitReport(report: ReportType): Promise<void>;
    getCurrentLocation(): Promise<LocationData>;
}