import { ReportType, LocationData, ReportingService } from '../types';

export class ReportingServiceImpl implements ReportingService {
    async submitReport(report: ReportType): Promise<void> {
        // Simulate API call
        await this.delay(2000);

        // For demo purposes, just log the report
        console.log('Report submitted:', report);

        // In a real app, this would send to a backend
        // and store in blockchain for verification
    }

    async getCurrentLocation(): Promise<LocationData> {
        // Simulate getting location
        await this.delay(500);

        // Mock location data (Denver, CO)
        return {
            latitude: 39.7392,
            longitude: -104.9903,
            elevation: 5280,
            heading: Math.random() * 360,
        };
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}