export const validateEmployeeId = (id: string): boolean => {
    // Simple validation: 6-8 digits
    const regex = /^\d{6,8}$/;
    return regex.test(id);
};

export const validateVerificationCode = (code: string): boolean => {
    // 6 digit code
    const regex = /^\d{6}$/;
    return regex.test(code);
};

export const formatEmployeeId = (id: string): string => {
    // Remove non-digits and limit to 8 characters
    return id.replace(/\D/g, '').slice(0, 8);
};

export const formatVerificationCode = (code: string): string => {
    // Remove non-digits and limit to 6 characters
    return code.replace(/\D/g, '').slice(0, 6);
};
