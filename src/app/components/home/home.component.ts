import { Component, inject } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { NoteService } from '../../services/note.service';
import { CommonModule, DatePipe } from '@angular/common';
import { NoteBoxComponent } from "../note-box/note-box.component";

@Component({
  selector: 'app-home',
  imports: [EditorComponent, CommonModule, NoteBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   service = inject(NoteService);

   constructor() {
    this.service.getnotes();
    if (this.service.notesArray().length === 0) {
      this.service.createNewNote()
    }
  }
}
