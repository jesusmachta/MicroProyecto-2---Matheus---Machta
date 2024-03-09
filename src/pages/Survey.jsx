
export default function Survey({ juegos }) {
    return (
      <select>
        {juegos.map((juego, index) => (
          <option key={index} value={juego}>{juego}</option>
        ))}
      </select>
    );
  }

