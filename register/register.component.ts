import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/survices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

apierror:string='';
  isloading: boolean = false;
  registerform: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , { validators : this.checkRepasswordMatch })//when i pass fucthion name it automaticly send registerform as a prametar
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  submitRegister() {
    this.isloading = true;
    if (this.registerform.valid) {
      this._AuthService.signup(this.registerform.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this._Router.navigate(['/login']);
            this.isloading = false;
          }
        },
        error: (err) => {
          this.isloading = false;
          this.apierror=err.error.message;
          
        }
      })
    }
  }

  checkRepasswordMatch(x:any){
if(x.get('password')?.value === x.get('rePassword')?.value){
  return null;
}else{
  x.get('rePassword')?.setErrors({rePasswordMatch:'repassword not match password'}) //will be in the errors of rePassword if happend to make it not valid
  return {rePasswordMatch:'repassword not match password'}//will be in the errors of registerform if happend to make it not valid
  //i can make else return null but must do line before return becuse when  errors happend in rePassword it make my registerform also not valid
}

  }

}