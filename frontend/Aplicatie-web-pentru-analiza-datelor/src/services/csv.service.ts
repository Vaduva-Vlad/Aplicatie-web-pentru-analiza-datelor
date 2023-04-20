import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private papa:Papa) { }

  parse(file:File):Observable<string[][]>{
    let reader:FileReader=new FileReader();
    const result=new Subject<string[][]>();

    reader.onload= e =>{
      let csv=reader.result;
      let results=this.papa.parse(csv as string).data;
      let res=[]

      for(let column=0;column<results[0].length;column++){
        let r=[]
        for(let row=0;row<results.length;row++){
          r.push(results[row][column]);
        }
        res.push(r)
      }
      result.next(res)
      result.complete()
    }

    reader.readAsText(file);
    return result.asObservable()
  }
}
