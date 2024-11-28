import {
  Component,
  computed,
  effect,
  signal,
  TrackByFunction,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, map } from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";
import {
  PaginatorState,
  useBrnColumnManager,
} from "@spartan-ng/ui-table-brain";
import { User } from "../../../models/user";

export const USER_DATA: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Manager",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Developer",
  },
  {
    id: 4,
    name: "Diana Green",
    email: "diana.green@example.com",
    role: "Designer",
  },
  {
    id: 5,
    name: "Ethan White",
    email: "ethan.white@example.com",
    role: "Tester",
  },
  {
    id: 6,
    name: "Fiona Black",
    email: "fiona.black@example.com",
    role: "HR",
  },
];


@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  protected readonly _rawFilterInput = signal('');
  protected readonly _logFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<User>(true);
  protected readonly _isUserSelected = (log: User) => this._selectionModel.isSelected(log);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    { initialValue: [] }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    name: { visible: true, label: "Name" },
    user: { visible: true, label: "User" },
    role: { visible: true, label: "Role" },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _logs = signal(USER_DATA);
  private readonly _filteredUsers = computed(() => {
    
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
  protected readonly _filteredSortedPaginatedUsers = computed(() => {
    const sort = this._nameSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const logs = this._filteredUsers();
    const pageSize = this._pageSize();
    const slicedUsers = logs.slice(start, start + pageSize);

    if (!sort) {
      return slicedUsers;
    }

    return [...slicedUsers].sort((p1, p2) =>
      sort === 'ASC'
        ? 1 * p1.name.localeCompare(p2.name)
        : -1 * p1.name.localeCompare(p2.name)
    );
  });

  protected readonly _allFilteredPaginatedUsersSelected = computed(() =>
    this._filteredSortedPaginatedUsers().every((log) => this._selected().includes(log))
  );

  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedUsersSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<User> = (_: number, p: User) => p.id;
  protected readonly _totalElements = computed(() => this._filteredUsers().length);
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
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

}
