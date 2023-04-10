import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private papa:Papa) { }

  parse(file:File){
    let reader:FileReader=new FileReader();
    reader.readAsText(file);

    reader.onload= e =>{
      let csv=reader.result;
      let results=this.papa.parse(csv as string).data;
      let result=[]

      for(let column=0;column<results[0].length;column++){
        let r=[]
        for(let row=0;row<results.length;row++){
          r.push(results[row][column]);
        }
        result.push(r)
      }
      console.log(result)
    }
  }
}
