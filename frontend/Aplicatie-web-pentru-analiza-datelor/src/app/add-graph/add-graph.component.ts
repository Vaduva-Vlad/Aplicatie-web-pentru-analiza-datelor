import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-graph',
  templateUrl: './add-graph.component.html',
  styleUrls: ['./add-graph.component.scss']
})
export class AddGraphComponent implements OnInit {

  constructor() { }

  @ViewChild('addGraph') stepper:MatStepper|undefined
  isThisStepDone:boolean=false

  ngOnInit(): void {
  }

  next(stepper:MatStepper){
    this.isThisStepDone=true;
    setTimeout(()=>{
      this.isThisStepDone=false;
      stepper.next()
    },1)
  }

}
