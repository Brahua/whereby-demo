import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateMeetingComponent } from 'src/app/shared/components/create-meeting/create-meeting.component';
import { Meeting } from 'src/app/core/interfaces/whereby.interface';
import { MessageUtil } from 'src/app/core/util/util';
import { WherebyService } from 'src/app/core/services/whereby.service';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss']
})
export class DialogEventComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meeting,
    private wherebyService: WherebyService
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(null);
  }

  delete() {
    MessageUtil.deleteOption()
      .then((result) => {
        if (result.value) {
          this.dialogRef.close(this.data);
          MessageUtil.loading();
          this.wherebyService.deleteMeeting(this.data.meetingId)
            .subscribe(response => {
              this.dialogRef.close(this.data);
            }, error => MessageUtil.error('Ocurrió un error al eliminar la sala ' + this.data.meetingId));
        }
      });
  }

}
