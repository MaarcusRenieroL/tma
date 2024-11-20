import {
  Component,
  computed,
  effect,
  signal,
  TrackByFunction,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, map, startWith } from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";
import {
  PaginatorState,
  useBrnColumnManager,
} from "@spartan-ng/ui-table-brain";
import { Log } from "../../../models/log";
import { P } from "@angular/cdk/keycodes";

export const LOGS_DATA: Log[] = [
  {
    id: 1,
    timestamp: "2023-11-20T09:15:00Z",
    user: "John Doe",
    action: "Logged in",
    category: "security",
    details: "Successful login from IP 192.168.1.1",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2023-11-20T10:30:00Z",
    user: "Jane Smith",
    action: "Updated project deadline",
    category: "productivity",
    details: "Project: Q4 Marketing Campaign, New deadline: 2023-12-15",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2023-11-20T11:45:00Z",
    user: "Mike Johnson",
    action: "Exceeded work hours limit",
    category: "work-life",
    details: "Worked for 52 hours this week, exceeding the 45-hour limit",
    status: "warning",
  },
  {
    id: 4,
    timestamp: "2023-11-20T13:00:00Z",
    user: "Sarah Williams",
    action: "Initiated team building activity",
    category: "engagement",
    details: "Scheduled virtual team lunch for Friday, 2023-11-24",
    status: "success",
  },
  {
    id: 5,
    timestamp: "2023-11-20T14:15:00Z",
    user: "David Brown",
    action: "Failed to join meeting",
    category: "communication",
    details: "Unable to connect to Zoom meeting ID: 123-456-789",
    status: "error",
  },
  {
    id: 6,
    timestamp: "2023-11-20T15:30:00Z",
    user: "Emily Davis",
    action: "Completed wellness challenge",
    category: "well-being",
    details: "Finished 30-day meditation challenge",
    status: "success",
  },
  {
    id: 7,
    timestamp: "2023-11-20T16:45:00Z",
    user: "Alex Turner",
    action: "Shared document for collaboration",
    category: "collaboration",
    details: "Shared 'Q1 Strategy Plan' with Marketing and Sales teams",
    status: "success",
  },
];

@Component({
  selector: "app-admin-activity-logs",
  templateUrl: "./admin-activity-logs.component.html",
  styleUrl: "./admin-activity-logs.component.css",
})
export class AdminActivityLogsComponent {
  protected readonly _rawFilterInput = signal("");
  protected readonly _actionFilter = signal("");
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  protected readonly _logFilter = signal('');
  private readonly _logs = signal<Log[]>(LOGS_DATA);

  private readonly _timestampSort = signal<'ASC' | 'DESC' | null>(null);  

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal<number>(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Log>(true);
  protected readonly _isLogSelected = (log: Log) =>
    this._selectionModel.isSelected(log);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    {
      initialValue: [],
    }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    timestamp: { visible: true, label: 'Timestamp' },
    user: { visible: true, label: 'User' },
    action: { visible: true, label: 'Action' },
    category: { visible: true, label: 'Category' },
    status: { visible: true, label: 'Status' },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    "select",
    ...this._brnColumnManager.displayedColumns(),
    "actions",
  ]);

  private readonly _Logs = signal(LOGS_DATA);
  private readonly _filteredLogs = computed(() => {
    const filter = this._logFilter()?.trim()?.toLowerCase();
    return filter
      ? this._logs().filter((log) =>
          log.user.toLowerCase().includes(filter) || 
          log.action.toLowerCase().includes(filter) ||
          log.category.toLowerCase().includes(filter)
        )
      : this._logs();
  });

  private readonly _actionSort = signal<"ASC" | "DESC" | null>(null);
  protected readonly _filteredSortedPaginatedLogs = computed(() => {
    const sort = this._timestampSort();
    const start = this._displayedIndices().start;
    const pageSize = this._pageSize();
    const end = start + (pageSize === 10000 ? this._filteredLogs().length : pageSize);
    const logs = this._filteredLogs();
  
    if (!sort) return logs.slice(start, end);
  
    return [...logs]
      .sort((a, b) => (sort === 'ASC' ? 1 : -1) * a.timestamp.localeCompare(b.timestamp))
      .slice(start, end);
  });

  protected readonly _allFilteredPaginatedLogsSelected = computed(() => this._filteredSortedPaginatedLogs().every((log) => this._selected().includes(log)));
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedLogsSelected() ? true : "indeterminate";

    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<Log> = (_: number, l: Log) => l.id;
  protected readonly _totalElements = computed(() => this._filteredLogs().length);
  protected readonly _onStateChange = ({ startIndex }: PaginatorState) => {
    const pageSize = this._pageSize();
    this._displayedIndices.set({
      start: startIndex,
      end: startIndex + (pageSize === 10000 ? this._totalElements() : pageSize) - 1,
    });
  };

  constructor() {
    effect(() => this._actionFilter.set(this._debouncedFilter() ?? ""), {
      allowSignalWrites: true
    })
  };

  protected toggleLog(log: Log) {
    this._selectionModel.toggle(log);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();

    if (previousCbState === "indeterminate" || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedLogs());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedLogs());
    }
  }

  protected handleTimestampSortChange() {
    const sort = this._timestampSort();
    if (sort === 'ASC') {
      this._timestampSort.set('DESC');
    } else if (sort === 'DESC') {
      this._timestampSort.set(null);
    } else {
      this._timestampSort.set('ASC');
    }
  }
  
}
