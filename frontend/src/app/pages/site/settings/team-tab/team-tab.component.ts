import { Component, computed, effect, signal, TrackByFunction } from '@angular/core';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, map } from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";
import { PaginatorState, useBrnColumnManager } from "@spartan-ng/ui-table-brain";
import { User } from '../../../../models/user';

export const USER_DATA: User[] = []

@Component({
  selector: 'team-tab',
  templateUrl: './team-tab.component.html',
})

export class TeamTabComponent {
  selectedValueForRole: string = "";
  roles = [
    { name: "ADMIN", value: "ROLE_ADMIN" },
    { name: "PROJECT_MANAGER", value: "PROJECT_MANAGER" },
    { name: "TEAM_LEADER", value: "TEAM_LEADER" },
    { name: "DEVELOPER", value: "DEVELOPER" },
  ]
  
  
  onOptionSelectForRole(value: string) {
    // @ts-ignore
    return this.roles.find(role => role.value === value).name;
  }
  
  protected readonly _rawFilterInput = signal('');
  protected readonly _emailFilter = signal('');
  private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));
  
  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal<number>(this._availablePageSizes[0]);
  
  private readonly _selectionModel = new SelectionModel<User>(true);
  protected readonly _isUserSelected = (user: User) => this._selectionModel.isSelected(user);
  protected readonly _selected = toSignal(this._selectionModel.changed.pipe(map((change) => change.source.selected)), {
    initialValue: [],
  });
  
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
  
  private readonly _Users = signal(USER_DATA);
  private readonly _filteredUsers = computed(() => {
    const emailFilter = this._emailFilter()?.trim()?.toLowerCase();
    if (emailFilter && emailFilter.length > 0) {
      return this._Users().filter((u) => u.email.toLowerCase().includes(emailFilter));
    }
    return this._Users();
  });
  private readonly _emailSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedUsers = computed(() => {
    const sort = this._emailSort();
    const start = this._displayedIndices().start;
    const pageSize = this._pageSize();
    const end = start + (pageSize === 10000 ? this._filteredUsers().length : pageSize);
    const Users = this._filteredUsers();
  
    if (!sort) {
      return Users.slice(start, end);
    }
  
    return [...Users]
      .sort((p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.email.localeCompare(p2.email))
      .slice(start, end);
  });
  
  protected readonly _allFilteredPaginatedUsersSelected = computed(() =>
    this._filteredSortedPaginatedUsers().every((user) => this._selected().includes(user)),
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedUsersSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });
  
  protected readonly _trackBy: TrackByFunction<User> = (_: number, p: User) => p.userId;
  protected readonly _totalElements = computed(() => this._filteredUsers().length);
  protected readonly _onStateChange = ({ startIndex }: PaginatorState) => {
    const pageSize = this._pageSize();
    this._displayedIndices.set({
      start: startIndex,
      end: startIndex + (pageSize === 10000 ? this._totalElements() : pageSize) - 1,
    });
  };
  
  
  constructor() {
    effect(() => this._emailFilter.set(this._debouncedFilter() ?? ''), { allowSignalWrites: true });
  }
  
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
