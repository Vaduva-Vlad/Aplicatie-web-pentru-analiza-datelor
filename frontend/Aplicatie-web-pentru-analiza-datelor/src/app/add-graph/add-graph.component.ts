import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { GraphService } from 'src/services/graph.service';
import { ActivatedRoute } from '@angular/router';
import { CsvService } from 'src/services/csv.service';
import { keyable } from 'src/models/keyable';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrls: ['./add-graph.component.scss']
})
export class AddGraphComponent implements OnInit {

  constructor(private fileService:FileService,private graphService:GraphService,private route: ActivatedRoute,private csvService:CsvService) { }

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

  next(stepper:MatStepper){
    if (this.isDataSourceSelected){
      this.isThisStepDone=true;
      setTimeout(()=>{
        this.isThisStepDone=false;
        stepper.next()
      },1)
    }
  }

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

  resetDataSource(event:any){
    this.isDataSourceSelected=false
    this.selectedFile!=null
  }

  submit(){
    let graphData={"title":this.graphTitle,"type":this.selectedGraph,"dashboard_id":this.dashboardId,"data_source":this.dataSource}

    if(this.dataSource=="CSV"){
      this.graphService.addGraph(graphData).subscribe(response=>{
        this.graphId=response;
        this.fileService.uploadFile(this.selectedFile!,this.dashboardId!,this.graphId!).subscribe(response=>{
          this.fileService.sendSelectedColumns({"columns":this.availableColumns,"dashboard_id":this.dashboardId,"graph_id":this.graphId}).subscribe()
        })
      }) 
    }

    
  }

  parse(){
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

  updateColumnsList(column:string){
    this.availableColumns[column]=!this.availableColumns[column]
  }
}
