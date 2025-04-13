import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteDescription = signal("");
  courrentNote = signal<Note | undefined>(undefined);
  notesArray = signal<Note[]>([]);

  constructor() {
    effect(() => {
      const currentNote = this.courrentNote();
      if (currentNote) {
        currentNote.desc = this.noteDescription();
      }
    });
  }

  createnewNote() {

    let id: number;
    if (this.notesArray.length === 0) {
      id = 1;
    } else {
      const maxIdNote = Math.max(...this.notesArray().map((note: Note) => note.id));
      id = maxIdNote + 1;
    }

    const date = this.getDateTime();

    const note:Note = {
      id: id,
      creationDate: date,
      desc: this.noteDescription(),
      isSelected: true, 
    }

    this.courrentNote.set(note)
    this.saveNote()
  };

  getDateTime() {
    const date = new Date();
    const readableDate = date.toDateString();

    const secondsN = date.getUTCSeconds();
    const minutesN = date.getUTCMinutes();
    const hoursN = date.getUTCHours();

    const hours = (hoursN < 10) ? "0" + `${hoursN}` : `${hoursN}`;
    const minutes = (minutesN < 10) ? "0" + `${minutesN}` : `${minutesN}`;
    const seconds = (secondsN < 10) ? "0" + `${secondsN}` : `${secondsN}`;

    return readableDate + " " + hours + ":" + minutes + ":" + seconds;
  };

  saveNote() {

    localStorage.clear()
 
    this.notesArray.update(oldArray => {
      const modifiedArary = oldArray.filter(note => note.id !== this.courrentNote()!.id);
      const currentNote = this.courrentNote();
      if (currentNote) {
        return [...modifiedArary, currentNote];
      }
      return oldArray;
    });

    localStorage.setItem("notes", JSON.stringify(this.notesArray()));
  };

  getnotes() {
    const noteArrayString = localStorage.getItem("notes");
    if (noteArrayString) {
      const array = JSON.parse(noteArrayString);
      this.notesArray.set(array);
    } else {
      localStorage.setItem("notes", JSON.stringify(this.notesArray()));
    }
  }
}
