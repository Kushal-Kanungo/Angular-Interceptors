import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

type Book = { title: string; description: string };
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: DashboardService) {}

  getBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.books = res.map((book: any) => {
          let tempBook: Book = {
            title: book.title,
            description: book.description,
          };
          return tempBook;
        });
      },
    });
  }

  ngOnInit() {}
}
