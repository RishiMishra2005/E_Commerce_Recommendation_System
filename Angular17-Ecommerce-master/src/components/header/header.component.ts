import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/Store';
import { Router, RouterModule } from '@angular/router';
import { UserAuthenService } from '../../Services/user-auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  store = new Store("mainStore", ["product1", "product2"], "../../assets/pngegg.png")
  userLog: boolean = false;
  constructor( private userAuth:UserAuthenService,
    private router:Router
  ) {
  }
  ngOnInit(): void {
    this.userAuth.getUserLoggedStatus().subscribe({
      next: (user) => {
        this.userLog = user
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

 
}
