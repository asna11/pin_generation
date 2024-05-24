import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PinService } from 'src/app/services/pin.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  public pinForm: any;
  preview!: string;
  selectCollab = 'Collaboratory';
  collabs: any = [];
  collabId: any;
  @ViewChild('bannerImange') bannerImg: any;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    public pinService: PinService, public dialogRef: MatDialogRef<PinComponent>) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getCollaborators();
    this.pinForm.controls['privacy'].setValue('public')
  }

  getCollaborators() {
    var collaborators: any = localStorage.getItem("shared_customerinfo");
    // console.log(collabs);
    let parsedCollab = JSON.parse(collaborators);
    parsedCollab.forEach((data: any) => {
      this.collabs.push(data.name);
    });

  }

  fileUpload(event: any) {
    const target = event.target as HTMLInputElement;

    const files = target.files as FileList;

    const file = files[0];
    console.log(file)
    // this.pinForm.value.image = file;

    if (file) this.saveFile(file);
  }

  pinInfo: any;
  onAddPin() {
    console.log(this.pinForm.value.image);
    // return 0;
    this.pinInfo = Object.assign({}, this.pinInfo);
    this.pinInfo = Object.assign(this.pinInfo, this.pinForm.value);
    console.log(this.pinInfo);
    // return 0;
    this.pinService.updatePinInfo(this.pinInfo);
    this.dialogRef.close('close');
    this.openMsgDialog('Pin added Successfully', 'success');
  }

  openMsgDialog(title: string, className: string) {
    this.snackBar.open(title, '', {
      duration: 2000,
      panelClass: [className]
    });
  }


  saveFile(file: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result);

      this.preview = reader.result as string;

      // localStorage.setItem('profile', reader.result as string);
      this.pinForm.controls['image'].setValue(reader.result);
      console.log(this.pinForm.value.image)
    };
    reader.readAsDataURL(file);
  }

  private buildForm() {
    this.pinForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required
      ])),
      image: new FormControl('', Validators.compose([Validators.required
      ])),
      collaboratory: new FormControl('', Validators.compose([Validators.required
      ])),
      privacy: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  selectCollaboratory(event: any) {

  }

}
