import { LIMIT } from '../constants';
import { Todo } from './types';

export const getTodos = (page: number): Promise<Todo[]> => {
    return fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${LIMIT}`)
    .then(todos => todos.json() as Promise<Todo[]>);
};