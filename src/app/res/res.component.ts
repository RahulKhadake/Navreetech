import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res',
  standalone: true,
  imports: [],
  templateUrl: './res.component.html',
  styleUrl: './res.component.css'
})
export class ResComponent {

  router=inject(Router)
  All()
  {
     this.router.navigateByUrl("All")
  }
}
