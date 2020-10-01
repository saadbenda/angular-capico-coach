import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

@Component({
    selector: 'assign',
    templateUrl: 'assign.html',
    styleUrls: ['assign.css'],
  }
)

export class AssignComponent implements OnInit {

  // exercises: Exercise[];
  nbTask: number;
  setTimeString: string;
  setTimeNumber: number;
  timeString: string;
  timeNumber: number;
  groupRoute: String;
  today: Moment = moment().startOf('day');
  todayTime: Moment = moment();
  startDate: Moment;
  // coach: User;
  endDate: Moment;
  isInferiorToToday: boolean;
  isSuperiorToStart: boolean;
  hours: string[] = [];
  minutes: string[] = [];
  labelController: FormControl;
  startHoursController = new FormControl('');
  startMinutesController = new FormControl('');
  endHoursController = new FormControl('');
  endMinutesController = new FormControl('');
  isPlannedController = new FormControl(false);
  durationOnController = new FormControl('');
  durationTimeController = new FormControl({value: '', disabled: true});
  randomTasksController = new FormControl(10);
  XCorrectController = new FormControl(5);
  YDoneController = new FormControl(10);
  lastAnswersController = new FormControl('');
  selectedExerciseType: string[] = [];
  allCheck: boolean;
  correctAnswersCheck: boolean;
  wrongAnswersCheck: boolean;
  undoneAnswersCheck: boolean;
  createRandomTaskCheck: boolean;
  XCorrectOutOfYDoneCheck: boolean;
  lessThanCheck: boolean;
  disableAssign: boolean;
  trainingId: number;
  // loggedUser: User;
  // DateType = DateType;

  assetTypeFormGroup: FormGroup;
  assetTypes = [
    {id: 1, name: 'COURSE'},
    {id: 2, name: 'PUZZLE'},
    {id: 3, name: 'EXERCISE'},
    {id: 4, name: 'QCM'},
    {id: 5, name: 'FILLEDBLANK'},
    {id: 6, name: 'OPEN ENDED QUESTION'},
    {id: 7, name: 'GENERATED QCM'}
  ];

  constructor() {
  }

  ngOnInit() {

    this.isInferiorToToday = false;
    this.isSuperiorToStart = false;
    this.startDate = this.today;
    this.hours = this.getTime(24);
    this.minutes = this.getTime(60);
    this.durationOnController.setValue(false);
    this.allCheck = false;
    this.correctAnswersCheck = false;
    this.wrongAnswersCheck = false;
    this.undoneAnswersCheck = false;
    this.createRandomTaskCheck = false;
    this.XCorrectOutOfYDoneCheck = false;
  }

  getTime(n: number): string[] {
    const num = [];
    for (let i = 0; i < n; i++) {
      if (i < 10) {
        num.push('0' + i);
      } else {
        num.push(i.toString());
      }
    }
    return num;
  }

  toggleDurationOn() {
    if (this.isPlannedController.value) {
      this.durationOnController.setValue(false);
    }
  }

  toggleDurationTime() {
    if (!this.durationOnController.value) {
      this.durationTimeController.enable();
      this.durationTimeController.setValue(60);
    } else {
      this.durationTimeController.disable();
      this.durationTimeController.reset();
    }
  }

}
