import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ReportingState, ReportType, LocationData } from '../types';
import { ReportingServiceImpl } from '../services/reporting-service';

type ReportingAction =
    | { type: 'SET_SUBMITTING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_REPORT_TYPE'; payload: 'good' | 'bad' }
    | { type: 'SET_CATEGORY'; payload: string }
    | { type: 'SET_DETAILS'; payload: string }
    | { type: 'SET_PHOTO'; payload: string }
    | { type: 'SET_LOCATION'; payload: LocationData }
    | { type: 'RESET_REPORT' };

const initialState: ReportingState = {
    currentReport: {},
    isSubmitting: false,
    error: null,
    location: null,
};

const reportingReducer = (
    state: ReportingState,
    action: ReportingAction
): ReportingState => {
    switch (action.type) {
        case 'SET_SUBMITTING':
            return { ...state, isSubmitting: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isSubmitting: false };
        case 'SET_REPORT_TYPE':
            return {
                ...state,
                currentReport: { type: action.payload },
                error: null,
            };
        case 'SET_CATEGORY':
            return {
                ...state,
                currentReport: { ...state.currentReport, category: action.payload },
            };
        case 'SET_DETAILS':
            return {
                ...state,
                currentReport: { ...state.currentReport, details: action.payload },
            };
        case 'SET_PHOTO':
            return {
                ...state,
                currentReport: { ...state.currentReport, photo: action.payload },
            };
        case 'SET_LOCATION':
            return { ...state, location: action.payload };
        case 'RESET_REPORT':
            return { ...initialState, location: state.location };
        default:
            return state;
    }
};

interface ReportingContextType {
    state: ReportingState;
    setReportType: (type: 'good' | 'bad') => void;
    setCategory: (category: string) => void;
    setDetails: (details: string) => void;
    setPhoto: (photo: string) => void;
    submitReport: () => Promise<void>;
    resetReport: () => void;
    loadLocation: () => Promise<void>;
}

const ReportingContext = createContext<ReportingContextType | undefined>(undefined);

const reportingService = new ReportingServiceImpl();

export const ReportingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reportingReducer, initialState);

    const setReportType = (type: 'good' | 'bad') => {
        dispatch({ type: 'SET_REPORT_TYPE', payload: type });
    };

    const setCategory = (category: string) => {
        dispatch({ type: 'SET_CATEGORY', payload: category });
    };

    const setDetails = (details: string) => {
        dispatch({ type: 'SET_DETAILS', payload: details });
    };

    const setPhoto = (photo: string) => {
        dispatch({ type: 'SET_PHOTO', payload: photo });
    };

    const submitReport = async () => {
        const { type, category, details } = state.currentReport;

        if (!type || !category || !details) {
            dispatch({ type: 'SET_ERROR', payload: 'Please fill in all required fields' });
            return;
        }

        try {
            dispatch({ type: 'SET_SUBMITTING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });

            const report: ReportType = {
                type,
                category,
                details,
                photo: state.currentReport.photo,
                location: state.location || undefined,
                timestamp: new Date().toISOString(),
            };

            await reportingService.submitReport(report);
            dispatch({ type: 'RESET_REPORT' });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
            dispatch({ type: 'SET_SUBMITTING', payload: false });
        }
    };

    const resetReport = () => {
        dispatch({ type: 'RESET_REPORT' });
    };

    const loadLocation = async () => {
        try {
            const location = await reportingService.getCurrentLocation();
            dispatch({ type: 'SET_LOCATION', payload: location });
        } catch (error) {
            console.error('Failed to load location:', error);
        }
    };

    return (
        <ReportingContext.Provider
            value={{
                state,
                setReportType,
                setCategory,
                setDetails,
                setPhoto,
                submitReport,
                resetReport,
                loadLocation,
            }}
        >
            {children}
        </ReportingContext.Provider>
    );
};

export const useReporting = () => {
    const context = useContext(ReportingContext);
    if (context === undefined) {
        throw new Error('useReporting must be used within a ReportingProvider');
    }
    return context;
};