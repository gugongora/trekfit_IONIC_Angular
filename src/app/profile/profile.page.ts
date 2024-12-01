import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private storageservice: StorageService) { }




  userEmail: string = '';
  userName: string = '';
  userPhotoURL: string = 'assets/default-avatar.png';

  ngOnInit() {






  }

}
