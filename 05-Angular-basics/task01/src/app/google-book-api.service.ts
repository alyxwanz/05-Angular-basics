import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleBookApiService {
  constructor(private http: HttpClient) {}
  private API_KEY = 'AIzaSyDjuxQ3Iq3YyWLIncA47kaVVvCTrnwZzik';
  private API_PATH =
    'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey';

  search(query: string) {
    return this.http
      .get<any>(
        `https://www.googleapis.com/books/v1/volumes?q=${query}+inauthor:keyes&key=AIzaSyDjuxQ3Iq3YyWLIncA47kaVVvCTrnwZzik`
      )
      .pipe(
        map((data) => {
          return data.items.map((el: { id: any; volumeInfo: any }) => {
            const { id, volumeInfo } = el;
            const {
              title = '',
              description = '',
              publishedDate = '',
              authors = '',
              imageLinks = '',
              categories = '',
            } = volumeInfo;
            const { smallThumbnail = '' } = imageLinks;
            const subtitle = categories ? categories[0] : '';

            return {
              id,
              title,
              subtitle,
              description,
              publishedDate,
              authors: authors?.join(',') || '',
              thumbnail: smallThumbnail,
            };
          });
        })
      );
  }
}
