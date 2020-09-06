import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CosasLindasPage } from './cosas-lindas.page';

describe('CosasLindasPage', () => {
  let component: CosasLindasPage;
  let fixture: ComponentFixture<CosasLindasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasLindasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CosasLindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
