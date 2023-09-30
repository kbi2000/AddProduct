import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../serviices/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
   freshness=["Brand new","Second hand"]
   productForm !: FormGroup;
   Action_btn:String="Save";
  constructor (@Inject(MAT_DIALOG_DATA) public editData:any,private formbuilder:FormBuilder,private api:ApiService,private dialogref:MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.productForm=this.formbuilder.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required]
    });
    if(this.editData){
      this.Action_btn="Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['reshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData. date);
    }
    
  }
  addproduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added");
            this.productForm.reset();
            this.dialogref.close("save");
          },
          error:()=>{
            alert("Error occur");
          }
        })
      }
    }
    else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putproduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("update ");
        this.productForm.reset();
        this.dialogref.close("update");
      },
      error:()=>{
        alert("error found");
      }
    })
  }
  

}
