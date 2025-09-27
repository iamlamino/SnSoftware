import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-http',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Test HTTP</p>`,
})
export class TestHttp {
  constructor(private http: HttpClient) {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(console.log);
  }
}
