import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteDescription = signal("");
  courrentNote = signal<Note | undefined>(undefined);
  notesArray = signal<Note[]>([]);
  darkMode = signal(false);
  isWriting = signal(false);

  constructor() {
    effect(() => {
      const currentNote = this.courrentNote();
      if (currentNote) {
        if (currentNote.desc !== this.noteDescription()) {
          currentNote.desc = this.noteDescription();
        } 
      }
    });
  }

  createNewNote() {

    if (this.courrentNote()) {
      this.courrentNote()!.isSelected = false;
    }

    let id: number;
    if (this.notesArray().length === 0) {
      id = 1;
    } else {
      const maxIdNote = Math.max(...this.notesArray().map((note: Note) => note.id));
      id = maxIdNote + 1;
    }

    const date = this.getDateTime();

    const note: Note = {
      id: id,
      creationDate: date,
      desc: this.noteDescription(),
      isSelected: true,
    };

    this.courrentNote.set(note);
    this.saveNote();

    this.noteDescription.set("");
  }

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

    // localStorage.clear()
    this.notesArray.update(oldArray => {
      const modifiedArray = oldArray.filter(note => note.id !== this.courrentNote()!.id);
      const currentNote = this.courrentNote();
      if (currentNote) {
        const dateModify = this.getDateTime();
        currentNote.lastModify = dateModify;
        return [currentNote, ...modifiedArray];
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

  selectNote(id: number) {
    this.notesArray().map((note) => note.isSelected = false);
    const selectedNote = this.notesArray().find((note) => note.id === id);
    if (selectedNote) {
      selectedNote.isSelected = true;
      this.courrentNote.set(selectedNote);
      this.noteDescription.set(this.courrentNote()!.desc)
    }
  }

  deleteNote(id: number) {
    const array = this.notesArray().filter(note => note.id !== id);
    this.notesArray.set(array);
    this.saveNote();
  }

  wordsCount() {
    if (this.noteDescription() === "") {
      return 0;
    }
    return this.noteDescription().split(" ").length;
  }

  charCount() {
    // let counter = 0;
    // let wordsArray = this.noteDescription().split(" ");
    // for (const word of wordsArray) {
    //   counter += word.length;
    // }
    // return counter;
    return this.noteDescription().length;
  }

  notesCount() {
    return this.notesArray().length;
  }

  // createNewTxtFile() {
  //   fs.writeFile(`file.txt`, `${this.courrentNote()?.desc}.txt`, function (err) {
  //     if (err) throw err;
  //     console.log('File is created successfully.');
  //   }); 
  // }

  downloadCurrentNoteAsTxt() {
    const currentNote = this.courrentNote();
    if (!currentNote) {
      alert("No note selected to download.");
      return;
    }
  
    const noteContent = currentNote.desc;
    const noteTitle = `Note_${currentNote.id}.txt`;
  
    // Create a Blob with the note content
    const blob = new Blob([noteContent], { type: 'text/plain' });
  
    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = noteTitle;
  
    // Append the anchor to the body, trigger the download, and remove it
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  
    console.log(`Downloaded: ${noteTitle}`);
  }
}
