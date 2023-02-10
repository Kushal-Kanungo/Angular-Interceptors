import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileHandle } from '../dragDropFileUpload.directive';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent {
  constructor(private fileUploadService: UploadService) {}
  progress = 0;
  signupForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirmation: new FormControl(null, [Validators.required]),
    file: new FormControl(''),
  });

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  upload(): void {}

  onSubmitHandeler() {
    this.signupForm.value;

    this.fileUploadService
      .uploadFile(
        this.signupForm.get('username')?.value,
        this.signupForm.get('password')?.value,
        this.files[0].file
      )
      .subscribe({
        next: (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              if (event.total)
                this.progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
