import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, CommonModule],
  providers: [NgForm],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {}
