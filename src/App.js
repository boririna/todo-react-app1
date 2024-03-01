import { useEffect, useState } from 'react';
import styles from './App.module.css';
import _ from 'lodash';
import { Todo } from './components/todo/Todo';
import { Search } from './components/search/Search';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPenToSquare,
	faTrash,
	faPlus,
	faFloppyDisk,
	faMagnifyingGlass,
	faArrowDownAZ,
	faArrowUpZA,
	faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectTodos } from './store/selectors';
import { loadAllTodos, requestAddTodo } from './store/actions';

library.add(
	faPenToSquare,
	faTrash,
	faPlus,
	faFloppyDisk,
	faMagnifyingGlass,
	faArrowDownAZ,
	faArrowUpZA,
	faRotateLeft,
);

export const App = () => {
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		dispatch(loadAllTodos());
	}, []);

	const [inputValue, setInputValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const dispatch = useDispatch();

	const handleChange = ({ target }) => {
		setSearchValue(target.value);
	};

	let searchTodos = searchValue
		? [...todos].filter((todo) =>
				todo.title.toLowerCase().includes(searchValue.toLowerCase()),
		  )
		: todos;

	let sortedTodos = isSorted ? _.orderBy(searchTodos, ['title'], ['asc']) : searchTodos;
	console.log(sortedTodos);
	const sortAscending = () => {
		setIsSorted((prev) => !prev);
	};

	const addTodo = (title) => {
		dispatch(requestAddTodo(title));
		setInputValue('');
	};

	return (
		<div className={styles.App}>
			<div className={styles.Container}>
				<div className={styles.todoSearch}>
					<h1>Todos</h1>
					<Search onChange={handleChange} searchValue={searchValue} />
				</div>

				<input
					className={styles.inputField}
					type="text"
					value={inputValue}
					onChange={({ target }) => setInputValue(target.value)}
				/>
				<div className={styles.buttons}>
					<button onClick={() => addTodo(inputValue)}>
						<FontAwesomeIcon icon="plus" size="lg" />
					</button>

					<button onClick={sortAscending}>
						{isSorted ? (
							<FontAwesomeIcon icon="rotate-left" size="lg" />
						) : (
							<FontAwesomeIcon icon="arrow-down-a-z" size="lg" />
						)}
					</button>
				</div>
				{isLoading ? (
					<p>Loading ...</p>
				) : (
					sortedTodos.map((todo) => <Todo key={todo.id} {...todo} />)
				)}
			</div>
		</div>
	);
};
