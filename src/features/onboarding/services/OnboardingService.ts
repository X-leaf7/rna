import { Employee, WalletData, OnboardingService } from '../types';

export class OnboardingServiceImpl implements OnboardingService {
    async verifyEmployeeId(employeeId: string): Promise<Employee> {
        // Simulate API call
        await this.delay(1500);

        // Mock employee data
        const mockEmployees: Record<string, Employee> = {
            '123456': {
                id: '123456',
                email: 'john.doe@company.com',
                firstName: 'Anonymous',
                lastName: 'User',
                isFirstTime: true,
            },
            '789012': {
                id: '789012',
                email: 'jane.smith@company.com',
                firstName: 'Anonymous',
                lastName: 'User',
                isFirstTime: false,
            },
        };

        const employee = mockEmployees[employeeId];
        if (!employee) {
            throw new Error('Employee ID not found');
        }

        return employee;
    }

    async verifyCode(code: string, employeeId: string): Promise<boolean> {
        // Simulate API call
        await this.delay(1000);

        // For demo purposes, accept any 6-digit code
        return code.length === 6;
    }

    async createOrRetrieveWallet(employeeId: string): Promise<WalletData> {
        // Simulate wallet creation/retrieval
        await this.delay(2000);

        // Mock wallet addresses
        const mockWallets: Record<string, WalletData> = {
            '123456': {
                address: '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T',
                isNew: true,
                verTokens: 1000,
                alphBalance: 5.0,
            },
            '789012': {
                address: '9Z8Y7X6W5V4U3T2S1R0Q9P8O7N6M5L4K3J2I1H0G',
                isNew: false,
                verTokens: 2500,
                alphBalance: 12.5,
            },
        };

        return mockWallets[employeeId] || {
            address: this.generateMockWalletAddress(),
            isNew: true,
            verTokens: 1000,
            alphBalance: 5.0,
        };
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private generateMockWalletAddress(): string {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 40; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}