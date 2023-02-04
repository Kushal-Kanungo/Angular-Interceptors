import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

type Book = { title: string; description: string };
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  page = 1;
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

  onScroll(): void {
    this.page += 1;
    this.bookService.getBooksPage(this.page).subscribe({
      next: (res: any) => {
        let temp = res.map((book: any) => {
          let tempBook: Book = {
            title: book.title,
            description: book.description,
          };
          return tempBook;
        });
        this.books = this.books.concat(temp);
      },
    });
  }

  ngOnInit() {}
}
