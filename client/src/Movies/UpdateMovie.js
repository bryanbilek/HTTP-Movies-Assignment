import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateMovie(props) {
  const [update, setUpdate] = useState({
    id: Date.now(),
    title: '',
    director: '',
    metascore: 0,
    stars: ''
  });

  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();
  const {id} = useParams();

  const handleChanges = e => {
    e.persist();
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    // e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then(res => {
        console.log('put request', res)
        props.getMovieList(res.data)
        props.history.push('/')
        reset();
      })
      .catch(err => console.log('put error', err))
  };

  useEffect(() => {
    const updateItem = props.movies.find(movie => `${movie.id}` === id)
    if (updateItem) {
      setUpdate(updateItem)
    }

    // axios
    //   .get(`http://localhost:5000/api/movies/${id}`)
    //   .then(res => {
    //     console.log('get request', res)
    //     setUpdate(res.data)
    //   })
    //   .catch(err => console.log(err));
  }, [props.movies, id]);

  return (
    <div className="update-movie-form">
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="title" name="title" ref={register} onChange={handleChanges} />
        <input type="text" placeholder="director" name="director" ref={register} onChange={handleChanges} />
        <input type="text" placeholder="metascore" name="metascore" ref={register} onChange={handleChanges} />
        <input type="text" placeholder="stars" name="stars" ref={register} onChange={handleChanges} />

        <input type="submit" />
      </form>
    </div>
  );
}