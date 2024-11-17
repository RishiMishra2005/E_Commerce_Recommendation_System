import { Component, OnInit } from '@angular/core';
import { UserAuthenService } from '../../Services/user-auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserApiService } from '../../Services/user-api.service';
import { Iuser } from '../../models/iuser';
import { Router } from '@angular/router';
import { DataTransferServiceService } from '../../Services/data-transfer-service.service';

@Component({
  selector: 'app-login-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss'] 
})
export class LoginAuthComponent implements OnInit {
  userLog: boolean = true;
  userForm: FormGroup;
  user: Iuser = {} as Iuser;
  loggedUser:any;
  userList:Iuser[]=[];
  data:any;

  constructor(
    private userAuthService: UserAuthenService,
    private formbuilder: FormBuilder,
    private userService: UserApiService,
    private router: Router,
    private userAuth:UserAuthenService,
    private dataTransferService:DataTransferServiceService
  ) {
    // Initialize the form with validation rules
    this.userForm = this.formbuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumbers: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      // address: this.formbuilder.group({
      //   city: ['', Validators.required],
      //   postalCode: ['', Validators.required],
      //   street: ['', Validators.required]
      // }),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator // Added custom password validation
    });
  }

  // Custom validator to ensure password and confirmPassword fields match
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { 'mismatch': true };
  }

  get fullName() {
    return this.userForm.get('fullName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  get mobileNumbers(): FormArray {
    return this.userForm.get('mobileNumbers') as FormArray;
  }

  // Function to create a new mobile number FormGroup
  createMobileNumber(): FormGroup {
    return this.formbuilder.group({
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  // Add a new mobile number to the array
  addMobileNumber(): void {
    this.mobileNumbers.push(this.createMobileNumber());
  }

  // Remove a mobile number at a specific index
  removeMobileNumber(index: number): void {
    this.mobileNumbers.removeAt(index);
  }

  // Function to handle adding a new user
  adduser() : void {
    console.log(this.userForm);
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      if(newUser.email=="rishim842005@gmail.com"){
        newUser.role='A';
      }
      else{
        newUser.role='U';
      }
      // localStorage.setItem("loggedUser",JSON.stringify(newUser));
      
      // this.userAuth.data=localStorage.getItem("userList");
      // this.userAuth.userLoggedBehavior.next(true);
      // this.userAuth.userList =this.data?JSON.parse(this.data):[];
      // if(this.userAuth.userList){
      //   this.userAuth.userList.push(newUser);
      //   localStorage.setItem("userList",JSON.stringify(this.userAuth.userList));
      // }
      // else{
      //   localStorage.setItem("userList",JSON.stringify([newUser]));
      // }
       this.userService.addNewUser(newUser).subscribe({
         next: (response) => {
           console.log('User registered successfully:', response);
           this.dataTransferService.setLoggedUser(response);
           this.userAuth.userLoggedBehavior.next(true);
           this.router.navigate(['/home']); // Navigate to the home page after successful registration
         },
         error: (error) => {
           console.error('Error occurred during registration:', error);
         }
       });
      //this.router.navigate(['/home']);
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit(): void {
    // You can perform additional initialization logic here
  }

}
