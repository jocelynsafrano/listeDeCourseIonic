import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ListesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListesProvider {
  public listes : [any] = [];

//  public listes : any;

  constructor(public http: HttpClient) {
  }

  GenerateId() {
      var id = 0;
      for(var i=0; i<this.listes.length; i++){
        if(this.listes[i].id > id) id = this.listes[i].id;
      }
      return ++id;
  }

  Ajouter(nom) {
    var liste = {id: 0, nom: "", produit : []};
    var id = this.GenerateId();
    liste.id = id;
    liste.nom = nom;
    liste.produit = [];
    this.listes.push(liste);
  }

  GetListes() {
    return this.listes;
  }
}

