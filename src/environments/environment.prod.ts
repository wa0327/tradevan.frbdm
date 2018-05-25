import { enableProdMode } from '@angular/core';

export const environment = {
    production: true,
    apiBaseUrl: '/api',
    init() {
        enableProdMode();
    }
};
