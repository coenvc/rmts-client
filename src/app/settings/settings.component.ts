import { Component, OnInit } from "@angular/core";
import { StatusDataService } from "../../../src/app/status-data.service";
import { ProfessionDataService } from "../../../src/app/profession-data.service";
import { ActiontypeDataService } from "../../../src/app/actiontype-data.service";

import { Status } from "../../classes/Status";
import { Profession } from "../../classes/Profession";
import { ActionType } from "../../classes/ActionType";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../styles/buttons.css']
})
export class SettingsComponent implements OnInit {

  statuses: Status[];
  professions: Profession[];
  actiontypes: ActionType[];
  //
  statusesCount: string = "0";
  professionsCount: string = "0";
  actiontypesCount: string = "0";
  //
  statusesSearch: string = "";
  professionsSearch: string = "";
  actiontypesSearch: string = "";
  //
  statusSearchText: string = "";
  actionSearchText: string = "";
  //booleans to show and hide the modals to add a new action 
  addStatusModalVisible: boolean = false;
  addActionModalVisible: boolean = false;

  editActionModalVisible: boolean = false;
  editStatusModalVisible: boolean = false;

  currentActionId: number = 0;
  currentStatusId: number = 0;

  Status: Status = new Status();
  Profession: Profession = new Profession();
  ActionType: ActionType = new ActionType();

  Math: any;

  constructor(private statusDataService: StatusDataService,
    private professionDataService: ProfessionDataService,
    private actiontypedataService: ActiontypeDataService) {
      this.Math = Math
  }

  ngOnInit() {
    this.statusDataService.getAll().subscribe(request => this.mapAndCountStatus(request));
    this.professionDataService.getAll().subscribe(request => this.mapAndCountProfession(request));
    this.actiontypedataService.getAll().subscribe(request => this.mapAndCountActiontype(request));
  }

  mapAndCountStatus(request: Status[]) {
    this.statuses = request;
    this.statusesCount = this.statuses.length.toString();
  }

  mapAndCountProfession(request: Profession[]) {
    this.professions = request;
    this.professionsCount = this.professions.length.toString();
  }

  mapAndCountActiontype(request: ActionType[]) {
    this.actiontypes = request;
    this.actiontypesCount = this.actiontypes.length.toString();
  }

  postStatus() {
    this.statusDataService.postStatus(this.Status)
      .subscribe()
  }

  postActionType() {
    this.actiontypedataService.register(this.ActionType)
      .subscribe()
  }

  deleteAction(id) {
    if (window.confirm("Weet je zeker dat je deze activiteit wilt verwijderen?")) {
      this.actiontypedataService.delete(id)
        .subscribe(
        request => { this.actiontypedataService.getAll().subscribe(request => this.actiontypes = request) },
        error => { window.alert("Activiteit kan niet verwijderd worden omdat deze in gebruik is") }
        );
    }
  }

  deleteStatus(id) {
    if (window.confirm("Weet je zeker dat je deze status wilt verwijderen?")) {
      this.statusDataService.delete(id)
        .subscribe(
        request => { this.statusDataService.getAll().subscribe(request => this.statuses = request); },
        error => { window.alert("Status kan niet verwijderd worden omdat deze in gebruik is") }
        );
    }
  }
  postProfession() {
    this.professionDataService.register(this.Profession)
      .subscribe();
  }


  //Methods to show the modals
  showAddStatusModal() {
    this.addStatusModalVisible = true;
  }
  closeAddStatusModal() {
    this.addActionModalVisible = false;
    this.addStatusModalVisible = false;
  }
  closeEditStatusModal() {
    this.addActionModalVisible = false;
    this.addStatusModalVisible = false;
  }

  showAddActionModal() {
    this.addActionModalVisible = true;
  }

  showEditAction(event) {
    let id = event.srcElement.id;
    this.currentActionId = id;
    this.editActionModalVisible = true
  }

  showEditStatus(event) {
    let id = event.srcElement.id;
    this.currentStatusId = id;
    this.editStatusModalVisible = true
  }

  showModal() {
    this.editStatusModalVisible = false
    this.statusDataService.getAll().subscribe(request => this.statuses = request);
  }

  completeAddActionModal() {
    this.addActionModalVisible = false
    this.actiontypedataService.getAll().subscribe(request => this.actiontypes = request);
  }

  completeAddStatusModal() {
    this.addStatusModalVisible = false
    this.statusDataService.getAll().subscribe(request => this.statuses = request);
  }

  completeEditActionModal() {
    this.editActionModalVisible = false
    this.actiontypedataService.getAll().subscribe(request => this.actiontypes = request)
  }
} 
