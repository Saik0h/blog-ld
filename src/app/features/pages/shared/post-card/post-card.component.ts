import { DatePipe, SlicePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artigo } from '../../../../core/utils/types';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink, SlicePipe, DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) article!: Artigo;
}
