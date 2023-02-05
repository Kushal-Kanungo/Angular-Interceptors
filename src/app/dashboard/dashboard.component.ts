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

  getBooks(pageNo: number) {
    this.bookService.getBooksPage(pageNo).subscribe({
      next: (res: any) => {
        let temp = res.map((book: any) => {
          let tempBook: Book = {
            title: book.title,
            description: book.description,
          };
          console.log('second');

          return tempBook;
        });
        this.books = this.books.concat(temp);
      },
    });
  }

  onScroll(): void {
    this.page += 1;
    this.getBooks(this.page);
  }

  ngOnInit() {
    this.getBooks(this.page);
  }
}
