import { Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { Account } from '../../model/account.model';
import { CurrencyPipe } from '@angular/common';
import { NgbModal, NgbPagination, NgbToastHeader } from '@ng-bootstrap/ng-bootstrap';
import { ModalAccountComponent } from './modal-account/modal-account.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  imports: [CurrencyPipe, ModalAccountComponent],
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  public loading$ = signal<boolean>(true);
  public loadingCategories$ = signal<boolean>(true);
  public accounts = signal<Account[]>([]);
  public categories = signal<any[]>([]);
  public modalBs = signal<any>(null);

  /* SERVICE */
  private _accountService = inject(AccountService)
  private _modalService = inject(NgbModal);
  private _router = inject(Router);

  ngOnInit() {
    this._getListCategories();
    this._getList();
  }

  public reload(): void {
    this._getList();
  }

  public route(account: Account): void {
    this._router.navigate([`/account/expenses/${account.id}`])
  }

  public openModal(template: TemplateRef<any>) {
    this.modalBs.set(this._modalService.open(template, { size: 'lg' }));
    console.log(this.modalBs())
  }

  private _getList(): void {
    this._accountService.getList().subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.accounts.set(res.body)
        this.loading$.set(false)
      }
    });
  }


  private _getListCategories(): void {
    this.loadingCategories$.set(true)
    this._accountService.getListCategory().subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.categories.set(res.body)
        this.loadingCategories$.set(false)
      }
    });
  }

}
