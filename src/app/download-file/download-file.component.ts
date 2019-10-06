import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html'
})
export class DownloadFileComponent {
  private baseUrl: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  public onDownloadClicked() {
    this.http.get(this.baseUrl + 'api/SampleData/download-file', { observe: 'response', responseType: "blob" })
      .subscribe(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        const parts = contentDisposition.split(';');
        const map = parts.reduce((acc, cur) => {
            const x = cur.split('=');
            acc[x[0].trim()] = x[1];
            return acc;
          },
          {});
        saveAs(response.body, map['filename']);
        console.log(JSON.stringify(map));
      }, error => console.error(error));
  }
}
