import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasServices.getTopHeadLines()
      .subscribe( res => {
        this.noticias.push(...res.articles);

        setTimeout(() => {
          if ( res.articles.length === 0 ) {
            event.target.disabled = true;
            event.target.complete();
            return;
          }
          this.noticias.push( ...res.articles );
          if ( event ) { 
            event.target.complete();
          }
        }, 2000);

    });
  }
}
