import { Component, inject, signal } from '@angular/core';
import { CurriculumService } from '../../../core/services/curriculum.service';
import { Curriculum, CurriculumContactInfo, CurriculumExperienceInfo } from '../../../core/utils/types';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.css',
})
export class CurriculoComponent {
  private server = inject(CurriculumService);
  profile = signal({
    profileImage: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    credential: '',
  })

  contactInfo = signal<CurriculumContactInfo>({
    title: 'Informações de contato',
    items: []
  })

  academicInfo = signal<CurriculumContactInfo>({
    title: 'Formações',
    items: []
  })

  teachingInfo = signal<CurriculumContactInfo>({
    title: 'Docência',
    items: []
  })

  experienceInfo = signal<CurriculumExperienceInfo>({
    title: 'Experiência com:',
    items: []
  })

  ngOnInit() {
    this.server.getCurriculum().subscribe({
      next: (res: Curriculum) => {
        console.log(res)
      this.academicInfo.set(res.academic_info);
      this.contactInfo.set(res.contact_info);
      this.experienceInfo.set(res.experience_info);
      this.teachingInfo.set(res.teaching_info)
      this.profile.set(res.personal_data)
      },
    });
  }
}
