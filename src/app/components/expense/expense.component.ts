import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { HttpResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalExpenseComponent } from './modal-expense/modal-expense.component';
import { Expenses } from '../../model/expenses.model';

@Component({
  standalone: true,
  imports: [CurrencyPipe, ModalExpenseComponent, RouterLink],
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public loading$ = signal<boolean>(true);
  public expenses = signal<Expenses[]>([]);
  public configId = signal<number>(0);
  public modalBs = signal<any>(null);

  /* SERVICE */
  private _accountService = inject(AccountService)
  private _modalService = inject(NgbModal);
  private _route = inject(ActivatedRoute);

  ngOnInit() {
    this.configId.set(Number.parseInt(this._route.snapshot.params['id']))
    this._getList()
  }

  public reload(): void {
    this._getList();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalBs.set(this._modalService.open(template, { size: 'lg' }));
  }


  private _getList(): void {
    this._accountService.getListExpense(this._route.snapshot.params['id']).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        console.log(this.configId())
        this.expenses.set(res.body)
        this.loading$.set(false)
      }
    });
  }


}
