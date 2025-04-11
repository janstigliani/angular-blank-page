import { Injectable, signal, WritableSignal } from '@angular/core';
import { Note } from '../models/note';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  courrentNote = signal<Note|undefined>(undefined);
  notesArray = signal<Note[]>([]);
  
  constructor() {
    setInterval(() => {
      this.saveNote(this.courrentNote)
    }, 3000);
   }
  saveNote(courrentNote: WritableSignal<Note | undefined>) {
    
  }
  

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
