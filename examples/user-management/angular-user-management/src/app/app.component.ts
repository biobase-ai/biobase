import { Component, OnInit } from '@angular/core';
import { BiobaseService } from './biobase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-user-management';

  session = this.biobase.session;

  constructor(private readonly biobase: BiobaseService) {}

  ngOnInit() {
    this.biobase.authChanges((_, session) => (this.session = session));
  }
}
