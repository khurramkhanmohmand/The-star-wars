import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
})
export class FilmDetailsComponent implements OnInit {
  public _filmDetail!: Observable<any>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._filmDetail = this.route.params.pipe(
      switchMap((params: any) => this.dataService.getFilmsDetail(+params['id']))
    );
  }

  public setHeader(): void {
    this.dataService.isHeader = true;
  }
}
