import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.css'],
})
export class PeopleDetailComponent implements OnInit {
  sub: any;
  id: any;;

  private getPeopleDetail!: Observable<any>;
  public _peopleDetail!: Observable<any>;
  public _homeWorldLink!: Observable<any>;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getPeopleDetail = this.dataService.getPeopleDetail(this.id);
    this._peopleDetail = this.getPeopleDetail;
    this._homeWorldLink = this.getPeopleDetail
      .pipe(
        map((data: any) => data.homeworld),
        switchMap((data: any) => this.dataService.getHomeWorld(data)),
        map((data: any) => data.name),
      );
  }
}
