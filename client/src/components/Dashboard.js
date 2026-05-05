import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`/api/notes/${userId}`);
      setNotes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const res = await axios.post('/api/notes/add', {
        userId,
        text: newNote
      });
      setNotes([...notes, res.data]);
      setNewNote('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading your notes...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Your Notes</h1>
      </div>

      <form className="note-composer" onSubmit={handleAddNote}>
        <input 
          type="text" 
          value={newNote} 
          onChange={(e) => setNewNote(e.target.value)} 
          placeholder="Write a new note..."
        />
        <button type="submit" className="btn-primary">Add Note</button>
      </form>

      {notes.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
          <p>No notes yet. Create your first note above!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div className="note-card" key={note._id}>
              <div className="note-content">
                {note.text}
              </div>
              <div className="note-footer">
                <button onClick={() => handleDelete(note._id)} className="btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
