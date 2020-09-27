import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BehaviorSubject} from ''

/**
 * @title Stepper overview
 */


/** Flat node with expandable and level information */
interface CourseItemFlatNode {
  level: number;
  expandable: boolean;
  name: string;
}
interface CourseItemNode {
  children?: CourseItemNode[];
  name: string;
}

interface Student {
  value: string;
  viewValue: string;
}

interface Classe {
  value: string;
  viewValue: string;
}

 

const TREE_DATA: CourseItemNode[] = [
  {
    name: 'Physique',
    children: [
      {name: 'Gravité'},
      {name: 'Mécanique des fluides'},
      {name: 'Dualité onde/particule'},
    ]
  }, {
    name: 'Math',
    children: [
      {
        name: 'CP',
        children: [
          {name: 'Soustraction'},
          {name: 'Addition'},
        ]
      }, {
        name: 'Terminal S',
        children: [
          {name: 'Logarithme néperien'},
          {name: 'Statistiques'},
        ]
      },
    ]
  },
];


@Component({
  selector: 'app-coach',
  templateUrl: 'app-coach.html',
  styleUrls: ['app-coach.css'],
})
export class AppCoach implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedStudent: string;
  selectedClasse: string;
  classeControl = new FormControl('', Validators.required);
  studentControl = new FormControl('', Validators.required);
  classes: Classe[] = [
    {value: 'Sixième', viewValue: 'Sixième'},
    {value: 'Cinquième', viewValue: 'Cinquième'},
    {value: 'Quatrième', viewValue: 'Quatrième'},
    {value: 'CM2', viewValue: 'CM2'},
    {value: 'CM1', viewValue: 'CM1'},
    {value: 'CE2', viewValue: 'CE2'},
     {value: 'CE1', viewValue: 'CE1'},
     {value: 'CP', viewValue: 'CP'},

  ];
  

  students: Student[] = [
    {value: 'Julian', viewValue: 'Julian'},
    {value: 'Mateo', viewValue: 'Mateo'},
    {value: 'Anthony', viewValue: 'Anthony'},
    {value: 'Ryan', viewValue: 'Ryan'},
    {value: 'Thomas', viewValue: 'Thomas'},
    {value: 'Joshua', viewValue: 'Joshua'},
    {value: 'Christopher', viewValue: 'Christopher'}
  ];

   // treeControl: FlatTreeControl<CourseItemFlatNode>;
  // treeFlattener: MatTreeFlattener<CourseItemNode, CourseItemFlatNode>;
// dataSource: MatTreeFlatDataSource<CourseItemNode, CourseItemFlatNode>;

  constructor(private _formBuilder: FormBuilder) {
    this.dataSource.data = TREE_DATA;
  }
  private _transformer = (node: CourseItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<CourseItemFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

// -------------------------

 treeControlAssigned = new FlatTreeControl<CourseItemFlatNode>(
      node => node.level, node => node.expandable);

  dataSourceAssigned =  new MatTreeFlatDataSource(this.treeControlAssigned, this.treeFlattener);

  dataChange = new BehaviorSubject<CourseItemNode[]>([]);
  get data(): CourseItemNode[] { console.log('this.dataChange.value ',JSON.stringify(this.dataChange.value)); return this.dataChange.value; }
  this.dataChange.susbscribe(data=>{this.dataSourceAssigned.data = data;});

  insertItem(parent: CourseItemNode, node: CourseItemNode){
    if(parent.children){
      parent.children.push(node);
      this.dataChange.next(this.data);
    }
  }

  hasChild = (_: number, node: CourseItemFlatNode) => node.expandable;

  drop(event: CdkDragDrop<string[]>){
    console.log('dropped');
    // console.log(JSON.stringify(event));
    // console.log(event)
     console.log('origin/destination', event.previousIndex, event.currentIndex);
     console.log(event.item.data)
     const data = event.item.data;
     insertItem(event.item, )

     
     // this.dataSource.
    

  }
  getChildren(data: any){
    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

   
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */