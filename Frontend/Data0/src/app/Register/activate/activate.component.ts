import { Component, OnInit } from '@angular/core';
import { ActivateService } from './activate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit{
  constructor(private service: ActivateService, private route: ActivatedRoute) {}
  error = false;
  success = false;
  ngOnInit(): void {
    this.route.queryParams.pipe(mergeMap(params => this.service.getKey(params['key']))).subscribe({
      next: () => (this.success = true),
      error: () => (this.error = true),
    });
  }
}
