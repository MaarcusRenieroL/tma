import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() isDisabled: boolean = false;
  @Input({ transform: booleanAttribute }) fullWidth: boolean = false;
  @Input() extraClasses: string | string[] = ''; // New input for extra classes
  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }

  get buttonClasses(): string[] {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'whitespace-nowrap',
      'rounded-md',
      'text-sm',
      'font-medium',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-1',
      'focus-visible:ring-ring',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
    ];

    if (this.fullWidth) {
      baseClasses.push('w-full');
    }

    const variantClasses: { [key in ButtonVariant]: string } = {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    const sizeClasses: { [key in ButtonSize]: string } = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9',
    };

    // Merge the default classes with extra classes if provided
    const extraClassesArray = Array.isArray(this.extraClasses) ? this.extraClasses : this.extraClasses.split(' ');

    return [
      ...baseClasses,
      variantClasses[this.variant],
      sizeClasses[this.size],
      ...extraClassesArray, // Add the extra classes here
    ];
  }
}
