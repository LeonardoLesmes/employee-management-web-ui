import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public setItem(key: string, value: unknown): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  } 

  
  public getItem<T>(key: string, parseJson: boolean = true): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      
      if (serializedValue === null) {
        return null;
      }

      // Si no queremos parsear JSON, devolvemos el valor como está
      if (!parseJson) {
        return serializedValue as unknown as T;
      }
      
      try {
        // Intentamos parsear el JSON
        return JSON.parse(serializedValue);
      } catch {
        // Si falla el parsing, devolvemos el valor como está
        return serializedValue as unknown as T;
      }
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return null;
    }
  }

  public clear(): void {
    localStorage.clear();
  }
}
