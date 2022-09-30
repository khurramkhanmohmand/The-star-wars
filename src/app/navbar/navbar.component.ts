import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { DataService } from '../services/data.service';

enum LIST {
  FILMS = 'films',
  PEOPLE = 'people',
  PLANETS = 'planets',
  SPECIES = 'species',
  STARSHIP = 'starships',
  VEHICLES = 'vehicles',
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public listOfLinks: typeof LIST = LIST;

  constructor(private router: Router, private dataService: DataService) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
        map((data: any) => data.urlAfterRedirects.split('/').pop()),
        tap(
          (data) =>
            (this.dataService.isHeader = Object.values(
              this.listOfLinks
            ).includes(data))
        ),
        switchMap((data: any) =>
          !Object.values(this.listOfLinks).includes(data)
            ? of(null)
            : this.dataService.getList(data)
        )
      )
      .subscribe();
  }

  public getList(catogery: string): void {
    this.dataService.isHeader = true;
    this.dataService.getList(catogery).subscribe();
  }
}
