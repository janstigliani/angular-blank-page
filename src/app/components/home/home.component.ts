import { Component } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-home',
  imports: [EditorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
