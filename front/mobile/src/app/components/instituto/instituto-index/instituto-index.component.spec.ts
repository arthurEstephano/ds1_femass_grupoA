import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstitutoIndexComponent } from './instituto-index.component';

describe('InstitutoIndexComponent', () => {
  let component: InstitutoIndexComponent;
  let fixture: ComponentFixture<InstitutoIndexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoIndexComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
