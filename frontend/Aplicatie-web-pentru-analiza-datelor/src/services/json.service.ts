import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  parse(file:File):Observable<Object>{
    const reader=new FileReader();
    reader.readAsText(file,"UTF-8");
    reader.onload=()=>{
      return of(JSON.parse(<string>reader.result!))
    }
    return of({})
  }
}
