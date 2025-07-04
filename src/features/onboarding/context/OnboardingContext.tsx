import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { OnboardingState, Employee, WalletData } from '../types';
import { OnboardingServiceImpl } from '../services/OnboardingService';

type OnboardingAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EMPLOYEE'; payload: Employee }
  | { type: 'SET_VERIFICATION_CODE'; payload: string }
  | { type: 'SET_WALLET_DATA'; payload: WalletData }
  | { type: 'SET_STEP'; payload: OnboardingState['currentStep'] }
  | { type: 'RESET' };

const initialState: OnboardingState = {
  currentStep: 'welcome',
  employee: null,
  verificationCode: '',
  walletData: null,
  isLoading: false,
  error: null,
};

const onboardingReducer = (
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_EMPLOYEE':
      return { ...state, employee: action.payload };
    case 'SET_VERIFICATION_CODE':
      return { ...state, verificationCode: action.payload };
    case 'SET_WALLET_DATA':
      return { ...state, walletData: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface OnboardingContextType {
  state: OnboardingState;
  verifyEmployeeId: (employeeId: string) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
  createWallet: () => Promise<void>;
  nextStep: () => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const onboardingService = new OnboardingServiceImpl();

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const verifyEmployeeId = async (employeeId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const employee = await onboardingService.verifyEmployeeId(employeeId);
      dispatch({ type: 'SET_EMPLOYEE', payload: employee });
      dispatch({ type: 'SET_STEP', payload: 'verification' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const verifyCode = async (code: string) => {
    if (!state.employee) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const isValid = await onboardingService.verifyCode(code, state.employee.id);
      if (isValid) {
        dispatch({ type: 'SET_VERIFICATION_CODE', payload: code });
        dispatch({ type: 'SET_STEP', payload: 'wallet' });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Invalid verification code' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createWallet = async () => {
    if (!state.employee) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const walletData = await onboardingService.createOrRetrieveWallet(state.employee.id);
      dispatch({ type: 'SET_WALLET_DATA', payload: walletData });
      dispatch({ type: 'SET_STEP', payload: 'complete' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const nextStep = () => {
    const steps: OnboardingState['currentStep'][] = ['welcome', 'verification', 'wallet', 'complete'];
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex + 1] });
    }
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        verifyEmployeeId,
        verifyCode,
        createWallet,
        nextStep,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};