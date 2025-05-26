import { Component, Input } from '@angular/core';
import { ArtigoCardComponent } from '../artigo-card/artigo-card.component';
import { Artigo } from '../../../../../../core/utils/types';

@Component({
  selector: 'app-list',
  imports: [ArtigoCardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input() artigos: Artigo[] = [];
}
