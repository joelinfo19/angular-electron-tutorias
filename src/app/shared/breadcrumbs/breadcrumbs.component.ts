import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  public titulo: string;
  public tituloSubs$: Subscription;


  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentsRuta()
      .subscribe(({titulo}) => {
        console.log(titulo);
        this.titulo = titulo;
      });

  }
  getArgumentsRuta(){
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),

      );

  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void{
    this.tituloSubs$.unsubscribe();
  }

}
