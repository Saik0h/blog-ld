import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainContentComponent } from './ui/main-content/main-content.component';
import { ContactFieldComponent } from './ui/contact-field/contact-field.component';
import { CurriculoSectionComponent } from './ui/curriculo-section/curriculo-section.component';

@Component({
  selector: 'app-curriculo',
  standalone: true,
  imports: [
    FormsModule,
    MainContentComponent,
    ContactFieldComponent,
    CurriculoSectionComponent,
  ],
  template: `
    @if(!onMaintenance()){
    <section>
      <app-main-content />
      <app-contact-field />
      <app-curriculo-section />
    </section>
    } @else {
    <section style="text-align: center; margin: auto; font-size: 3rem">Página em manutenção</section>
    }
  `,
})
export class CurriculoComponent {
  onMaintenance = signal(true);
}
