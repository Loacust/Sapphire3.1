import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  filePath: any;
  myForm: FormGroup;

  constructor(public fb: FormBuilder) { 
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
  })
}

  ngOnInit(): void {}


  imagePreview(e:any) {
    const file = (e.target as HTMLInputElement).files![0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img')!.updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submit() {
    console.log(this.myForm.value)
  }
  onFileChange(){}
}
