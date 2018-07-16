import {Component, OnInit} from '@angular/core';
import {UsersService} from './user/users.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  user1Activated: boolean = false;
  user2Activated: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {

    this.usersService.userActivated.pipe(map((user: {id: number})=> user.id )).subscribe(id=>{
      this.user1Activated = this.user1Activated || id === 1;
      this.user2Activated = this.user2Activated || id === 2;
    });

  }
}
