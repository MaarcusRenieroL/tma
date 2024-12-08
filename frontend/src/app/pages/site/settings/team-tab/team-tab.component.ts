import {
  Component,
  computed,
  effect,
  OnInit,
  Signal,
  signal,
  TrackByFunction,
  WritableSignal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, map } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import {
  PaginatorState,
  useBrnColumnManager,
} from '@spartan-ng/ui-table-brain';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'ngx-sonner';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'settings-team-tab',
  templateUrl: './team-tab.component.html',
})
export class TeamTabComponent implements OnInit {
  organizationId: string = '';

  roles = [
    { name: 'ADMIN', value: 'ROLE_ADMIN' },
    {
      name: 'PROJECT_MANAGER',
      value: 'PROJECT_MANAGER',
    },
    { name: 'TEAM_LEADER', value: 'TEAM_LEADER' },
    { name: 'DEVELOPER', value: 'DEVELOPER' },
  ];
  inviteForm: FormGroup;
  protected readonly _rawFilterInput = signal('');
  protected readonly _emailFilter = signal('');
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal<number>(this._availablePageSizes[0]);
  protected readonly _brnColumnManager = useBrnColumnManager({
    name: { visible: true, label: 'Name' },
    email: { visible: true, label: 'Email' },
    role: { visible: true, label: 'Role' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);
  protected readonly _allFilteredPaginatedUsersSelected = computed(() =>
    this._filteredSortedPaginatedUsers().every((user) =>
      this._selected().includes(user)
    )
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedUsersSelected()
      ? true
      : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );
  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  private readonly _selectionModel = new SelectionModel<User>(true);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    {
      initialValue: [],
    }
  );
  private readonly _Users: WritableSignal<User[]> = signal([]);
  private readonly _filteredUsers: Signal<User[]> = computed(() => {
    const emailFilter = this._emailFilter()?.trim()?.toLowerCase();
    if (emailFilter && emailFilter.length > 0) {
      return this._Users().filter((u) =>
        u.email.toLowerCase().includes(emailFilter)
      );
    }
    return this._Users();
  });
  protected readonly _totalElements = computed(
    () => this._filteredUsers().length
  );
  private readonly _emailSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedUsers = computed(() => {
    const sort = this._emailSort();
    const start = this._displayedIndices().start;
    const pageSize = this._pageSize();
    const end =
      start + (pageSize === 10000 ? this._filteredUsers().length : pageSize);
    const Users = this._filteredUsers();

    if (!sort) {
      return Users.slice(start, end);
    }

    return [...Users]
      .sort(
        (p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.email.localeCompare(p2.email)
      )
      .slice(start, end);
  });

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {
    effect(() => this._emailFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });
    this.inviteForm = this.formBuilder.group({
      members: this.formBuilder.array([this.createMemberFormGroup()]),
    });
  }

  get members(): FormArray {
    return this.inviteForm.get('members') as FormArray;
  }

  ngOnInit() {
    this.userService
      .getUserByUserId(this.cookieService.get('syncTeam.userId'))
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            this.organizationId = response.data.organizationId;

            this.userService
              .getUsersByOrganizationId(response.data.organizationId)
              .subscribe((response) => {
                if (response) {
                  if (response.statusCode === 200) {
                    this._Users.set(response.data);

                    toast.success(response.message);
                  } else if (
                    [400, 401, 402, 403, 404, 405, 500].includes(
                      response.statusCode
                    )
                  ) {
                    toast.error(response.message);
                  }
                } else {
                  toast.error('Something went wrong');
                }
              });
          }
        }
      });
  }

  createMemberFormGroup(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  addMember(): void {
    this.members.push(this.createMemberFormGroup());
  }

  submitInvites(): void {
    if (this.inviteForm.invalid) {
      this.inviteForm.markAllAsTouched();
      toast.error('Please correct the errors in the form before submitting.');
      return;
    }

    console.log(this.organizationId);
    console.log(this.inviteForm.get('members')?.value);

    this.userService
      .addUsersToOrganization({
        addUsersToOrganization: this.inviteForm.get('members')?.value,
        organizationId: this.organizationId,
      })
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            toast.success(response.message);
          } else if (
            [400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)
          ) {
            toast.error(response.message);
          }
        } else {
          toast.error('Something went wrong');
        }
      });
  }

  protected readonly _isUserSelected = (user: User) =>
    this._selectionModel.isSelected(user);

  protected readonly _trackBy: TrackByFunction<User> = (_: number, p: User) =>
    p.userId;

  protected readonly _onStateChange = ({ startIndex }: PaginatorState) => {
    const pageSize = this._pageSize();
    this._displayedIndices.set({
      start: startIndex,
      end:
        startIndex +
        (pageSize === 10000 ? this._totalElements() : pageSize) -
        1,
    });
  };

  protected toggleUser(User: User) {
    this._selectionModel.toggle(User);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedUsers());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedUsers());
    }
  }

  protected handleEmailSortChange() {
    const sort = this._emailSort();
    if (sort === 'ASC') {
      this._emailSort.set('DESC');
    } else if (sort === 'DESC') {
      this._emailSort.set(null);
    } else {
      this._emailSort.set('ASC');
    }
  }
}
