import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Categories } from '../../../model/categories.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-modal-account',
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.css']
})
export class ModalAccountComponent implements OnInit {

  @Input() public categories = signal<Categories[]>([]);

  public form: (FormGroup | any);

  private _formBuilder = inject(FormBuilder);

  ngOnInit() {
    this._createForms();
  }

  private _createForms(): void {
    this.form = this._formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      amountInstallment: [null],
      amountInstallmentPay: [null],
      valueInstallment: [null]
    })
  }


  public selectType(): void {
    const value = this.form.value.categoryId
    if (value == 2) {
      this.form.get('amountInstallment').setValidators([Validators.required]);
      this.form.get('amountInstallment').updateValueAndValidity();
      this.form.get('amountInstallmentPay').setValidators([Validators.required]);
      this.form.get('amountInstallmentPay').updateValueAndValidity();
      this.form.get('valueInstallment').setValidators([Validators.required]);
      this.form.get('valueInstallment').updateValueAndValidity();
    }
  }


}
