import { trigger, state, style, transition, animate } from '@angular/animations';

export const fieldAnimation = trigger('fieldAnimation', [
  state(
    'valid',
    style({
      borderColor: 'whitesmoke',
      transform: 'translateX(0)',
    })
  ),
  state(
    'invalid',
    style({
      borderColor: 'red',
    })
  ),
  transition('valid => invalid', [
    animate('0.1s', style({ transform: 'translateX(-10px)' })),
    animate('0.1s', style({ transform: 'translateX(10px)' })),
    animate('0.1s', style({ transform: 'translateX(-5px)' })),
    animate('0.1s', style({ transform: 'translateX(5px)' })),
    animate('0.1s', style({ transform: 'translateX(0)' })),
  ]),
  transition('invalid => valid', [animate('300ms ease-out')]),
]);

export const headerAnimation = trigger('headerAnimation', [
  state(
    'default',
    style({
      background: 'transparent',
      boxShadow: 'none',
    })
  ),
  state(
    'scrolled',
    style({
      background: '#8394c7',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    })
  ),
  transition('default <=> scrolled', animate('300ms ease-in-out')),
]);
