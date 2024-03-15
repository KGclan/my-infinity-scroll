import './App.css';
import { JSONPlaceholderAPI } from './shared/api';

import { Todo } from './shared/api/types';
import { useListInfinityScroll } from './shared/hooks';

function App() {
  const { loader, data: todos } = useListInfinityScroll<Todo>({getData: JSONPlaceholderAPI.getTodos});

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
        {loader}
      </ul>
    </div>
  );
}

export default App;
