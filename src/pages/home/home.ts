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
    var scope = this;
    this.ListesProvider.GetListes().then((res)=>{
      scope.listes = res;
    })
  }

  ModalAjout() {
    const prompt = this.alertCtrl.create({
      title: 'Créer une nouvelle liste',
      message: "Vous pourrez ensuite ajouter des articles en scannant leur code barre",
      inputs: [
        {
          name: 'Liste',  
          placeholder: 'Exemple : Poisson'
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
              this.ListesProvider.Ajouter(data.Liste).then(()=>{
                this.ListesProvider.GetListes().then((res)=>{
                  this.listes = res;
                })
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }

  ModalModif(myObj) {
    const prompt = this.alertCtrl.create({
      title: 'Modifier la liste',
      message: "Vous pourrez ensuite ajouter des articles en scannant leur code barre",
      inputs: [
        {
          name: 'Liste',  
          placeholder: 'Exemple : Poisson'
          //value = myObj.nom;
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
          text: 'Modifier',
          handler: data => {
            if(data.Liste.length > 0) {
              this.ListesProvider.Modifier(data.Liste, myObj).then(()=>{
                this.ListesProvider.GetListes().then((res)=>{
                  this.listes = res;
                })
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }

  ModalSuppr(myObj) {
    const prompt = this.alertCtrl.create({
      title: 'Supprimer la liste',
      message: "Êtes-vous sûr de vouloir supprimer cette liste ?",
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: data => {
            this.ListesProvider.Supprimer(myObj).then(()=>{
              this.ListesProvider.GetListes().then((res)=>{
                this.listes = res;
              })
            })
          }
        }
      ]
    });
    prompt.present();
  }

}