import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, HeaderComponent, FooterComponent],
  providers: [AuthService],
})
export class CoreModule {}
