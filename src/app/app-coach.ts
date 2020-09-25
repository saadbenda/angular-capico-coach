import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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

 const todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  const done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

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

  dataSourceAssigned =  new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

   




  hasChild = (_: number, node: CourseItemFlatNode) => node.expandable;

  drop(event: CdkDragDrop<string[]>){
    console.log('dropped');
    // console.log(JSON.stringify(event));
    // console.log(event)
     console.log('origin/destination', event.previousIndex, event.currentIndex);
     console.log(event.item.data)
     const data = event.item.data;
     this.getChildren(data);

     
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