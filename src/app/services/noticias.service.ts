import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({'X-Api-key': apiKey});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  
  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ){
    query = apiURL + query;
    return this.http.get<T>(query, {headers: headers});
  }

  getTopHeadLines(){
    this.headLinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadLinesCategoria(categoria: string){
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

}
