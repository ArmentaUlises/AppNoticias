import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx'
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFav: boolean;

  constructor(private iab: InAppBrowser, 
              public actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              private toastCtrl: ToastController) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async abrirMenu(){
    let save_delete_btn;
    if(this.enFav){
      save_delete_btn ={
        text: 'Borrar favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('borrar favorito clicked');
          this.dataLocalService.borrarNoticia(this.noticia);
          this.presentToast()
        }
      }
    } else {
      save_delete_btn ={
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
          this.presentToast()
        }
      }
    }
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      save_delete_btn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          //cerar
        }
      }]
    });
    await actionSheet.present();
  }

  async presentToast() {
    if(this.enFav){
      const toast = await this.toastCtrl.create({
        message: 'Se eliminó correctamente.',
        duration: 2000
      });
      toast.present();
    }else{
      const toast = await this.toastCtrl.create({
        message: 'Se agregó a favoritos.',
        duration: 2000
      });
      toast.present();
    }
  }

}
