import { StepperItem } from './stepper.item';
import { StepperStateEnum } from './stepper-state.enum';

export interface IStepperComponent {

    next(): void;
    previous(): void;
    first(): void;
    changeState(item: StepperItem, state: StepperStateEnum): void;
    disable(item: StepperItem): void;
    enable(item: StepperItem): void;

}