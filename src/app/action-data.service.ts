import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { folder, host } from "classes/global";
import { Action } from "classes/Action";
import { ActionType } from "classes/ActionType";
import { ActionOverview } from "classes/ActionOverview"
import { HttpClientService } from "app/http-client.service";
@Injectable()
export class ActionDataService {
  apiUrl = host + folder;
  constructor(private http: HttpClientService) {
  }

  getAll(): Observable<Action[]> {
    const prospects = Observable.from(this.http.get(this.apiUrl + 'action/all').map((res: Response) => res.json()))

    return prospects;
  }

  getByProspectId(id: number): Observable<Action[]> {
    const Actions = Observable.from(this.http.get(this.apiUrl + "action/all/prospect/" + id).map((res: Response) => res.json()))
    return Actions
  }

  getByUserId(id: number): Observable<Action[]> {
    const Actions = Observable.from(this.http.get(this.apiUrl + "action/all/user/" + id).map((res: Response) => res.json()))
    return Actions
  }

  getActionById(id: number): Observable<Action> {
    const Action = Observable.from(this.http.get(this.apiUrl + "action/" + id).map((res: Response) => res.json()))
    return Action;
  }

  getActionTypes(): Observable<ActionType[]> {
    const Action = Observable.from(this.http.get(this.apiUrl + "actionType/all").map((res: Response) => res.json()))
    return Action;
  }


  register(action: Action) {
    const headers = new Headers();
    return this.http.post(this.apiUrl + 'action/', action);
  }

  getProspectActionsUnsorted(id: number) {
    return Observable.from(this.http.get(this.apiUrl + "action/all/unsorted/prospect/" + id).map((res: Response) => res.json()));
  }

  updateAction(action: Action) {
    return this.http.put(this.apiUrl + "action/", action)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'))
  }

  getUserActionOverview(id: number): Observable<ActionOverview> {
    return this.http.get(this.apiUrl + "action/all/user/" + id)
      .map((res: Response) => res.json())

  }

  getAllActionsOverview(): Observable<ActionOverview> {
    return this.http.get(this.apiUrl + 'action/all/sorted')
      .map((res: Response) => res.json());
  }
}
