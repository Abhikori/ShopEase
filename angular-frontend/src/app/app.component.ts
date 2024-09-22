import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from "./Module/shared/shared.module";
import { FeatureModule } from './Module/feature/feature.module';
import { UserService } from './State/User/user.service';
import { AppState } from './Models/AppState';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule, FeatureModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-frontend';
  constructor(private router:Router, private dialog:MatDialog, private userService:UserService, private store:Store<AppState>){}
  
  ngOnInit(){
    if(localStorage.getItem('jwt')){
      // this.userService.getUserProfile()
      // this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
          // if(!user || !user.id)
        // this.userService.getUserProfile()
      // })
    }
  }
}
