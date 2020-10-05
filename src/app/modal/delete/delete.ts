import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';


@Component({
  selector: 'delete',
  templateUrl: 'delete.html',
  styleUrls: ['delete.css'],
})

export class DeleteComponent {
  title: string;

  constructor(private _bottomRef: MatBottomSheetRef<DeleteComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) data: any) {
    this.title = data.description;
  }

  sendResponse(response: string) {
    this._bottomRef.dismiss({
      res: response,
      title: this.title,
    });
  }
}
