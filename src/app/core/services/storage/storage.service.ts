import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly secretKey = 'emp-mgmt-secret-key-2025';
    private readonly keySecret = 'emp-mgmt-key-salt-2025';

    private encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    }

    private decrypt(encryptedData: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    private encryptKey(key: string): string {
        return CryptoJS.HmacSHA256(key, this.keySecret).toString();
    }

    public setItem(key: string, value: unknown): void {
        try {
            let dataToStore: string;

            if (typeof value === 'string') {
                dataToStore = value;
            } else if (value === undefined || value === null) {
                dataToStore = 'null';
            } else {
                dataToStore = JSON.stringify(value);
            }

            const encryptedKey = this.encryptKey(key);
            const encryptedData = this.encrypt(dataToStore);
            sessionStorage.setItem(encryptedKey, encryptedData);
        } catch (error) {
            console.error(`Error setting item in sessionStorage: ${error}`);
        }
    }

    public getItem<T>(key: string, parseJson: boolean = true): T | null {
        try {
            const encryptedKey = this.encryptKey(key);
            const encryptedValue = sessionStorage.getItem(encryptedKey);

            if (encryptedValue === null) {
                return null;
            }

            const decryptedValue = this.decrypt(encryptedValue);

            if (!decryptedValue) {
                return null;
            }

            if (!parseJson) {
                return this.removeQuotesIfPresent(decryptedValue) as unknown as T;
            }

            try {
                return JSON.parse(decryptedValue);
            } catch {
                return this.removeQuotesIfPresent(decryptedValue) as unknown as T;
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
            const encryptedKey = this.encryptKey(key);
            sessionStorage.removeItem(encryptedKey);
        } catch (error) {
            console.error(`Error removing item from sessionStorage: ${error}`);
        }
    }

    public hasItem(key: string): boolean {
        const encryptedKey = this.encryptKey(key);
        return sessionStorage.getItem(encryptedKey) !== null;
    }
}
