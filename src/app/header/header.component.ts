import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('search') _search!: ElementRef;

  public seaches: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this._search) return;
    fromEvent(this._search.nativeElement, 'keyup')
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((data: any) => this.dataService.search(data.target.value))
      )
      .subscribe((seaches: string[]) => {
        this.seaches = seaches;
      });
  }

  public navigate(keyword: string): void {
    this.dataService.search(keyword, false).subscribe();
  }

}
