export interface Employee {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isFirstTime: boolean;
}

export interface WalletData {
    address: string;
    isNew: boolean;
    verTokens: number;
    alphBalance: number;
}

export interface OnboardingState {
    currentStep: 'welcome' | 'verification' | 'wallet' | 'complete';
    employee: Employee | null;
    verificationCode: string;
    walletData: WalletData | null;
    isLoading: boolean;
    error: string | null;
}

export interface OnboardingService {
    verifyEmployeeId(employeeId: string): Promise<Employee>;
    verifyCode(code: string, employeeId: string): Promise<boolean>;
    createOrRetrieveWallet(employeeId: string): Promise<WalletData>;
}