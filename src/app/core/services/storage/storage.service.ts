import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    public setItem(key: string, value: unknown): void {
        try {
            if (typeof value === 'string') {
                sessionStorage.setItem(key, value);
                return;
            }
            if (value === undefined || value === null) {
                sessionStorage.setItem(key, 'null');
                return;
            }
            const serializedValue = JSON.stringify(value);
            sessionStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting item in sessionStorage: ${error}`);
        }
    }

    public getItem<T>(key: string, parseJson: boolean = true): T | null {
        try {
            const serializedValue = sessionStorage.getItem(key);

            if (serializedValue === null) {
                return null;
            }

            if (!parseJson) {
                return this.removeQuotesIfPresent(serializedValue) as unknown as T;
            }

            try {
                return JSON.parse(serializedValue);
            } catch {
                return this.removeQuotesIfPresent(serializedValue) as unknown as T;
            }
        } catch (error) {
            console.error(`Error getting item from sessionStorage: ${error}`);
            return null;
        }
    }

    private removeQuotesIfPresent(value: string): string {
        if (value.startsWith('"') && value.endsWith('"')) {
            return value.slice(1, -1);
        }
        return value;
    }
    public clear(): void {
        sessionStorage.clear();
    }

    public removeItem(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from sessionStorage: ${error}`);
        }
    }

    public hasItem(key: string): boolean {
        return sessionStorage.getItem(key) !== null;
    }
}
