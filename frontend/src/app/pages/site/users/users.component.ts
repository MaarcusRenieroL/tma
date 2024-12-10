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
import { User } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'ngx-sonner';
import { OrganizationService } from "../../../services/organization/organization.service";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  organizationName?: string;

  protected readonly _rawFilterInput = signal('');
  protected readonly _logFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<User>(true);
  protected readonly _isUserSelected = (log: User) =>
    this._selectionModel.isSelected(log);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    { initialValue: [] }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    name: { visible: true, label: 'Name' },
    email: { visible: true, label: 'Email' },
    username: { visible: true, label: 'Username' },
    role: { visible: true, label: "Role" }
  });

  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _logs: WritableSignal<User[]> = signal([]);
  private readonly _filteredUsers: Signal<User[]> = computed(() => {
    const logFilter = this._logFilter()?.trim()?.toLowerCase();
    if (logFilter && logFilter.length > 0) {
      return this._logs().filter(
        (user) =>
          user.email.toLowerCase().includes(logFilter) ||
          user.name.toLowerCase().includes(logFilter)
      );
    }
    return this._logs();
  });

  private readonly _nameSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedUsers: Signal<User[]> = computed(
    () => {
      const sort = this._nameSort();
      const start = this._displayedIndices().start;
      const logs: User[] = this._filteredUsers();
      const pageSize = this._pageSize();
      const slicedUsers: User[] = logs.slice(start, start + pageSize);

      if (!sort) {
        return slicedUsers;
      }

      return [...slicedUsers].sort((p1: User, p2: User) =>
        sort === 'ASC'
          ? p1.name.localeCompare(p2.name)
          : -1 * p1.name.localeCompare(p2.name)
      );
    }
  );

  protected readonly _allFilteredPaginatedUsersSelected = computed(() =>
    this._filteredSortedPaginatedUsers().every((log: User) =>
      this._selected().includes(log)
    )
  );

  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedUsersSelected()
      ? true
      : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<User> = (_: number, p: User) =>
    p.userId;
  protected readonly _totalElements = computed(
    () => this._filteredUsers().length
  );
  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor(
    private userService: UserService,
    protected cookieService: CookieService,
    private organizationService: OrganizationService
  ) {
    effect(() => this._logFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });
  }

  protected toggleUser(log: User) {
    this._selectionModel.toggle(log);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedUsers());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedUsers());
    }
  }

  protected handleNameSortChange() {
    const sort = this._nameSort();
    if (sort === 'ASC') {
      this._nameSort.set('DESC');
    } else if (sort === 'DESC') {
      this._nameSort.set(null);
    } else {
      this._nameSort.set('ASC');
    }
  }

  onOptionForPageSize(value: number) {
    this._pageSize = signal(value);
  }

  ngOnInit() {
    this.userService
      .getUserByUserId(this.cookieService.get('syncTeam.userId'))
      .subscribe((response) => {
        if (response) {
          if (response.statusCode === 200) {
            
            this.organizationService.getOrganizationByOrganizationId(response.data.organizationId).subscribe((response) => {
              this.organizationName = response.data.name;
            })
            
            console.log([400, 401, 402, 403, 404, 405, 500].includes(response.statusCode)
            )
            this.userService
              .getUsersByOrganizationId(response.data.organizationId)
              .subscribe((response) => {
                if (response) {
                  if (response.statusCode === 200) {
                    if (response.data.length > 0) {
                      this._logs.set(response.data);
                    }

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
    
    console.log(this.organizationName)
  }
  
  delete(userId: string) {
    console.log(userId);
  }
}
