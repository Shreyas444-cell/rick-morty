import { Component } from '@angular/core';
import { FilterService } from '../service/filter.service';
import { AuthService } from '../service/authentication.service';
import { headerData } from '../constants/text-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean=false;
  headerData=headerData;
  constructor(private filterService: FilterService,private authService:AuthService,){}
  searchByName(event:any){
    this.filterService.updateSearchQuery(event.target.value);

    
    }
    ngOnInit(){
      this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      });
    }
  
    logout(): void {
      this.authService.logout();  
    }

}
