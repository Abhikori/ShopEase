import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from "./Module/shared/shared.module";
import { FeatureModule } from './Module/feature/feature.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, FeatureModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-frontend';
}
