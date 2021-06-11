import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage) { 
    this.init();
    this.cargarFavoritos();
  }

  async init(){
    const storage = await this.storage.create();
    this.storage = storage;
  }

  guardarNoticia(noticia){
    const existe = this.noticias.find(noti => noti.title === noticia.title);
    if(!existe){
      this.noticias.unshift( noticia );
      this.storage.set('Favoritos', this.noticias);
    }
  }

  async cargarFavoritos(){
    const fav = await this.storage.get('Favoritos');
    if(fav){
      this.noticias = fav;
    } else {
      this.noticias = [];
    }
  }
  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('Favoritos', this.noticias);
  }

}
