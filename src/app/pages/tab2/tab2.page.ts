import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment,{static: true}) segment: IonSegment;

  categorias = [
    {
    name:'business',
    icon:'business'
    }, 
    {
      name:'entertainment',
      icon:'desktop-outline'
    },
    {
      name:'general',
      icon:'planet-outline'
    }, 
    {
      name:'health',
      icon:'bandage-outline'
    }, 
    {
      name:'science',
      icon:'flask-outline'
    }, 
    {
      name:'sports',
      icon:'football-outline'
    },{
      name:'technology',
      icon:'laptop-outline'
    }];
    noticias: Article[] = []

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    // console.log(this.categorias[0]);
    this.segment.value = this.categorias[0].name;
    this.cargarNoticias(this.categorias[0].name);
  }
  cambioCategoria(event){

  //  console.log(event.detail.value);
   this.noticias = [];
   this.cargarNoticias(event.detail.value);
  }
  cargarNoticias(categoria: string, event?){

    this.noticiasService.getTopHeadlineCategorias(categoria)
            .subscribe(resp =>{
              // console.log(resp);
              this.noticias.push(...resp.articles);
              if (event) {
                event.target.complete();
              }
            });
  }
  loadData($event){
    this.cargarNoticias( this.segment.value, event);
  }

}
