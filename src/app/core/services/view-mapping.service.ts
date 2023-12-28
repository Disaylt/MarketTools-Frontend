import { Injectable } from '@angular/core';
import { ViewDataImplement, ViewResult } from '../models/view-result.model';

@Injectable({
  providedIn: 'root'
})
export class ViewMappingService {

  constructor() { }

  map<T>(data : T) : ViewResult<T>{
    return {
      data : data,
      viewData : new ViewDataImplement()
    }
  } 
}
