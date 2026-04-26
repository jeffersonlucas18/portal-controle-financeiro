import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AccountService } from '../../../service/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormField } from "@angular/forms/signals";
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CurrencyMaskModule, ReactiveFormsModule, FormField],
  selector: 'app-modal-expense',
  templateUrl: './modal-expense.component.html',
  styleUrls: ['./modal-expense.component.css']
})

export class ModalExpenseComponent implements OnInit {

  @Input() public modalBs = signal<any>(null);
  @Input() public configId: number | null = null;
  @Output() public reload$ = new EventEmitter<boolean>()

  public loading = signal<boolean>(false)
  public form!: (FormGroup | any);

  private _formBuilder = inject(FormBuilder);
  private _accountService = inject(AccountService);
  private _modalService = inject(NgbModal);


  ngOnInit() {
    console.log(this.configId)
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



  private _createForms(): void {
    this.form = this._formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
      status: ['PAGO', [Validators.required]],
      configAccountId: [this.configId]

    })
  }

  private _save(): void {
    this.loading.set(true)
    this._accountService.saveExpense([this.form.value]).subscribe((res: HttpResponse<any>) => {
      if (res.status == 201) {
        this.reload$.emit(true)
        Swal.fire({
          title: 'Successo!',
          text: 'Procedimento realizado com sucesso!',
          icon: 'success',
        })
        this.closeModal();
        this.loading.set(false)
      }
    });
  }

}
