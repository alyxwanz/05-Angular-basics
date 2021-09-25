import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() book!: Book;
  @Input() btnTitle: string ='Add';
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() removeEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  add() {
    this.newItemEvent.emit(this.book.id);
  }

  remove() {
    this.removeEvent.emit(this.book.id)
  }

  handleClick() {
    this.btnTitle === 'Add' ? this.add() : this.remove();
  }
}
