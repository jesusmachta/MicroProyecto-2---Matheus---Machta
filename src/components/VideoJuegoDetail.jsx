import PropTypes from 'prop-types';
import styles from './VideoJuegoDetail.module.css';

export default function VideojuegoDetail({ videojuego }) {
  return (
    <div className={styles.root}>
      <h1>{videojuego.nombre}</h1>
      <p>{videojuego.genero}</p>
      <p>{videojuego.descripcion}</p>
    </div>
  );
}

VideojuegoDetail.propTypes = {
    videojuego: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      genero: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
    }).isRequired,
  };