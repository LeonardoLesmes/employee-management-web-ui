import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    
    // Limpiar sessionStorage antes de cada prueba
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should store and retrieve a string without quotes', () => {
    const testString = 'test string';
    service.setItem('testKey', testString);
    const retrieved = service.getItem('testKey', false);
    expect(retrieved).toBe(testString);
  });
  
  it('should store and retrieve an object correctly', () => {
    const testObject = { name: 'John', age: 30 };
    service.setItem('testObject', testObject);
    const retrieved = service.getItem('testObject');
    expect(retrieved).toEqual(testObject);
  });
  
  it('should handle null and undefined values', () => {
    service.setItem('nullValue', null);
    expect(service.getItem('nullValue')).toBeNull();
    
    service.setItem('undefinedValue', undefined);
    expect(service.getItem('undefinedValue')).toBeNull();
  });
  
  it('should remove items correctly', () => {
    service.setItem('toBeRemoved', 'value');
    expect(service.hasItem('toBeRemoved')).toBeTrue();
    
    service.removeItem('toBeRemoved');
    expect(service.hasItem('toBeRemoved')).toBeFalse();
  });
  
  it('should clear all items', () => {
    service.setItem('item1', 'value1');
    service.setItem('item2', 'value2');
    
    service.clear();
    
    expect(service.hasItem('item1')).toBeFalse();
    expect(service.hasItem('item2')).toBeFalse();
  });
});
