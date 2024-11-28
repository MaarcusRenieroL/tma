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
import { Task } from "../../../models/task";

export const TASKS_DATA: Task[] = [
  {
    id: 1,
    title: "Complete Angular Project",
    description: "Finish implementing the task management feature in the Angular app.",
    dueDate: new Date("2024-12-15T18:00:00Z"),
    dateAllocated: new Date("2024-11-20T09:00:00Z"),
    priority: "High",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Write Unit Tests for API",
    description: "Write unit tests for the new API endpoints to ensure proper functionality.",
    dueDate: new Date("2024-11-25T12:00:00Z"),
    dateAllocated: new Date("2024-11-18T10:00:00Z"),
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "Design Homepage UI",
    description: "Design the layout for the homepage, including header, footer, and navigation.",
    dueDate: new Date("2024-12-05T15:00:00Z"),
    dateAllocated: new Date("2024-11-15T08:30:00Z"),
    priority: "Low",
    status: "Completed",
  },
  {
    id: 4,
    title: "Fix Bugs in Dashboard",
    description: "Resolve the issues related to dashboard data rendering and responsiveness.",
    dueDate: new Date("2024-11-28T10:00:00Z"),
    dateAllocated: new Date("2024-11-20T11:00:00Z"),
    priority: "High",
    status: "In Progress",
  },
  {
    id: 5,
    title: "Update Project Documentation",
    description: "Update the documentation to reflect recent changes in the project's architecture.",
    dueDate: new Date("2024-12-10T17:00:00Z"),
    dateAllocated: new Date("2024-11-21T14:00:00Z"),
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 6,
    title: "Refactor User Service",
    description: "Refactor the user service to improve performance and readability.",
    dueDate: new Date("2024-12-20T13:00:00Z"),
    dateAllocated: new Date("2024-11-22T09:30:00Z"),
    priority: "Low",
    status: "Pending",
  },
  {
    id: 7,
    title: "Implement Search Feature",
    description: "Implement a search feature on the app to allow users to find tasks easily.",
    dueDate: new Date("2024-12-01T12:00:00Z"),
    dateAllocated: new Date("2024-11-19T10:45:00Z"),
    priority: "High",
    status: "In Progress",
  },
];


@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  protected readonly _rawFilterInput = signal('');
  protected readonly _taskFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Task>(true);
  protected readonly _isTaskSelected = (task: Task) => this._selectionModel.isSelected(task);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    { initialValue: [] }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    title: { visible: true, label: "Title" },
    description: { visible: true, label: "Description" },
    status: { visible: true, label: "Status" },
    priority: { visible: true, label: "Priority" },
    dueDate: { visible: true, label: "Due Date" },
    dateAllocated: { visible: true, label: "Date Allocated" },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _tasks = signal(TASKS_DATA);
  private readonly _filteredTasks = computed(() => {
    
    const taskFilter = this._taskFilter()?.trim()?.toLowerCase();
    if (taskFilter && taskFilter.length > 0) {
      return this._tasks().filter(
        (task) =>
          task.title.toLowerCase().includes(taskFilter) ||
          task.description.toLowerCase().includes(taskFilter)
      );
    }
    return this._tasks();
  });

  private readonly _titleSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedTasks = computed(() => {
    const sort = this._titleSort();
    const start = this._displayedIndices().start;
    const tasks = this._filteredTasks();
    const pageSize = this._pageSize();
    const slicedTasks = tasks.slice(start, start + pageSize);

    if (!sort) {
      return slicedTasks;
    }

    return [...slicedTasks].sort((p1, p2) =>
      sort === 'ASC'
        ? p1.title.localeCompare(p2.title)
        : -1 * p1.title.localeCompare(p2.title)
    );
  });

  protected readonly _allFilteredPaginatedTasksSelected = computed(() =>
    this._filteredSortedPaginatedTasks().every((task) => this._selected().includes(task))
  );

  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedTasksSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<Task> = (_: number, p: Task) => p.id;
  protected readonly _totalElements = computed(() => this._filteredTasks().length);
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    effect(() => this._taskFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });
  }

  protected toggleTask(task: Task) {
    this._selectionModel.toggle(task);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedTasks());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedTasks());
    }
  }

  protected handleNameSortChange() {
    const sort = this._titleSort();
    if (sort === 'ASC') {
      this._titleSort.set('DESC');
    } else if (sort === 'DESC') {
      this._titleSort.set(null);
    } else {
      this._titleSort.set('ASC');
    }
  }

  onOptionForPageSize(value: number) {
    this._pageSize = signal(value);
  }

}
