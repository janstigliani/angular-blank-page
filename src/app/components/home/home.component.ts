import { Component, effect, inject } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { NoteService } from '../../services/note.service';
import { CommonModule, DatePipe } from '@angular/common';
import { NoteBoxComponent } from "../note-box/note-box.component";
import { CountersComponent } from "../counters/counters.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-home',
  imports: [EditorComponent, CommonModule, NoteBoxComponent, CountersComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  service = inject(NoteService);
  brightMode = true;

  currentClasses = {
    "main-container1": true,
    "main-container2": false,
  };

  constructor() {
    this.service.getnotes();
    if (this.service.notesArray().length === 0) {
      this.service.createNewNote()
    }

    effect(() => {
      console.log("Dark mode value:", this.service.darkMode());
      this.changeTheme();
    });
  }

  changeTheme() {
    this.brightMode = !this.brightMode;
    this.currentClasses['main-container1'] = !this.currentClasses['main-container1'];
    this.currentClasses['main-container2'] = !this.currentClasses['main-container2'];

    console.log('Updated currentClasses:', this.currentClasses);
  }

}
