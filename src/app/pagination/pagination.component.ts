import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
type Book = { title: string; description: string };

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  constructor(
    private bookService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    // this.getBooksPerPage(1, 10);
    this.bookService.getTotalsPage().subscribe({
      next: (res) => (this.totalPages = res.total),
    });
    this.activatedRoute.params.subscribe(
      (params) => (this.currentPage = params['page'])
    );
    //this.getBooksPerPage(this.currentPage, 10);
    this.paginate({
      page: this.currentPage,
      first: this.currentPage * this.singlePageRows,
      rows: this.singlePageRows,
      pageCount: this.totalPages,
    });

    const buttons = document.getElementsByClassName('p-ripple');
    console.log(buttons);
  }

  books: Book[] = [];
  currentPage = 0;
  singlePageRows = 10;
  totalPages: number = 0;
  paginate(event: any) {
    console.log(event);
    this.singlePageRows = event.rows;
    this.route.navigate(['pagination', event.page]);
    this.getBooksPerPage(event.page, this.singlePageRows);

    // throw new Error('Method not implemented.');
  }

  getBooksPerPage(pageNo: number, pageSize: number) {
    this.bookService.getBooksPerPage(pageNo, pageSize).subscribe({
      next: (res: any) => {
        let temp = res.map((book: any) => {
          let tempBook: Book = {
            title: book.title,
            description: book.description,
          };
          console.log('second');

          return tempBook;
        });
        this.books = temp;
      },
    });
  }
}
