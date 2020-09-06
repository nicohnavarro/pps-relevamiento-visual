import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CosasFeasPage } from './cosas-feas.page';

describe('CosasFeasPage', () => {
  let component: CosasFeasPage;
  let fixture: ComponentFixture<CosasFeasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasFeasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CosasFeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
