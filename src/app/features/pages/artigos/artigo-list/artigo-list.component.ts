import { Component, inject, OnInit, signal } from '@angular/core';
import { Artigo } from '../../../../core/utils/types';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../../shared/resource-empty/resource-empty.component';
import { ArtigoService } from '../../../../core/services/artigo.service';
import { RecursoTemporariamenteIndisponivelComponent } from '../../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { ArtigoCardComponent } from './ui/artigo-card/artigo-card.component';

@Component({
  selector: 'app-artigo-list',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    ResourceEmptyComponent,
    LoadingComponent,
    ArtigoCardComponent,
  ],
  templateUrl: './artigo-list.component.html',
  styleUrl: './artigo-list.component.css',
})
export class ArtigoListComponent implements OnInit {
  title = signal('Artigos');
  
  private articleService = inject(ArtigoService);
  readonly isLoading = this.articleService.isLoading;
  readonly error = this.articleService.hasError;
  public readonly artigos = this.articleService.artigos;
  
  ngOnInit() {
    this.articleService.loadAllArticles().subscribe();
  }

  //   artigoTest =[
  //   {
  //     "authorId": "1",
  //     "author": {
  //       "firstname": "Lucas",
  //       "lastname": "Silva",
  //       "profileImage": "https://randomuser.me/api/portraits/men/1.jpg"
  //     },
  //     "id": "1",
  //     "title": "Introdução ao Node.js",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Este artigo apresenta os conceitos básicos do Node.js, desde a instalação até a execução de um servidor básico.",
  //     "tags": [
  //       { "id": 1, "name": "Node.js" },
  //       { "id": 2, "name": "Back-End" }
  //     ],
  //     "references": [
  //       { "id": 1, "name": "Node.js Official Docs", "url": "https://nodejs.org/en/docs/" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "2",
  //     "author": {
  //       "firstname": "Maria",
  //       "lastname": "Souza",
  //       "profileImage": "https://randomuser.me/api/portraits/women/2.jpg"
  //     },
  //     "id": "2",
  //     "title": "Guia Completo de Responsividade em CSS",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Neste artigo, exploramos estratégias para tornar seu site responsivo em diferentes dispositivos.",
  //     "tags": [
  //       { "id": 3, "name": "CSS" },
  //       { "id": 4, "name": "Responsividade" }
  //     ],
  //     "references": [
  //       { "id": 2, "name": "MDN CSS Responsive", "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "3",
  //     "author": {
  //       "firstname": "João",
  //       "lastname": "Pereira",
  //       "profileImage": "https://randomuser.me/api/portraits/men/3.jpg"
  //     },
  //     "id": "3",
  //     "title": "Testes Automatizados com Jest",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Aprenda a configurar e executar testes automatizados com o framework Jest em projetos JavaScript.",
  //     "tags": [
  //       { "id": 5, "name": "Jest" },
  //       { "id": 6, "name": "Testes" }
  //     ],
  //     "references": [
  //       { "id": 3, "name": "Jest Docs", "url": "https://jestjs.io/docs/getting-started" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "4",
  //     "author": {
  //       "firstname": "Ana",
  //       "lastname": "Costa",
  //       "profileImage": "https://randomuser.me/api/portraits/women/4.jpg"
  //     },
  //     "id": "4",
  //     "title": "Acessibilidade na Web",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Descubra como tornar seus sites mais inclusivos com técnicas de acessibilidade.",
  //     "tags": [
  //       { "id": 7, "name": "Acessibilidade" },
  //       { "id": 8, "name": "Web" }
  //     ],
  //     "references": [
  //       { "id": 4, "name": "WAI-ARIA", "url": "https://www.w3.org/WAI/ARIA/" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "5",
  //     "author": {
  //       "firstname": "Pedro",
  //       "lastname": "Almeida",
  //       "profileImage": "https://randomuser.me/api/portraits/men/5.jpg"
  //     },
  //     "id": "5",
  //     "title": "Deploy com Docker",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Aprenda a empacotar e disponibilizar sua aplicação com Docker.",
  //     "tags": [
  //       { "id": 9, "name": "Docker" },
  //       { "id": 10, "name": "DevOps" }
  //     ],
  //     "references": [
  //       { "id": 5, "name": "Docker Docs", "url": "https://docs.docker.com/get-started/" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "6",
  //     "author": {
  //       "firstname": "Fernanda",
  //       "lastname": "Mendes",
  //       "profileImage": "https://randomuser.me/api/portraits/women/6.jpg"
  //     },
  //     "id": "6",
  //     "title": "Hooks no React",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Explore o poder dos hooks no React para construir componentes mais concisos e reutilizáveis.",
  //     "tags": [
  //       { "id": 11, "name": "React" },
  //       { "id": 12, "name": "Hooks" }
  //     ],
  //     "references": [
  //       { "id": 6, "name": "React Docs - Hooks", "url": "https://reactjs.org/docs/hooks-intro.html" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "7",
  //     "author": {
  //       "firstname": "Carlos",
  //       "lastname": "Ferreira",
  //       "profileImage": "https://randomuser.me/api/portraits/men/7.jpg"
  //     },
  //     "id": "7",
  //     "title": "Introdução à API REST",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Saiba como construir e consumir APIs REST de forma eficiente.",
  //     "tags": [
  //       { "id": 13, "name": "API" },
  //       { "id": 14, "name": "REST" }
  //     ],
  //     "references": [
  //       { "id": 7, "name": "RESTful API", "url": "https://restfulapi.net/" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   },
  //   {
  //     "authorId": "8",
  //     "author": {
  //       "firstname": "Beatriz",
  //       "lastname": "Oliveira",
  //       "profileImage": "https://randomuser.me/api/portraits/women/8.jpg"
  //     },
  //     "id": "8",
  //     "title": "Web Components",
  //     "image": "https://placehold.co/600x400",
  //     "text": "Uma introdução prática aos Web Components e como usá-los nos seus projetos.",
  //     "tags": [
  //       { "id": 15, "name": "Web Components" },
  //       { "id": 16, "name": "Front-End" }
  //     ],
  //     "references": [
  //       { "id": 8, "name": "MDN Web Components", "url": "https://developer.mozilla.org/en-US/docs/Web/Web_Components" }
  //     ],
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   }
  // ]
}
