import { Component, effect, signal, SimpleChanges } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  desc = signal("");

  ngOnInit() {
    const editor = document.getElementById("editor");

    if (editor) {
      editor.addEventListener("input", () => {
        this.desc.set(editor.innerHTML);
      });
    }
  }
}
