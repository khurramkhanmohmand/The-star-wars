import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The-star-wars';

  public isHeader!: Observable<boolean>;

  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    this.isHeader = this.dataService.isHeader;
  }
}
