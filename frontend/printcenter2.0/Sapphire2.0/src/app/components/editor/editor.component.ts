import { Component, EventEmitter, Input, OnInit, Output,ViewChild, ElementRef } from '@angular/core';
import { EditortransferService } from 'src/app/services/editortransfer.service';
import Cropper from "cropperjs";
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  message!:string; 
  newCroppedImage:any;
  anotherCroppedtest:any;
  // Cropper 
  @ViewChild("image", { static: false})
  public imageElement:any = ElementRef
  @Input("src")
  public imageSource!:string;
  public imageDestination: string;
  private cropper!: Cropper;

  myForm: FormGroup; // my form
  data: any; // holds current user email



   public constructor(public fb: FormBuilder,private image:EditortransferService,private usersService: UsersService) { 
    this.data = this.usersService.current_user_email();

    //FORM FOR IMAGE UPLOAD
    this.myForm = this.fb.group({
      email: [this.data, [Validators.required]],
      image: ['']
    })
    //Cropper  
    this.imageDestination = '';
  }

  public ngOnInit(): void {
    //Retreives data from the Editortransfer Service
    this.image.currentMessage.subscribe(message => this.message = message);
  
  }
  //Cropper
  public ngAfterViewInit(){
    this.cropper = new Cropper(this.imageElement.nativeElement,
      {
        zoomable: false,
        scalable: true,
        aspectRatio: NaN,
        rotatable: true,
        crop: () => {
          const canvas = this.cropper.getCroppedCanvas();
          this.imageDestination = canvas.toDataURL('image/png')
          
        }

    })
  }
  saveCroppedImage(){
    var split = this.imageDestination//.split(',');
    var croppedImage = split//[1];
    var blob = new Blob([croppedImage],{type: 'image/jpeg'});
    var file = new File([blob],'cropped.jpeg');
    this.newCroppedImage = file;
    console.log(croppedImage)
    this.onFileChange();
    
  }

  onFileChange() {
    const file = this.newCroppedImage;
    this.myForm.patchValue({
      image: file
    });
    console.log(file)
    this.upload();
  }
  upload() {
    let formData = this.myForm.value;
    let f = new FormData();
    for (let k in formData) {
      f.append(k, formData[k]);
    }
    this.usersService.photo_upload(f).subscribe((result) => {
      alert("Upload Successful")
    }, (err) => {
      alert("Upload Failed");
      console.log(err)
    });
   

  }

  }

