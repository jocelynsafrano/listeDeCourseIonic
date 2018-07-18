import { ListesProvider } from './../../providers/listes/listes';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listes : [any];

  constructor(public navCtrl: NavController, public ListesProvider : ListesProvider, public alertCtrl:AlertController) {

  }

  ModalAjout() {
    const prompt = this.alertCtrl.create({
      title: 'Créer une nouvelle liste',
      message: "Vous pourrez ensuite ajouter des articles en scannant leur code barre",
      inputs: [
        {
          name: 'Liste',  
          placeholder: 'Exemple : Courses'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Créer',
          handler: data => {
            if(data.Liste.length > 0) {
              this.ListesProvider.Ajouter(data.Liste);
              this.listes = this.ListesProvider.GetListes();
            }
          }
        }
      ]
    });
    prompt.present();
  }

}