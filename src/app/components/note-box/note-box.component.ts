import { Component, inject, input, signal } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-note-box',
  imports: [MatIconModule],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.scss'
})
export class NoteBoxComponent {

  service = inject(NoteService);

  date = input("", { alias: "creation-date" });
  desc = input(undefined, { transform: (value: string) => this.createTitle(value) });
  id = input(0);

  createTitle(value: string): string | undefined {
    if (value) {
      const pseudoTitle = value.split(" ").slice(0, 4).join(" ");
      if (pseudoTitle.length > 50) {
        return value.split(" ").slice(0, 3).join(" ").toUpperCase();
      }
      return pseudoTitle.toUpperCase();
    }
    return "Write something...";
  }

}
