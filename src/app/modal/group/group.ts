import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'group',
  templateUrl: 'group.html',
  styleUrls: ['group.css'],
})

export class GroupComponent {
  form: FormGroup;
  description: string;

  constructor(private _dialogRef: MatDialogRef<GroupComponent>,
              private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.description = data.description;
    this.form = _fb.group({
      description: [],
    });
  }

  save() {
    this._dialogRef.close(this.form.value);
  }

  close() {
    this._dialogRef.close();
  }
}
