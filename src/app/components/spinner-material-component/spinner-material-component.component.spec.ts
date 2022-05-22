import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpinnerMaterialComponentComponent } from './spinner-material-component.component';

describe('SpinnerMaterialComponentComponent', () => {
  let component: SpinnerMaterialComponentComponent;
  let fixture: ComponentFixture<SpinnerMaterialComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerMaterialComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerMaterialComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
