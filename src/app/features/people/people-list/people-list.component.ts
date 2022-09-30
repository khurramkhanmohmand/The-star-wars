import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent implements OnInit {
  url: any;

  public peopleList: Observable<any> | null = null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.peopleList = this.dataService._list.pipe(
      map((data: any) => data?.results)
    );
  }

  navigate(value: any) {
    this.url = value.replace(/[\D]/g, '');
    this.router.navigate(['/people/', this.url]);
    this.dataService.isHeader = false;
  }
}
