import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { HttpResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ModalExpenseComponent } from './modal-expense/modal-expense.component';

@Component({
  standalone: true,
  imports: [CurrencyPipe, ModalExpenseComponent],
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public loading$ = signal<boolean>(true);
  public expenses = signal<any[]>([]);

  /* SERVICE */
  private _accountService = inject(AccountService)
  private _modalService = inject(NgbModal);
  private _route = inject(ActivatedRoute);

  ngOnInit() {

    this._getList()
  }

  public openModal(template: TemplateRef<any>) {
    this._modalService.open(template, { size: 'lg' });
  }

  private _getList(): void {
    this._accountService.getListExpense(this._route.snapshot.params['id']).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.expenses.set(res.body)
        this.loading$.set(false)
      }
    });
  }


}
