import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActionType } from "classes/ActionType";
import { StatusDataService } from "app/status-data.service";
import { Status } from "classes/Status";

@Component({
  selector: 'edit-status-modal',
  templateUrl: './edit-status-modal.component.html',
  styleUrls: ['./edit-status-modal.component.css']
})
export class EditStatusModalComponent implements OnInit {

  @Output() onButtonClicked: EventEmitter<any> = new EventEmitter<any>(); 
  Status: Status = new ActionType();
  @Input('currentId') currentId: number; 

  constructor(private StatusService:StatusDataService) {    

  } 
  ngOnInit(){ 
  this.StatusService.getStatusById(this.currentId) 
                        .subscribe(response=>this.Status = response)   
  }

  editStatus(){   
    this.Status.id = this.currentId   
    console.log(this.currentId);
    this.StatusService.updateStatus(this.Status) 
                      .subscribe(response=> console.log(response)) 
    this.onButtonClicked.emit(); 
    location.reload()
  } 

  close(){ 
    this.onButtonClicked.emit();
  }

  addStatus(){ 
    this.onButtonClicked.emit()
  }  

}
