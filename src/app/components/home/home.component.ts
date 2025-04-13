import { Component, inject } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { NoteService } from '../../services/note.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [EditorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   service = inject(NoteService);

   constructor() {
    this.service.getnotes();
    if (this.service.notesArray().length === 0) {
      this.service.createnewNote()
    } else {
      
    }
  }
}
