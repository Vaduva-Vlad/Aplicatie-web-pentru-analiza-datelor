import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { GraphService } from 'src/services/graph.service';
import { ActivatedRoute } from '@angular/router';
import { CsvService } from 'src/services/csv.service';
import { keyable } from 'src/models/keyable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonService } from 'src/services/json.service';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrls: ['./add-graph.component.scss']
})
export class AddGraphComponent implements OnInit {

  constructor(private fileService:FileService,private graphService:GraphService,private route: ActivatedRoute,private csvService:CsvService,private snackbar:MatSnackBar,private jsonService:JsonService) { }

  @ViewChild('addGraph') stepper:MatStepper|undefined
  isThisStepDone:boolean=false
  selectedGraph:string=''
  dataSource:string=''
  selectedFile:File|undefined
  isDataSourceSelected:boolean=false
  isLinear:boolean=true
  graphTitle:string=''
  dashboardId:number|undefined
  graphId:number|undefined
  availableColumns:keyable={}
  columnsList:string[]=[]

  ngOnInit(): void {
  }

  // Trecem la următorul pas dacă sursa de date a fost selectată și setăm variabila isThisStepDone înapoi la false
  next(stepper:MatStepper){
    if (this.isDataSourceSelected){
      this.isThisStepDone=true;
      setTimeout(()=>{
        this.isThisStepDone=false;
        stepper.next()
      },1)
    }
  }

  // Trecem la următorul pas dacă graficul a fost selectat și setăm variabila isThisStepDone înapoi la false
  onGraphSelect(stepper:MatStepper,graphType:string){
    this.isThisStepDone=true;
    setTimeout(()=>{
      this.isThisStepDone=false;
      this.selectedGraph=graphType
      stepper.next()
    },1)
  }

  onSelectedFile(event:any){
    this.selectedFile=event.target.files[0]
    this.isDataSourceSelected=true
  }

  //În cazul in care utilizatorul schimbă sursa de date după ce o selectează o dată.
  resetDataSource(event:any){
    this.isDataSourceSelected=false
    this.selectedFile!=null
  }

  validateColumnCount(){
    let selectedColumns:number=0
    Object.keys(this.availableColumns).forEach((key:string) => {
      if(this.availableColumns[key]==true){
        selectedColumns++;
      }
    });
    if(this.selectedGraph!="waterfall" && selectedColumns==2){
      return true;
    }
    else if(this.selectedGraph=="waterfall" && selectedColumns==3){
      return true;
    }
    return false
  }

  submit(){
    if(this.validateColumnCount()){
      let user_id=localStorage.getItem('user_id');
      let graphData={"title":this.graphTitle,"type":this.selectedGraph,"dashboard_id":this.dashboardId,"user_id":user_id,"data_source":this.dataSource}

      if(this.dataSource=="csv" || this.dataSource=="json"){
        this.graphService.addGraph(graphData).subscribe(response=>{
          this.graphId=response;
          this.fileService.uploadFile(this.selectedFile!,this.dashboardId!,this.graphId!,this.dataSource).subscribe(response=>{
            this.fileService.sendSelectedColumns({"columns":this.availableColumns,"dashboard_id":this.dashboardId,"graph_id":this.graphId,"source":this.dataSource}).subscribe(response=>location.reload())
          })
        }) 
      }
    }
    else{
      if(this.selectedGraph=="waterfall"){
        this.snackbar.open("Trebuie să selectați 3 coloane!","",{
          duration:3000
        })
      }
      else{
        this.snackbar.open("Trebuie să selectați 2 coloane!","",{
          duration:3000
        })
      }
    }
  }

  // Citim fișierul și preluăm coloanele.
  parse(){
    if(this.dataSource=="csv"){
      let columns:string[][]=[]
      let columnNames:string[]=[]
      this.csvService.parse(this.selectedFile!).subscribe(result=>{
        columns=result;
        for(let column of columns){
          columnNames.push(column[0])
          this.availableColumns[column[0]]=false
        }
        this.columnsList=columnNames
      })
    }
    else if (this.dataSource=="json"){
      const reader=new FileReader();
      reader.readAsText(this.selectedFile!,"UTF-8");
      let data;
      reader.onload=()=>{
        data=JSON.parse(<string>reader.result!)
        let columns=Object.keys(data);
        for(let column of columns){
          this.availableColumns[column]=false
        }
        this.columnsList=columns
      }
    }
  }

  updateColumnsList(column:string){
    this.availableColumns[column]=!this.availableColumns[column]
  }
}
