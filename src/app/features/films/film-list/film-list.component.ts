import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
})
export class FilmListComponent implements OnInit {
  url: any;

  public moviesList: Observable<any> | null = null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.moviesList = this.dataService._list.pipe(
      map((data: any) => data?.results)
    );
  }

  navigate(value: any) {
    this.url = value.replace(/[\D]/g, '');
    this.router.navigate(['/films/', this.url]);
    this.dataService.isHeader = false;
  }
}
