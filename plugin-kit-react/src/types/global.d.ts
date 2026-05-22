declare global {
    type ImportMetaHotData = Record<string, unknown>;

    interface Window {
        Craft?: {
            t: (category: string, message: string, params?: Record<string, string>) => string;
            asciiString: (str: string) => string;
            filterArray: <T>(arr: T[]) => T[];
            timepickerOptions: Record<string, unknown>;
            locale: string;
        };
    }

    const Craft: {
        t: (category: string, message: string, params?: Record<string, string>) => string;
    };

    interface ImportMeta {
        hot?: {
            data: ImportMetaHotData;
            accept: (callback?: (newModule: unknown) => void) => void;
        };
    }
}

export { }; 
