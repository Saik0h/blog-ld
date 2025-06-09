import { Component, Input } from '@angular/core';
import { Artigo } from '../../../../../../core/utils/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-artigo-card',
  imports: [DatePipe],
  templateUrl: './artigo-card.component.html',
  styleUrl: './artigo-card.component.css',
})
export class ArtigoCardComponent {
  @Input({ required: true }) artigo: Artigo | null = null;
}
