import { NgFor } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnDestroy,OnInit {

  Users: any;
  UserFrom: FormGroup;
  isEditMode: boolean = false;
  constructor(private Userservice: UserService, private fb: FormBuilder) {
    this.UserFrom = this.fb.group({
      id: [''],
      Name: ['', Validators.required],
      City: ['', Validators.required],
      Role: ['', Validators.required],
      EmailId: ['', Validators.required],
      Gender: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.GetUserDataAPI();
  }
  OpenModel() {
    this.isEditMode = false;
    this.UserFrom.reset();
  }

  userSubscription: Subscription[] = [];
  isLoader: boolean = false
  GetUserDataAPI() {
    // debugger
    this.isLoader = true;
    const data = this.Userservice.getUserData().subscribe({
      next: (res: any) => {
        console.log(res, "Checking working or not");
        this.Users = res;
        this.isLoader = false;
      },
      error: (err: any) => {
        console.log(err, "Chering error is there");
      },
      complete() {
        console.log("Api responsive completed");
      },
    })
    //  Unusebscribe data
    this.userSubscription.push(data);
  }

  Editdata(editdata: any) {
    this.isEditMode = true;
    // debugger
    this.UserFrom.setValue({
      id: editdata.id,
      Name: editdata.Name,
      City: editdata.City,
      Role: editdata.Role,
      EmailId: editdata.EmailId,
      Gender: editdata.Gender,
    })
  }

  private deleteUserSubscription: Subscription | undefined;

  DeleteUserData(id: any) {
    // debugger
    const confiramuserdata = confirm("Are you sure want to delete");

    if (confiramuserdata) {
      this.deleteUserSubscription=  this.Userservice.deleteUserData(id).subscribe({
        next: (res: any) => {
          console.log(res, "Api responsive checkong");
          //  No need of API responsive here
          // this.GetUserDataAPI();

          //  const userindex=this.Users.findIndex(m=>m.id==id);

          const userIndex = this.Users.indexOf(id);
          this.Users.splice(userIndex, 1);
          
          alert("User data deleted succefully");
        },
        error: (err: any) => {
          console.log(err, "Checking the error");
        },
        complete() {
          console.log("Done");
        },
      })
      
    }
  }
  isApiCallInProgress: boolean = false;
  SaveUserdata() {
    //  debugger
    const Userdata = this.UserFrom.value;

    if (this.isEditMode) {
      this.Userservice.updateUserdata(Userdata.id, Userdata).subscribe({
        next: (res: any) => {
          console.log(res, "any responsive comong or not checking");
          this.GetUserDataAPI();
          alert("User dataUpdated  Succefully");
        },
        error: (err: any) => {
          console.log("Something error is there");
        },
        complete() {
          console.log("APi responsive done");
        },
      })
    }
    else {
      delete Userdata.id

      if (!this.isApiCallInProgress) {
        this.isApiCallInProgress = true;
        if (this.UserFrom.valid) {
          this.Userservice.createUserdata(Userdata).subscribe({
            next: (res: any) => {
              console.log(res, "RESPONSIVE");
              alert("User data Added Succefully");
              this.isApiCallInProgress = false;
              //  No need of again call  GetUserDataAPI here  insted of you can push the particular data
              // this.GetUserDataAPI();
              //  Reducing the API call responsive
              this.Users.push(res);
            },
            error: (err: any) => {
              console.log(err, "SOmething error is there");
              this.isApiCallInProgress = false;
            },
            complete: () => {
              console.log("API REsponsive completd");
              this.isApiCallInProgress = false;
            }
          })
        }
      }

      else {
        alert("User data Invalid");
      }
    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    debugger
    this.userSubscription.forEach(element => {
      element.unsubscribe();
    })

    console.log('ngOnDestroy triggered');
  if (this.deleteUserSubscription) {
    console.log("Unsubscribing from deleteUserData API");
    this.deleteUserSubscription.unsubscribe();
    console.log("Unsubscribed from deleteUserData API.");
  } else {
    console.log("No subscription to unsubscribe.");
  }
  }
  router=inject(Router);
  Navigate() 
  {
     this.router.navigateByUrl("Product");
  }
}
