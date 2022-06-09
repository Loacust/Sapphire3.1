import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  filePath: any; //image preview
  myForm: FormGroup; // my form
  data: any; // holds current user email

  constructor(public fb: FormBuilder, private usersService: UsersService) {
    this.data = this.usersService.current_user_email();

    //FORM FOR IMAGE UPLOAD
    this.myForm = this.fb.group({
      email: [this.data, [Validators.required]],
      image: ['']
    })
  }

  ngOnInit(): void { }

// IMAGE PREVIEW
  imagePreview(e: any) {
    const file = (e.target as HTMLInputElement).files![0];

    this.myForm.patchValue({
      image: file
    });

    this.myForm.get('image')!.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.myForm.patchValue({
      image: file
    });
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
    location.reload();

  }

}

