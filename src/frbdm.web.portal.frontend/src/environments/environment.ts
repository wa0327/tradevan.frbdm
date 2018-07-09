import { HttpClient } from '@angular/common/http';

export const environment = {
    production: false,
    apiBaseUrl: 'http://developer:8080/api',
    useMockData: false,
    apiInit(http: HttpClient) {
        if (!this.useMockData) {
            http.get(`${this.apiBaseUrl}/login?account=gemini\\admin`).subscribe(logon => {
                console.log('Login Completed!');
                console.log(logon);
            });
        }
    }
};