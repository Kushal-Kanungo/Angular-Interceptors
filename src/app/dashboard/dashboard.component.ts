import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

type Book = { title: string; description: string };
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, CanComponentDeactivate {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  allowedToLeave: boolean = false;
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

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.allowedToLeave) {
      return true;
    }
    return confirm('Do you want to leave this');
  }

  ngOnInit() {
    this.getBooks(this.page);
  }
}
