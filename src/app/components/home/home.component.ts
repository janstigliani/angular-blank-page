import { Component, inject } from '@angular/core';
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

   constructor() {
    this.service.getnotes();
    if (this.service.notesArray().length === 0) {
      this.service.createNewNote()
    } else {
      this.service.notesArray().find(note => (note.lastModify? note.lastModify : note.creationDate) ) 
    }
  }
}
