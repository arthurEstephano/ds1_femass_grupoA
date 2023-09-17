import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PesquisadorModalAddComponent } from './pesquisador-modal-add.component';

describe('PesquisadorModalAddComponent', () => {
  let component: PesquisadorModalAddComponent;
  let fixture: ComponentFixture<PesquisadorModalAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisadorModalAddComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisadorModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
