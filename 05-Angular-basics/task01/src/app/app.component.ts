import { Component, OnDestroy } from '@angular/core';
import { Book } from './book';
import { BOOKS } from './mock-books';
import { GoogleBookApiService } from './google-book-api.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy{
  title = 'books-search-app';
  inputValue = '';
  subscriber: Subscription = new Subscription();

  constructor(private Api: GoogleBookApiService) {}

  books: Book[] = BOOKS;
  newArr: Book[] = [];

  handler(id: number) {
    // console.log(this.books)
    const el = this.books.find((elem) => elem.id === id);
    const myEl = this.newArr.find((elem) => elem.id === id);
    if (myEl) {
      return;
    }
    if (el) {
      this.newArr.push(el);
    }
  }

  removeHandler(id: number) {
    this.newArr = this.newArr.filter((elem) => elem.id !== id);
  }

  search() {
    this.subscriber = this.Api.search(this.inputValue).subscribe((data) => {
      this.books = data;
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
