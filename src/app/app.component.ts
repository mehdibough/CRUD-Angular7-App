import { Component } from '@angular/core';
import { TacheService } from './tache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD-Angular7-App';
  allData : any;
  newTach: any = {
    id: '',
    title: '',
    description: '',
    assignedTo: '',
    status: ''
  };
  toUpdate = false;

  constructor(private tachService : TacheService){}

  ngOnInit(){
    this.tachService.getJSON().subscribe(data => {
        this.allData = data.taches;
    });
    console.log(this.allData);
  }

  delete(item){
    this.allData.forEach((element, index) => {
      if(element.title === item.title){
        this.allData.splice(index, 1);
      }
    });
  }

  edit(item){
    this.toUpdate = true;
    this.newTach = item;
  }

  onSubmite(){
    if(!this.toUpdate){
      this.newTach.id = this.allData[this.allData.length] + 1;
      this.allData.push(this.newTach);
    }else{
      this.allData.forEach((element, index) => {
        if(element.id === this.newTach.id){
          this.allData[index] = this.newTach;
        }
      });
    }
    this.newTach= {
      id:'',
      title: '',
      description: '',
      assignedTo: '',
      status: ''
    };
  }
}
