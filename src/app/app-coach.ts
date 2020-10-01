import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AssignComponent} from './modal/assign/assign';
import {map, startWith} from 'rxjs/operators';
import {GroupComponent} from './modal/group/group';

/**
 * @title Stepper overview
 */


/** Flat node with expandable and level information */
export class CourseItemFlatNode {
  level: number;
  expandable: boolean;
  name: string;

}

export class CourseItemNode {
  children?: CourseItemNode[];
  name: string;

}

export class Student {
  value: string;
  viewValue: string;
}

export class Classe {
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

const TREE_DATA_ADDED: CourseItemNode[] = [];

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<CourseItemNode[]>([]);
  dataChange2 = new BehaviorSubject<CourseItemNode[]>([]);


  get data(): CourseItemNode[] {
    console.log('this.dataChange.value ', JSON.stringify(this.dataChange.value));
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // const data = this.buildFileTree(TREE_DATA, 0);
    // this.dataChange.next(data);

  }

  buildFileTree(obj: { [key: string]: any }, level: number): CourseItemNode[] {
    return Object.keys(obj).reduce<CourseItemNode[]>((accumulator, key) => {
      const value = obj[key];
      console.log('value ', value, '\n', typeof value);
      const node = new CourseItemNode();
      node.name = key;
      console.log('key ', key);
      if (value != null) {
        if (typeof value === 'object') {
          console.log('obj !');
          node.children = this.buildFileTree(value, level + 1);
        } else {
          console.log('else ', value);
          node.name = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }


}

@Component({
  selector: 'app-coach',
  templateUrl: 'app-coach.html',
  styleUrls: ['app-coach.css'],
  providers: [ChecklistDatabase]
})
export class AppCoach implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedStudent: string;
  selectedClasse: string;
  classeControl = new FormControl('', Validators.required);
  studentControl = new FormControl('', Validators.required);
  filteredOptions: Observable<Student[]>;
  myControl = new FormControl();
  isExpand = false;

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
    {value: 'Tout les élèves', viewValue: 'Tout les élèves'},
    {value: 'Julian', viewValue: 'Julian'},
    {value: 'Mateo', viewValue: 'Mateo'},
    {value: 'Anthony', viewValue: 'Anthony'},
    {value: 'Ryan', viewValue: 'Ryan'},
    {value: 'Thomas', viewValue: 'Thomas'},
    {value: 'Joshua', viewValue: 'Joshua'},
    {value: 'Christopher', viewValue: 'Christopher'}
  ];


  academies = [];
  etabSelected = 'Lycée Carnot';

  treeControl: FlatTreeControl<CourseItemFlatNode>;
  treeControlAssigned: FlatTreeControl<CourseItemFlatNode>;

  treeFlattener: MatTreeFlattener<CourseItemNode, CourseItemFlatNode>;
  dataSource: MatTreeFlatDataSource<CourseItemNode, CourseItemFlatNode>;
  dataSourceAssigned: MatTreeFlatDataSource<CourseItemNode, CourseItemFlatNode>;
  result = [];

// dataChange = new BehaviorSubject<CourseItemNode[]>([]);

  constructor(private _formBuilder: FormBuilder,
              private databa: ChecklistDatabase, private _snackBar: MatSnackBar,
              private _dialog: MatDialog) {


    this.treeControl = new FlatTreeControl<CourseItemFlatNode>(
      node => node.level, node => node.expandable);

    this.treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.treeControlAssigned = new FlatTreeControl<CourseItemFlatNode>(
      node => node.level, node => node.expandable);

    this.dataSourceAssigned = new MatTreeFlatDataSource(this.treeControlAssigned, this.treeFlattener);
    // this.dataSource.data = TREE_DATA;
    databa.dataChange.next(TREE_DATA);
    databa.dataChange.subscribe(data => {
      console.log('databa.dataChange.subscribe', data);
      this.dataSource.data = data;
    });

    databa.dataChange2.subscribe(data => {
      console.log('databa.dataChange2.subscribe', data);
      this.dataSourceAssigned.data = data;
    });


  }

  private _transformer = (node: CourseItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };


  hasChild = (_: number, node: CourseItemFlatNode) => node.expandable;

  drop(event: CdkDragDrop<string[]>) {
    console.log('dropped');
    // console.log(JSON.stringify(event));
    // console.log(event)
    console.log('origin/destination', event.previousIndex, event.currentIndex);
    console.log('event.item.data ', event.item.data);
    const data = event.item.data;
    this.insertItem(event.item.data);


    // this.dataSource.


  }

  insertItem(parent: any) {
    console.log('this.data ', parent);
    // const test = this.getChildren2(TREE_DATA, parent);
    try {
      this.getChildren(TREE_DATA, parent);
    } catch (e) {
      console.log('catch ', JSON.stringify(e));
      TREE_DATA_ADDED.push(e);
    }
    // this.dataSourceAssigned.data = test;
    console.log('test ', JSON.stringify(this.result));
  }

  getChildren2(tree: Array<any>, node: any): any {
    // let result : any = [];
    if (tree) {
      tree.forEach(data => {
        if (data.name === node.name) {
          console.log('data ', JSON.stringify(data));
          console.log('tree ', JSON.stringify(tree));
          this.result = data;
          // return result;
        } else {
          if (this.result === []) {
            console.log('else');
            console.log('data.children ', JSON.stringify(data.children));
            console.log('else ', data.children.length);
            this.getChildren2(data.children, node);
          }
        }
      });
    }
  }

  getChildren(tree: any, node: any): any {
    tree.forEach((data: any) => {
      if (data.name === node.name) {
        console.log('data ', JSON.stringify(data));
        console.log('tree ', JSON.stringify(tree));
        throw data;
      } else {
        console.log('else');
        if (data.children) {
          console.log('data.children ', JSON.stringify(data.children));
          console.log('else ', data.children.length);
          this.getChildren(data.children, node);
        }
      }
    });


  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.students.slice())
      );

  }


  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });

  }

  openAssign() {
    const dialogRef = this._dialog.open(AssignComponent);
  }

  displayFn(student: Student): string {
    return student && student.value ? student.value : '';
  }

  private _filter(name: string): Student[] {
    const filterValue = name.toLowerCase();

    return this.students.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);
  }

  changeEtab(name: string) {
    this.etabSelected = name;
    this.isExpand = false;
  }

  openAddGroupDialog(descri: string) {
    const config = new MatDialogConfig();
    config.data = {
      description: descri,
    };
    const dialogRef = this._dialog.open(GroupComponent, config);
    dialogRef.afterClosed().subscribe(
      data => console.log(data)
    );

  }


}


/**  Copyright 2020 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
