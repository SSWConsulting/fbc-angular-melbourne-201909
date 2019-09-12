import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  company: Company;
  companyForm: FormGroup;
  companyId: number;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;

    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['@ssw.com.au'],
        phone : ['']
      }
    );

    if (!this.isNewCompany){
      this.companyService.getCompany(this.companyId)
      .subscribe(company => this.companyForm.patchValue(company));
    }
  }

  saveCompany() {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value)
      .subscribe(c => this.router.navigateByUrl(''));
    } else {
      const company = {...this.companyForm.value, id: this.companyId};
      this.companyService.updateCompany(company)
      .subscribe(c => this.router.navigateByUrl(''));
    }
  }

}
