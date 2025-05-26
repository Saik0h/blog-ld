import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';
import { Artigo } from '../../../../../../core/utils/types';

@Component({
  selector: 'app-artigo',
  imports: [RouterLink, SlicePipe, DatePipe],
  templateUrl: './artigo-card.component.html',
  styleUrl: './artigo-card.component.css',
})
export class ArtigoCardComponent {
  @Input({ required: true }) Artigo: Artigo = {
    id: '',
    authorId: '',
    author: {
      firstname: '',
      lastname: '',
      profileImage: '',
    },
    title: '',
    image: '',
    text: '',
    references: [],
    createdAt: '',
    updatedAt: '',
  };
}
