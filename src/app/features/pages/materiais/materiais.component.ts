import { Component, inject, Signal, signal } from '@angular/core';
import { RecursoTemporariamenteIndisponivelComponent } from '../shared/recurso-temporariamente-indisponivel/recurso-temporariamente-indisponivel.component';
import { Material } from '../../../core/utils/types';
import { MaterialService } from '../../../core/services/material.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ResourceEmptyComponent } from '../shared/resource-empty/resource-empty.component';
import { MaterialCardComponent } from './ui/material-card/material-card.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-materiais',
  imports: [
    RecursoTemporariamenteIndisponivelComponent,
    LoadingComponent,
    ResourceEmptyComponent,
    MaterialCardComponent,
  ],
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css',
})
export class MateriaisComponent {
  public readonly title = signal('Materiais Gratuitos');
  public readonly materials = signal<Material[]>([]);

  private readonly server = inject(MaterialService);
  public readonly isLoading = this.server.isLoading();
  public readonly error = this.server.hasError();
  public hasPermission = signal<boolean>(false);

  private readonly authService = inject(AuthService);

  constructor() {
    this.server.getAll().subscribe({
      next: (materiais: Material[]) => {
        this.materials.set(materiais);
      },
    });
    this.authService.getAuthorization().subscribe({
      next: (isAdmin: boolean) => this.hasPermission.set(isAdmin),
    });
  }

  deleteFunction = (id: number) => {
    this.server.delete(id).subscribe();
  };

  //   materialsTeste =[
  //   {
  //     "authorId": "1",
  //     "author": {
  //       "firstname": "Lucas",
  //       "lastname": "Silva",
  //       "profileImage": "https://randomuser.me/api/portraits/men/1.jpg"
  //     },
  //     "id": "1",
  //     "title": "Documentação do Projeto Angular",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/angular-doc.pdf",
  //     "tags": [
  //       { "id": 1, "name": "Angular" },
  //       { "id": 2, "name": "Documentação" }
  //     ],
  //     "description": "Documentação completa do projeto Angular para desenvolvedores.",
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
  //     "title": "Checklist de Deploy",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/deploy-checklist.pdf",
  //     "tags": [
  //       { "id": 3, "name": "DevOps" },
  //       { "id": 4, "name": "Checklist" }
  //     ],
  //     "description": "Checklist para garantir o sucesso no deploy de aplicações web.",
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
  //     "title": "Apresentação sobre TypeScript",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/typescript-presentation.pptx",
  //     "tags": [
  //       { "id": 5, "name": "TypeScript" },
  //       { "id": 6, "name": "Slides" }
  //     ],
  //     "description": "Slides explicativos sobre os conceitos fundamentais do TypeScript.",
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
  //     "title": "Guia de Boas Práticas em CSS",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/css-best-practices.pdf",
  //     "tags": [
  //       { "id": 7, "name": "CSS" },
  //       { "id": 8, "name": "Boas Práticas" }
  //     ],
  //     "description": "Um guia completo com boas práticas de organização e estilo em CSS.",
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
  //     "title": "Manual de Configuração de Banco de Dados",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/db-config-guide.pdf",
  //     "tags": [
  //       { "id": 9, "name": "Banco de Dados" },
  //       { "id": 10, "name": "Configuração" }
  //     ],
  //     "description": "Manual prático para configurar e gerenciar bancos de dados relacionais.",
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
  //     "title": "Planejamento de Sprint Ágil",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/agile-sprint-planning.xlsx",
  //     "tags": [
  //       { "id": 11, "name": "Agile" },
  //       { "id": 12, "name": "Planejamento" }
  //     ],
  //     "description": "Template de planejamento de sprints ágeis para equipes de desenvolvimento.",
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
  //     "title": "Apresentação de Projeto Front-End",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/frontend-presentation.pptx",
  //     "tags": [
  //       { "id": 13, "name": "Front-End" },
  //       { "id": 6, "name": "Slides" }
  //     ],
  //     "description": "Apresentação para demonstrar as principais features do projeto front-end.",
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
  //     "title": "Ebook de Introdução ao React",
  //     "image": "https://placehold.co/600x400",
  //     "file": "https://example.com/files/react-intro-ebook.pdf",
  //     "tags": [
  //       { "id": 14, "name": "React" },
  //       { "id": 15, "name": "Ebook" }
  //     ],
  //     "description": "Ebook para iniciantes que desejam aprender os conceitos básicos do React.",
  //     "createdAt": "09/06/2025",
  //     "updatedAt": "09/06/2025"
  //   }
  // ]
}
