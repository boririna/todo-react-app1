import { useState } from 'react';
import styles from './Todo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsDeleting, selectIsUpdating } from '../../store/selectors';
import { requestDeleteTodo, requestUpdateTodo } from '../../store/actions';

export const Todo = ({ title, completed, id }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(title);
	const dispatch = useDispatch();

	const requestEditTodo = () => {
		setIsEditing(!isEditing);
		if (title === inputValue) return;
		dispatch(
			requestUpdateTodo({
				id,
				completed,
				title: inputValue,
			}),
		);
	};

	const requestDelete = () => {
		dispatch(requestDeleteTodo(id));
	};

	return (
		<div>
			{isEditing ? (
				<div className={styles.todo}>
					<input
						className={styles.inputField}
						type="text"
						value={inputValue}
						onChange={({ target }) => setInputValue(target.value)}
					/>
					<button onClick={requestEditTodo}>
						<FontAwesomeIcon icon="floppy-disk" size="lg" />
					</button>
				</div>
			) : (
				<div className={styles.todo}>
					<div className={styles.text}>
						{completed ? <span>☑</span> : <span>☐</span>} <p>{title}</p>
					</div>
					<div>
						<button onClick={requestEditTodo}>
							<FontAwesomeIcon icon="pen-to-square" size="lg" />
						</button>
						<button onClick={requestDelete}>
							<FontAwesomeIcon icon="trash" size="lg" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Todo;
