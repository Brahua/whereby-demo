import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMeeting, Meeting } from 'src/app/core/interfaces/whereby.interface';
import { WherebyService } from 'src/app/core/services/whereby.service';
import { MessageUtil } from 'src/app/core/util/util';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  formMeeting: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private wherebyService: WherebyService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formMeeting = this.formBuilder.group({
      roomNamePrefix: ['', Validators.required],
      roomMode: ['normal', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  get roomNamePrefix() {
    return this.formMeeting.get('roomNamePrefix');
  }
  get roomMode() {
    return this.formMeeting.get('roomMode');
  }
  get startDate() {
    return this.formMeeting.get('startDate');
  }
  get endDate() {
    return this.formMeeting.get('endDate');
  }
  get fields() {
    return this.formMeeting.get('fields');
  }

  createMeeting() {

    console.log(this.formMeeting.value);
    if (this.formMeeting.invalid) {
      return Object.values(this.formMeeting.controls).forEach(control => control.markAsTouched());
    }

    MessageUtil.loading();

    const meeting: IMeeting = {
      roomNamePrefix: this.roomNamePrefix.value,
      roomMode: this.roomMode.value,
      startDate: (this.startDate.value as Date).toISOString(),
      endDate: (this.endDate.value as Date).toISOString(),
      fields: ['hostRoomUrl']
    };

    console.log(meeting);

    this.wherebyService.createMeeting(meeting)
      .subscribe(respuesta => {
        const data: Meeting = {
          roomNamePrefix: this.roomNamePrefix.value,
          roomMode: this.roomMode.value,
          startDate: this.startDate.value,
          endDate: this.endDate.value,
          meetingId: respuesta.dato.meetingId,
          hostRoomUrl: respuesta.dato.hostRoomUrl,
          roomUrl: respuesta.dato.roomUrl
        };
        console.log(data);
        this.dialogRef.close(data);
        MessageUtil.success('Sala creada correctamente');
      }, error => MessageUtil.error('Ocurrió un error al intentar guardar una sala'));

  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}
