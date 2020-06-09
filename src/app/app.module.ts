import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CreateMeetingComponent } from './shared/components/create-meeting/create-meeting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { HomeComponent } from './components/home/home.component';
import { DialogEventComponent } from './components/home/dialog-event/dialog-event.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingsComponent,
    HomeComponent,
    DialogEventComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [
    CreateMeetingComponent, DialogEventComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
