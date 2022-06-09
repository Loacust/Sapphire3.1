import { Component, OnInit } from '@angular/core';
import { EditortransferService } from 'src/app/services/editortransfer.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
message!:string;
  constructor(private image:EditortransferService) { }

  ngOnInit(): void {
    this.image.currentMessage.subscribe(message => this.message = message)
  }

}
