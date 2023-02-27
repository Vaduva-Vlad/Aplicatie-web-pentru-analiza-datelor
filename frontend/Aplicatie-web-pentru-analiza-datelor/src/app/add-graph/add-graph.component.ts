import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { FileService } from 'src/services/file.service';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrls: ['./add-graph.component.scss']
})
export class AddGraphComponent implements OnInit {

  constructor(private fileService:FileService) { }

  @ViewChild('addGraph') stepper:MatStepper|undefined
  isThisStepDone:boolean=false
  selectedGraph:string=''
  dataSource:string=''
  selectedFile:File|undefined
  isDataSourceSelected:boolean=false
  isLinear:boolean=true
  graphTitle:string=''

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

  uploadFile(){
    this.fileService.uploadFile(this.selectedFile!).subscribe(response=>console.log(response))
  }
}
