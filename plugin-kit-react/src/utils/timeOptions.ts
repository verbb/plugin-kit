import { hostGetLocale, hostGetTimepickerOptions } from './hostBridge';

// Cache for time options to avoid regenerating on every render
let timeOptionsCache: Array<{ value: string; label: string }> | null = null;

// Generate time options in 30-minute increments starting from midnight
export const generateTimeOptions = (): Array<{ value: string; label: string }> => {
    // Return cached options if available
    if (timeOptionsCache) {
        return timeOptionsCache;
    }

    const options: Array<{ value: string; label: string }> = [];
    const timepickerOptions = hostGetTimepickerOptions() || {};
    const lang = timepickerOptions.lang || { AM: 'AM', PM: 'PM' };
    const timeFormat = timepickerOptions.timeFormat || 'g:i A';

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

            // Use Craft's time formatting
            let displayTime: string;
            if (timeFormat === 'g:i A') {
                // 12-hour format with AM/PM
                let displayHour = hour;
                if (hour === 0) {
                    displayHour = 12;
                } else if (hour > 12) {
                    displayHour = hour - 12;
                }
                const ampm = hour >= 12 ? lang.PM : lang.AM;
                displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
            } else if (timeFormat === 'G:i') {
                // 24-hour format
                displayTime = timeString;
            } else {
                // Fallback to browser's locale formatting
                displayTime = new Date(`2000-01-01T${timeString}:00`).toLocaleTimeString(hostGetLocale() || 'en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: timeFormat.includes('A'),
                });
            }

            options.push({
                value: timeString,
                label: displayTime,
            });
        }
    }

    // Cache the result
    timeOptionsCache = options;
    return options;
};

// Clear cache (useful for testing or if Craft settings change)
export const clearTimeOptionsCache = (): void => {
    timeOptionsCache = null;
};
