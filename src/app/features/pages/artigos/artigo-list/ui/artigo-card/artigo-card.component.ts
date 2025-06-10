import { Component, Input } from '@angular/core';
import { Artigo } from '../../../../../../core/utils/types';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artigo-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './artigo-card.component.html',
  styleUrl: './artigo-card.component.css',
})
export class ArtigoCardComponent {
  @Input({ required: true }) artigo: Artigo | null = null;
}
