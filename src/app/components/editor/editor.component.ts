import { Component, inject,} from '@angular/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  service = inject(NoteService);

  constructor() {
    setInterval(() => {
      this.service.saveNote()
    }, 4000);
  }

  ngOnInit() {
    const editor = document.getElementById("editor");

    if (editor) {
      editor.addEventListener("input", () => {
        this.service.noteDescription.set(editor.innerHTML);
      });
    }
  }
}
