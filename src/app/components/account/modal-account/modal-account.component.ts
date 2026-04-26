import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Categories } from '../../../model/categories.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AccountService } from '../../../service/account.service';
import { HttpResponse } from '@angular/common/http';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyMaskModule, NgbToast],
  selector: 'app-modal-account',
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.css']
})
export class ModalAccountComponent implements OnInit {

  @Input() public categories = signal<Categories[]>([]);
  @Input() public modalBs = signal<any>(null);
  @Output() public reload$ = new EventEmitter<boolean>()

  public form!: (FormGroup | any);
  public months = signal<string[]>([
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ])

  public loading = signal<boolean>(false)

  private _formBuilder = inject(FormBuilder);
  private _accountService = inject(AccountService);
  private _modalService = inject(NgbModal);



  ngOnInit() {
    this._createForms();
  }

  public closeModal(): void {
    this.modalBs().dismiss('Cross click')
  }

  public validateField(campo: string): boolean {
    return this.form.get(campo)?.invalid && (this.form.get(campo)?.dirty || this.form.get(campo)?.touched)
  }

  public save(): void {
    this._save();
  }

  public selectType(): void {
    const value = this.form.value.categoryId

    this.form.patchValue({
      name: null,
      salary: null
    })
    if (value == 2) {
      this.form.get('amountInstallment').setValidators([Validators.required]);
      this.form.get('amountInstallment').updateValueAndValidity();
      this.form.get('amountInstallmentPay').setValidators([Validators.required]);
      this.form.get('amountInstallmentPay').updateValueAndValidity();
      this.form.get('valueInstallment').setValidators([Validators.required]);
      this.form.get('valueInstallment').updateValueAndValidity();
    } else {
      this.form.get('amountInstallment')?.removeValidators([Validators.required]);
      this.form.get('valueInstallment').updateValueAndValidity();
      this.form.get('amountInstallmentPay').removeValidators([Validators.required]);
      this.form.get('amountInstallmentPay').updateValueAndValidity();
      this.form.get('valueInstallment').removeValidators([Validators.required]);
      this.form.get('valueInstallment').updateValueAndValidity();

      this.form.get('amountInstallment').setErrors(null);
      this.form.get('amountInstallmentPay').setErrors(null);
      this.form.get('valueInstallment').setErrors(null);
    }
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

  private _save(): void {
    this.loading.set(true)
    this._accountService.saveAccount(this.form.value).subscribe((res: HttpResponse<any>) => {
      if (res.status == 201) {
        this.reload$.emit(true)
        Swal.fire({
          title: 'Successo!',
          text: 'Procedimento realizado com sucesso!',
          icon: 'success',
        })
        this.closeModal()
        this.loading.set(false)
      }
    });
  }





}
