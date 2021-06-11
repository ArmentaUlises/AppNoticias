import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  @ViewChild( IonSegment, {static: true} ) segment: IonSegment;
  
  constructor( private noticiasService: NoticiasService ) {
  }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria( event ) {
    this.noticias = [];
    this.cargarNoticias( event.detail.value );
  }

  loadData( event ) {
    this.cargarNoticias( this.segment.value, event );
  }

  cargarNoticias( categoria: string, event? ) {
    this.noticiasService.getTopHeadLinesCategoria( categoria )
          .subscribe( res => {
            this.noticias.push( ...res.articles );

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


