import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../order';
import { Product } from '../product';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

_productlist!: Product[]; 
  
order  = new Order();
  constructor(private _service: RegistrationService, private _router: Router) { }

  ngOnInit(){

    this._service.getProductFromRemote().subscribe(
      data=>{
        console.log("respone recieved")
        this._productlist=data;
      },
      error=>console.log("exception occured")
    )
  }

  success(){

    this._service.addOrderFromRemote(this.order).subscribe(
      data => {
        alert(`Place Order Successfully!`);
        this._router.navigate(['/'])
      },
      error => {
        alert("exception occured");
      }
    )
  }
}
