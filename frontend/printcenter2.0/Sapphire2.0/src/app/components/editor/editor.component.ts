import { Component, EventEmitter, Input, OnInit, Output,ViewChild, ElementRef } from '@angular/core';
import { EditortransferService } from 'src/app/services/editortransfer.service';
import Cropper from "cropperjs";


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  message!:string; 
  
  // Cropper
  @ViewChild("image", { static: false})
  public imageElement:any = ElementRef
  @Input("src")
  public imageSource!:string;
  public imageDestination: string;
  private cropper!: Cropper;


   public constructor(private image:EditortransferService) { 
    //Cropper  
    this.imageDestination = '';
  }
  
  public ngOnInit(): void {
    this.image.currentMessage.subscribe(message => this.message = message);
  
  }

  public ngAfterViewInit(){
    this.cropper = new Cropper(this.imageElement.nativeElement,
      {
        zoomable: false,
        scalable: true,
        aspectRatio: NaN,
        
        rotatable: true,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas();
          this.imageDestination = canvas.toDataURL("image/jpeg")
        }

    })
  }


  receiveMessage($event:string){
    this.message = $event;

  }
}
