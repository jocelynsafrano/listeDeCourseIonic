import { ListesProvider } from './../../providers/listes/listes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ProduitsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-produits',
  templateUrl: 'produits.html',
})
export class ProduitsPage {

  public liste:any = {};
  public id:any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public ListesProvider : ListesProvider, public BarcodeScanner: BarcodeScanner ) {
    this.id = this.navParams.get("id");
    this.liste = this.ListesProvider.GetListe(this.id);
  }

  Scanner() {
    this.BarcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduitsPage');
  }

}
