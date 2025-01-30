import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks(); 

// Properly mock `IntersectionObserver` to match its expected structure
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  
  constructor() {}

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
