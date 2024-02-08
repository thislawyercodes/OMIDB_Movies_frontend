import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api/api.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';



@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent {
 
  pageEvent!: PageEvent
  loading: boolean = false

  dataLength = 0
  pageSize = environment.page_size
  pageOptions = [5, 10, 20, 50]
  pageIndex = 0
  showFirstLastButtons = true
  searchInputValue: string = '';
  identifierInputValue: string='';
  titleInputValue: string='';
  movieData: any;
  identifier: any;
  title: any;




  searchControl = new FormControl('');


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, private snackbar: SnackbarService) { }

  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
  }


  isSearchByTitle = true;

  // Function to switch between search modes
  switchSearchMode() {
    this.isSearchByTitle = !this.isSearchByTitle;

    // Clear fields when switching
    this.clearField();
  }

  get_movie_detail(identifier: string,title: string) {
    this.loading = true

    this.api.getMovieDetail({ i: identifier, t: title }).subscribe({
      next: (data: any) => {

        if (data) {
          this.movieData = data.data;
          this.snackbar.openSnackBar("Movie Data retrieved successfully",'success');

          setTimeout(() => {
            this.paginator.pageIndex = this.pageIndex
            this.paginator.length = this.dataLength
          });

        }
      },
      error: (error) => {
        this.loading = false

        switch (error.status) {
          case 401:
          case 403:
            /* handled in http interceptor */
            break
          default:
            const err_snackbar = this.snackbar.openSnackBar("Uknown Error. Could not retrieve movie detail.", "Retry", 5)

            err_snackbar.onAction().subscribe(() => {
              this.get_movie_detail(identifier, title)
            })
            break
        }
      },
      complete: () => {
        this.loading = false
      }
    })
  }
  clearField(): void {
    this.titleInputValue = '';
    this.identifierInputValue = '';
  }

  search() {
    if (this.identifierInputValue.trim() !== '' || this.titleInputValue.trim() !== '') {
      this.get_movie_detail(this.identifierInputValue, this.titleInputValue);
    } else {
      const err_snackbar = this.snackbar.openSnackBar("Please enter a valid Identifier or Title..", "Retry", 5)

      console.log('Please enter a valid Identifier or Title.');
    }
  }

 

}

