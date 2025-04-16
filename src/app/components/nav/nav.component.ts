import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  service = inject(NoteService);
}
