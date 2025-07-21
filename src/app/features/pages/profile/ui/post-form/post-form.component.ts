import {
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageUploaderComponent } from '../../../shared/image-uploader/image-uploader.component';
import {
  ArtigoCreatePayload,
  BlogCreatePayload,
  CourseCreatePayload,
  MaterialCreatePayload,
} from '../../../../../core/utils/types';
import { PdfUploaderComponent } from '../../../shared/pdf-uploader/pdf-uploader.component';
import { PostService } from '../../data-access/post-store.service';

export type PostType = 'artigo' | 'blog' | 'material' | 'curso';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
  imports: [ImageUploaderComponent, ReactiveFormsModule, PdfUploaderComponent],
})
export class PostFormComponent implements OnInit {
  @Input({ required: true }) type = signal<PostType>('artigo');
  private fb: FormBuilder = inject(FormBuilder);
  postService = inject(PostService);
  inProgress = this.postService.isLoading();
  form!: FormGroup;
  constructor() {
    effect(() => {
      this.onTypeChange(this.type());
    });
  }
  ngOnInit() {
    this.onTypeChange(this.type());
  }

  onTypeChange(type: PostType) {
    this.buildForm(type);
  }

  buildForm(type: PostType) {
    const common = {
      title: ['', Validators.required],
      image: ['', Validators.required],
      tagNames: [[]],
    };

    switch (type) {
      case 'artigo':
        this.form = this.fb.group({
          ...common,
          text: ['', Validators.required],
          references: [[]],
        });
        break;

      case 'blog':
        this.form = this.fb.group({
          ...common,
          text: ['', Validators.required],
        });
        break;

      case 'material':
        this.form = this.fb.group({
          ...common,
          description: ['', Validators.required],
          file: ['', Validators.required],
        });
        break;

      case 'curso':
        this.form = this.fb.group({
          ...common,
          description: ['', Validators.required],
          link: ['', Validators.required],
        });
        break;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const raw = this.form.value;
    const tagNames =
      typeof raw.tagNames === 'string'
        ? raw.tagNames
            .split(',')
            .map((t: string) => t.trim())
            .filter(Boolean)
        : raw.tagNames;

    const refs =
      typeof raw.references === 'string'
        ? raw.references
            .split('\n')
            .map((r: string) => r.trim())
            .filter(Boolean)
        : raw.references;

    const data = {
      ...raw,
      tagNames,
      refs,
    };

    delete data.references;

    switch (this.type()) {
      case 'artigo':
        this.postService.createArtigo(data as ArtigoCreatePayload).subscribe();
        break;

      case 'blog':
        this.postService.createBlog(data as BlogCreatePayload).subscribe();
        break;

      case 'material':
        this.postService
          .createMaterial(data as MaterialCreatePayload)
          .subscribe();
        break;

      case 'curso':
        this.postService.createCurso(data as CourseCreatePayload).subscribe();
        break;
    }
  }
}
