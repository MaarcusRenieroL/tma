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

export const TASKS_DATA: Task[] = [];


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

  protected readonly _trackBy: TrackByFunction<Task> = (_: number, p: Task) => p.taskId;
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
