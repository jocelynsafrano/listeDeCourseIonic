import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the ListesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListesProvider {
  public listes = [];

//  public listes : any;

  constructor(public http: HttpClient, public storage: Storage) {
     var scope = this;

     this.GetListes().then((res)=>{
       scope.listes = res;
     })


  }

  GenerateId() {
    return (new Date().getTime() + Math.floor((Math.random()*1000) +1)).toString(16); 

    // var id = 0;
      // for(var i=0; i<this.listes.length; i++){
      //   if(this.listes[i].id > id) id = this.listes[i].id;
      // }
      // return ++id;
  }

  Ajouter(nom) {
    return new Promise <any> ((resolve, reject) => {
    var liste = {id: "", nom: "", produit : []};
    var id = this.GenerateId();
    liste.id = id;
    liste.nom = nom;
    liste.produit = [];
    this.listes.push(liste);
    this.storage.set("listes",this.listes);
    resolve(true);
    })
  }

  GetListes() {
    var scope = this;
    return new Promise <any> ((resolve, reject)=>{
      scope.storage.get("listes").then((res)=>{
        res = (res == null) ? [] : res;
        resolve(res);
      })
    })
  }

  Modifier(nouvNom, oldObj) {
    var scope = this;
    return new Promise <any> ((resolve, reject)=>{
      var index = scope.listes.indexOf(oldObj);
      
      var index = -1;
      for ( var i=0; i<this.listes.length; i++) {
        if(this.listes[i].id == oldObj.id) index = i;
      }

      if (index > -1) {
        scope.listes[index].nom = nouvNom;
        this.storage.set("listes",this.listes);
        resolve(true);
      }
    })
  }

  Supprimer(oldObj){
    var scope = this;
    return new Promise <any> ((resolve, reject)=>{
      var index = scope.listes.indexOf(oldObj);
      
      var index = -1;
      for ( var i=0; i<this.listes.length; i++) {
        if(this.listes[i].id == oldObj.id) index = i;
      }
      if (index > -1) {
        scope.listes.splice(index, 1);
        this.storage.set("listes",this.listes);
        resolve(true);
      }
    })
   }
   
   GetListe(id) {
    for(var i=0; i<this.listes.length; i++) {
      if(this.listes[i].id == id) return this.listes[i];
    }
    
  }
}

