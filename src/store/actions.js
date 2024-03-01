const setLoading = (loading) => ({
	type: 'SET_LOADING',
	payload: loading,
});

const setTodos = (todos) => ({
	type: 'SET_TODOS',
	payload: todos,
});

export const loadAllTodos = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await fetch('http://localhost:3005/todos');
		const loadedData = await response.json();
		dispatch(setTodos(loadedData));
	} catch (err) {
		console.log(err);
	}

	dispatch(setLoading(false));
};

export const requestAddTodo = (title) => async (dispatch, getState) => {
	const prevState = [...getState().todos];

	const newTodo = {
		id: Date.now(),
		title,
		completed: false,
	};
	dispatch(setTodos([...prevState, newTodo]));
	try {
		const response = await fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(newTodo),
		});
		if (!response.ok) {
			throw new Error('Что то пошло не так');
		}
	} catch (err) {
		dispatch(setTodos(prevState));
		console.log('err', err);
	}
};

export const requestUpdateTodo = (updateTodo) => async (dispatch, getState) => {
	const prevState = [...getState().todos];

	dispatch(
		setTodos(
			prevState.map((prevTodo) =>
				updateTodo.id === prevTodo.id ? updateTodo : prevTodo,
			),
		),
	);
	try {
		const response = await fetch(`http://localhost:3005/todos/${updateTodo.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(updateTodo),
		});
		if (!response.ok) {
			throw new Error('Что-то пошло не так');
		}
	} catch (err) {
		dispatch(setTodos(prevState));
		console.log('err', err);
	}
};

export const requestDeleteTodo = (id) => async (dispatch, getState) => {
	const prevState = [...getState().todos];

	dispatch(setTodos(prevState.filter((prevTodo) => id !== prevTodo.id)));
	try {
		const response = await fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		});
		if (!response.ok) {
			throw new Error('Что то пошло не так');
		}
	} catch (err) {
		dispatch(setTodos(prevState));
		console.log('err', err);
	}
};

// const requestDeleteTodo = (todoID) => {
// 	// setIsDeleting(true);
// 	dispatch(setIsDeleting(true));
// 	fetch(`http://localhost:3005/todos/${todoID}`, {
// 		method: 'DELETE',
// 	})
// 		.then((rawResponse) => rawResponse.json())
// 		.then((response) => {
// 			// dispatch(setRefreshTodos(!refreshTodos));
// 			setRefreshTodos(!refreshTodos);
// 		})
// 		.finally(() => dispatch(setIsDeleting(false)));
// };
