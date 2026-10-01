import { Component } from '@angular/core';
import { SignupForm } from '../signup-form/signup-form';

@Component({
  selector: 'app-root',
  imports: [SignupForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'exercice-web';
}

