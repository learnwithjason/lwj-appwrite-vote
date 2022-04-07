import { useState, useEffect } from 'react';
import { api } from '../api';
import './Vote.css';

export default function LoginForm({ user }) {
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState([]);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    async function loadItems() {
      const items = await api.database.listDocuments('item');

      setItems(items.documents);
    }

    loadItems();
  }, []);

  useEffect(() => {
    const unsubscribe = api.subscribe('collections.votes.documents', (data) => {
      if (data.event === 'database.documents.create') {
        setVotes((currentVotes) => {
          if (currentVotes[data.payload.itemId]) {
            currentVotes[data.payload.itemId] += 1;
          } else {
            currentVotes[data.payload.itemId] = 1;
          }

          return currentVotes;
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function vote(e) {
    e.preventDefault();

    await api.database.createDocument('votes', 'unique()', {
      itemId: selected,
      userId: user['$id'],
    });
  }

  return (
    <div className="vote-container">
      <span className="name">Hello {user ? user.name : ''}</span>
      <span className="instructions">
        Please select the item you'd like to vote for
      </span>

      <div className="vote-item-container">
        {items.map((item) => {
          return (
            <div key={item['$id']}>
              <div
                className={
                  'vote-item' + (item['$id'] === selected ? ' selected' : '')
                }
                key={item.id}
              >
                <img
                  src={item.imageUrl}
                  onClick={() => setSelected(item['$id'])}
                />
              </div>
              <div className="vote-count">{votes[item['$id']] ?? 0}</div>
            </div>
          );
        })}
      </div>

      <form className="vote-form" onSubmit={vote}>
        <button disabled={!selected || voted} type="submit">
          Vote
        </button>
      </form>
    </div>
  );
}
