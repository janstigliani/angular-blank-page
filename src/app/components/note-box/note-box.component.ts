import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-note-box',
  imports: [],
  templateUrl: './note-box.component.html',
  styleUrl: './note-box.component.scss'
})
export class NoteBoxComponent {

  date = input("", { alias: "creation-date" });
  desc = input(undefined, { transform: (value: string) => this.createTitle(value) });

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
