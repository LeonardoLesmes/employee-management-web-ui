import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {  /**
   * Almacena un valor en sessionStorage
   * @param key Clave para almacenar el valor
   * @param value Valor a almacenar (puede ser cualquier tipo)
   */
  public setItem(key: string, value: unknown): void {
    try {
      // Si es un string, lo guardamos directamente
      if (typeof value === 'string') {
        sessionStorage.setItem(key, value);
        return;
      }
      
      // Si es undefined o null, almacenamos null
      if (value === undefined || value === null) {
        sessionStorage.setItem(key, 'null');
        return;
      }
      
      // Para otros tipos, convertimos a JSON
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
        // Si no queremos parsear, devolvemos el valor como string quitando comillas
        return this.removeQuotesIfPresent(serializedValue) as unknown as T;
      }
      
      try {
        // Intentamos parsear el JSON
        return JSON.parse(serializedValue);
      } catch {
        // Si falla el parsing, devolvemos el valor como está sin comillas
        return this.removeQuotesIfPresent(serializedValue) as unknown as T;
      }
    } catch (error) {
      console.error(`Error getting item from sessionStorage: ${error}`);
      return null;
    }
  }
  
  /**
   * Elimina las comillas dobles al inicio y final de un string si existen
   * @param value Valor a procesar
   * @returns String sin comillas dobles al inicio y final
   */
  private removeQuotesIfPresent(value: string): string {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1);
    }
    return value;
  }
  public clear(): void {
    sessionStorage.clear();
  }
  
  /**
   * Elimina un elemento específico del sessionStorage
   * @param key Clave del elemento a eliminar
   */
  public removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from sessionStorage: ${error}`);
    }
  }
  
  /**
   * Verifica si existe una clave en el sessionStorage
   * @param key Clave a verificar
   * @returns true si la clave existe, false en caso contrario
   */
  public hasItem(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}
